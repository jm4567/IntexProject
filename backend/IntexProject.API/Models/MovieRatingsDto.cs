namespace IntexProject.API.Models
{
    public class MovieRatingsDto
    {
        // We'll send the user's email so that we can look up the movie-specific user,
        // then use the user ID from the MoviesUser table.
        public string UserEmail { get; set; } = string.Empty;
        public string ShowId { get; set; } = string.Empty;
        public int Rating { get; set; }
    }
}