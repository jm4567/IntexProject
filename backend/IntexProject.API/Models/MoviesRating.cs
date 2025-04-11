using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models
{
    // Represents a rating given by a user to a movie/show
    [Table("movies_ratings")] // Maps to the "movies_ratings" table in the database
    public class MoviesRating
    {
        // Composite Key Part 1: User ID from movies_user table
        [Key, Column("user_id", Order = 0)]
        public required int UserId { get; set; }

        // Composite Key Part 2: Show ID from movies_title table
        [Key, Column("show_id", Order = 1)]
        public required string ShowId { get; set; }

        // Rating value (e.g., 1–5 stars or thumbs up/down)
        [Column("rating")]
        public int Rating { get; set; }
    }
}
