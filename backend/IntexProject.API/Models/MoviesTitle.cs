using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models;

[Table("movies_titles")]
public partial class MoviesTitle
{
    [Required]
    [Column("show_id")]
    public required string ShowId { get; set; }

    [Required]
    [Column("type")]
    public required string Type { get; set; }

    [Required]
    [Column("title")]
    public required string Title { get; set; }

    [Column("director")]
    public string? Director { get; set; }

    [Column("cast_list")]
    public string? CastList { get; set; }

    [Column("country")]
    public string? Country { get; set; }
    
    [Required]
    [Column("release_year")]
    public required int ReleaseYear { get; set; }

    [Column("rating")]
    public string? Rating { get; set; }

    [Column("duration")]
    public string? Duration { get; set; }
    
    [Required]
    [Column("description")]
    public required string Description { get; set; }
    
    [Column("genre")]
    public required string Genre { get; set; }

}
