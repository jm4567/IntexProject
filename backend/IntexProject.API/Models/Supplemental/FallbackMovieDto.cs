namespace IntexProject.API.Models.Supplemental;

public class FallbackMovieDto
{
    public required string ShowId { get; set; }
    public required string Title { get; set; }
    public required string Type { get; set; }
    public string? Director { get; set; }
    public string? CastList { get; set; }
    public string? Country { get; set; }
    public int? ReleaseYear { get; set; }
    public string? Rating { get; set; }
    public string? Duration { get; set; }
    public string? Description { get; set; }
    public List<string>? Genres { get; set; }
}
