using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;

namespace IntexProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HiddenGemsController : ControllerBase
    {
        private readonly RecommenderDbContext _context;

        public HiddenGemsController(RecommenderDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var gems = await _context.Hidden_Gems.ToListAsync();
            return Ok(gems);
        }
    }

    [HttpGet("by-genre")]
public async Task<IActionResult> GetByGenres([FromQuery] string genres)
{
    if (string.IsNullOrWhiteSpace(genres))
        return BadRequest("Genres are required.");

    var genreList = genres.Split(',').Select(g => g.Trim().ToLower()).ToList();

    var gems = await _context.Hidden_Gems
        .Where(hg => genreList.Contains(hg.genre.ToLower()))
        .ToListAsync();

    var recommendedTitles = gems
        .SelectMany(g => new[]
        {
            g.recommendation_1_title,
            g.recommendation_2_title,
            g.recommendation_3_title,
            g.recommendation_4_title,
            g.recommendation_5_title
        })
        .Where(title => !string.IsNullOrWhiteSpace(title))
        .Distinct()
        .ToList();

    // Join with Titles table to get full movie info
    var movieInfos = await _context.Titles
        .Where(t => recommendedTitles.Contains(t.Title))
        .Select(t => new
        {
            t.ShowId,
            t.Title,
            t.Type,
            t.Director,
            t.CastList,
            t.Country,
            t.ReleaseYear,
            t.Rating,
            t.Duration,
            t.Description,
            Genres = new List<string> { t.Genre ?? "" },
            PosterUrl = t.PosterUrl ?? ""
        })
        .ToListAsync();

    return Ok(movieInfos);
}

}
