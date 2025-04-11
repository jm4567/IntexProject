using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;
using IntexProject.API.Models.Supplemental;
using System.Text.RegularExpressions;

namespace IntexProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HiddenGemsController : ControllerBase
    {
        private readonly RecommenderDbContext _recommenderContext;
        private readonly SupplementalMoviesDbContext _supplementalContext;

        public HiddenGemsController(RecommenderDbContext recommenderContext, SupplementalMoviesDbContext supplementalContext)
        {
            _recommenderContext = recommenderContext;
            _supplementalContext = supplementalContext;
        }

        // GET: api/HiddenGems
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var gems = await _recommenderContext.Hidden_Gems.ToListAsync();
            return Ok(gems);
        }

        // GET: api/HiddenGems/by-genre?genres=Action,Comedy
        [HttpGet("by-genre")]
        public async Task<IActionResult> GetByGenres([FromQuery] string genres)
        {
            if (string.IsNullOrWhiteSpace(genres))
                return BadRequest("Genres are required.");

            try
            {
                var genreList = genres.Split(',')
                                      .Select(g => g.Trim().ToLower())
                                      .ToList();

                // Get all gems from DB
                var gems = await _recommenderContext.Hidden_Gems
                    .Where(hg => hg.genre != null)
                    .ToListAsync();

                // Filter gems that include any of the requested genres (partial match)
                var filteredGems = gems
                    .Where(hg => genreList.Any(g => hg.genre!.Trim().ToLower().Contains(g)))
                    .ToList();

                // Gather distinct recommended titles
                var recommendedTitles = filteredGems
                    .SelectMany(g => new[]
                    {
                        g.recommendation_1_title,
                        g.recommendation_2_title,
                        g.recommendation_3_title,
                        g.recommendation_4_title,
                        g.recommendation_5_title
                    })
                    .Where(title => !string.IsNullOrWhiteSpace(title))
                    .Select(title => title!.Trim().ToLower())
                    .Distinct()
                    .ToList();

                Console.WriteLine("🔍 Recommended Titles:");
                foreach (var title in recommendedTitles)
                {
                    Console.WriteLine($"- {title}");
                }

                // Get movie info from the supplemental DB and match on normalized title
                var dbTitles = await _supplementalContext.RecommendationMoviesTitles.ToListAsync();

                var matchingMovies = dbTitles
                    .Where(t => t.Title != null &&
                                recommendedTitles.Contains(t.Title.Trim().ToLower()))
                    .Select(t => new
                    {
                        t.ShowId,
                        t.Title,
                        t.Type,
                        t.Director,
                        CastList = t.Cast,
                        t.Country,
                        t.ReleaseYear,
                        t.Rating,
                        t.Duration,
                        t.Description,
                        Genres = new List<string>(), // Fill if needed
                        PosterUrl = GetSafePosterUrl(t.Title)
                    })
                    .ToList();

                return Ok(matchingMovies);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 ERROR in HiddenGems/by-genre:");
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal Server Error");
            }
        }

        // Fallback-safe poster URL builder
        private string GetSafePosterUrl(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                return "https://yourfallback.blob.core.windows.net/posters/Image_coming_soon.png";

            string encodedTitle = Uri.EscapeDataString(title.Trim());
            return $"https://movieposters2025.blob.core.windows.net/posters/{encodedTitle}.jpg";
        }
    }
}
