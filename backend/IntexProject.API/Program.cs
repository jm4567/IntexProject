using System.Security.Claims;
using IntexProject.API.Models;
using IntexProject.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;
using IntexProject.API.Models.Supplemental;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;

var builder = WebApplication.CreateBuilder(args);

// ✅ Configure CORS to allow frontend at http://localhost:3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // required for sending cookies
    });
});

// ✅ Add essential services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Register all required database contexts
builder.Services.AddDbContext<MovieDbContext>(options =>
    options.UseSqlite(builder.Configuration["ConnectionStrings:MoviesConnection"]));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionStrings:IdentityConnection"]));

builder.Services.AddDbContext<RecommenderDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("RecommenderConnection")));

builder.Services.AddDbContext<SupplementalMoviesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SupplementalMovieDb")));

builder.Services.AddAuthorization();

// ✅ Configure Identity and security settings
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // Loosen password requirements for user convenience
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 15;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders()
.AddErrorDescriber<CustomIdentityErrorDescriber>();

// ✅ Ensure Identity uses email as the username
builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

// ✅ Attach custom claims factory
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

// ✅ Configure cookie behavior for API vs browser requests
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

    options.Events.OnRedirectToLogin = context =>
    {
        // Return 401 for API clients instead of redirect
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
});

builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

var app = builder.Build();

// ✅ Swagger setup for development/testing
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Global middleware
app.UseCors("AllowReactApp");
app.UseHsts();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

// ✅ Controller mapping
app.MapControllers();
app.MapIdentityApi<IdentityUser>();

// ✅ Logout endpoint (used by frontend to sign out)
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Delete auth cookie on logout
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None,
        Path = "/"
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

// ✅ Ping endpoint to verify login state (used after login)
app.MapGet("/pingauth", (HttpContext context, ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
        return Results.Unauthorized();

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    return Results.Json(new { email = email });
}).RequireAuthorization();

// ✅ Register endpoint (used by create account form)
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
        return Results.BadRequest(result.Errors);

    await signInManager.SignInAsync(user, isPersistent: false);
    return Results.Ok(new { message = "Registration successful" });
});

app.Run();
