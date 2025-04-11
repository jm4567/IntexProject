using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models
{
    // Maps this class to the "movies_titles" table in the database
    [Table("movies_titles")]
    public partial class MoviesTitle
    {
        // Unique identifier for a movie/show (part of composite key)
        [Required]
        [Column("show_id")]
        public required string ShowId { get; set; }

        // Indicates the format, e.g., "Movie" or "TV Show"
        [Required]
        [Column("type")]
        public required string Type { get; set; }

        // The title of the movie/show
        [Required]
        [Column("title")]
        public required string Title { get; set; }

        // Director name(s), optional
        [Column("director")]
        public string? Director { get; set; }

        // Comma-separated list of cast members, optional
        [Column("cast_list")]
        public string? CastList { get; set; }

        // Country of origin, optional
        [Column("country")]
        public string? Country { get; set; }

        // Year the movie/show was released
        [Required]
        [Column("release_year")]
        public required int ReleaseYear { get; set; }

        // Movie/show rating, e.g., "PG-13", optional
        [Column("rating")]
        public string? Rating { get; set; }

        // Duration, e.g., "1h 30min", optional
        [Column("duration")]
        public string? Duration { get; set; }

        // Short description or synopsis
        [Required]
        [Column("description")]
        public required string Description { get; set; }

        // Genre of the movie/show (part of composite key)
        [Column("genre")]
        public required string Genre { get; set; }

        // URL pointing to a poster or thumbnail image
        [Column("poster_url")]
        public string? PosterUrl { get; set; }
    }
}
