using IntexProject.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MovieDbContext>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:MoviesConnection"]);
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:IdentityConnection"]);
});


//build cors policy to allow react app 
builder.Services.AddCors(options => options.AddPolicy("AllowReactApp", 
    policy => {

        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader(); 
    })
    
);

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapIdentityApi<IdentityUser>();

app.Run();
