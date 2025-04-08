using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models;

[Table("movies_ratings")]
public class MoviesRating
{
    [Key, Column("user_id", Order = 0)]
    
    public required int UserId { get; set; }

    [Key, Column("show_id", Order = 1)]
    public required string ShowId { get; set; }

    [Column("rating")]
    public int Rating { get; set; }
    
}