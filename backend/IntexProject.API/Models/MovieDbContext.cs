using Microsoft.EntityFrameworkCore;

namespace IntexProject.API.Models;

public class MovieDbContext : DbContext
{
    public MovieDbContext(DbContextOptions<MovieDbContext> options)
        : base(options)
    {
    }

    public DbSet<MoviesRating> Ratings { get; set; }

    public DbSet<MoviesTitle> Titles { get; set; }

    public DbSet<MoviesUser> Users { get; set; }
    
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MoviesTitle>()
            .HasKey(m => new { m.ShowId, m.Genre });
        
        modelBuilder.Entity<MoviesUser>()
            .HasKey(u => new { u.UserId, u.Subscription });

        modelBuilder.Entity<MoviesRating>()
            .HasKey(r => new { r.UserId, r.ShowId });
        
        base.OnModelCreating(modelBuilder);
    }
}
