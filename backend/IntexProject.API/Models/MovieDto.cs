namespace IntexProject.API.Models
{
    // Data Transfer Object (DTO) for sending/receiving movie data from frontend
    public class MovieDto
    {
        public string ShowId { get; set; } // Unique identifier, e.g., "s123"

        public string Title { get; set; } // Movie or show title

        public string Type { get; set; } // e.g., "Movie", "TV Show"

        public string? Director { get; set; } // Optional director name

        public string? CastList { get; set; } // Optional cast members (string list)

        public string? Country { get; set; } // Optional country of origin

        public int ReleaseYear { get; set; } // Year the movie/show was released

        public string? Rating { get; set; } // e.g., "PG-13", "R"

        public string? Duration { get; set; } // Duration as string, e.g., "1h 45m"

        public string Description { get; set; } // Description or synopsis

        public string? PosterUrl { get; set; } // Optional image/poster URL

        public List<string> Genres { get; set; } = new(); // ✅ Genre list from frontend (multi-genre support)
    }
}
