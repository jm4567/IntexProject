using Microsoft.EntityFrameworkCore;

namespace IntexProject.API.Models
{
    // Main EF Core context for the primary movie database
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options)
            : base(options)
        {
        }

        // Ratings table: stores user-movie ratings
        public DbSet<MoviesRating> Ratings { get; set; }

        // Titles table: stores movie/show information
        public DbSet<MoviesTitle> Titles { get; set; }

        // Users table: stores extended user profile info (e.g., age, gender, etc.)
        public DbSet<MoviesUser> Users { get; set; }

        // Configure composite keys and relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite primary key on ShowId + Genre for Titles (to support multi-genre entries)
            modelBuilder.Entity<MoviesTitle>()
                .HasKey(m => new { m.ShowId, m.Genre });

            // Composite key for Users to allow duplicate users with different subscriptions
            modelBuilder.Entity<MoviesUser>()
                .HasKey(u => new { u.UserId, u.Subscription });

            // Composite key for Ratings: one rating per user per movie
            modelBuilder.Entity<MoviesRating>()
                .HasKey(r => new { r.UserId, r.ShowId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
