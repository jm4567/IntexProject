using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;
using Microsoft.AspNetCore.Authorization;

namespace IntexProject.API.Controllers
{
    // Enforces that all endpoints in this controller require authentication
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController : ControllerBase
    {
        // Injected database context for accessing recommendation data
        private readonly RecommenderDbContext _context;

        // Constructor receives and stores the database context
        public RecommendationsController(RecommenderDbContext context)
        {
            _context = context;
        }

        // GET: api/recommendations/by-id/{showId}
        // Returns collaborative filtering recommendations for a specific show by its ID
        [HttpGet("by-id/{showId}")]
        public IActionResult GetByShowId(string showId)
        {
            // Normalize the show ID to lowercase for consistent comparison
            showId = showId.ToLower();

            // Search for a matching record in the collaborative filtering table
            var collabMatch = _context.General_Collaborative_Filtering_Recommendations
                .AsNoTracking()        // Improves performance for read-only queries
                .AsEnumerable()        // Switches to LINQ-to-Objects for case-insensitive search
                .FirstOrDefault(r => r.show_id?.ToLower() == showId);

            // Return the result as a JSON object with a 'Collaborative' key
            return Ok(new
            {
                Collaborative = collabMatch
            });
        }

        // GET: api/recommendations/by-title/{title}
        // Returns content-based filtering recommendations based on a show title
        [HttpGet("by-title/{title}")]
        public IActionResult GetByTitle(string title)
        {
            // Normalize the title to lowercase for case-insensitive match
            title = title.ToLower();

            // Search for a matching record in the content filtering table
            var contentMatch = _context.General_Content_Filtering_Recommendations
                .AsNoTracking()
                .AsEnumerable()
                .FirstOrDefault(r => r.searched_title?.ToLower() == title);

            // Return the result as a JSON object with a 'Content' key
            return Ok(new
            {
                Content = contentMatch
            });
        }
    }
}
