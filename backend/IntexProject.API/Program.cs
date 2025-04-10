using System.Security.Claims;
using IntexProject.API.Models;
using IntexProject.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
// CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add services to the container.

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add databases
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(builder.Configuration["ConnectionStrings:MoviesConnection"]));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration["ConnectionStrings:IdentityConnection"]));

builder.Services.AddDbContext<RecommenderDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("RecommenderConnection")));


builder.Services.AddAuthorization();


builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 15;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders()
.AddErrorDescriber<CustomIdentityErrorDescriber>(); // Add this



builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;

});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    // For dev, if you're not using HTTPS, use None:
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // Use Always for production with HTTPS

    // Override redirection events for API calls
    options.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToAccessDenied = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
    options.LoginPath = "/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHsts();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true, // Set to true if you're using HTTPS
        SameSite = SameSiteMode.None,
        Path = "/" // CRITICAL: must match the Path where the cookie was set
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", (HttpContext context, ClaimsPrincipal user) =>
{
    Console.WriteLine($"User authenticated? {user.Identity?.IsAuthenticated}");
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        Console.WriteLine("Unauthorized request to /pingauth");
        return Results.Unauthorized();
    }
    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    return Results.Json(new { email = email });
}).RequireAuthorization();

app.MapPost("/api/register", async (
    HttpContext context,
    UserManager<IdentityUser> userManager,
    SignInManager<IdentityUser> signInManager,
    RegisterDto dto
) =>
{
    var user = new IdentityUser { UserName = dto.Email, Email = dto.Email };
    var result = await userManager.CreateAsync(user, dto.Password);

    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors); // ✅ return detailed identity errors
    }

    await signInManager.SignInAsync(user, isPersistent: false);
    return Results.Ok(new { message = "Registration successful" });
});

app.Run();


