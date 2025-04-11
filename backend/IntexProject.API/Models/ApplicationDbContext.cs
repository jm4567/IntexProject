using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IntexProject.API.Models
{
    // ApplicationDbContext inherits from IdentityDbContext to manage Identity-related tables (users, roles, claims, etc.)
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        // Constructor that passes configuration options to the base IdentityDbContext
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
            // No additional setup needed here unless you want to customize Identity models or seed data
        }
    }
}
