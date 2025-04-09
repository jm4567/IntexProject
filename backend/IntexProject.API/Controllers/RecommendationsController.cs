using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;

namespace IntexProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController : ControllerBase
    {
        private readonly RecommenderDbContext _context;

        public RecommendationsController(RecommenderDbContext context)
        {
            _context = context;
        }

        [HttpGet("by-id/{showId}")]
        public IActionResult GetByShowId(string showId)
        {
            showId = showId.ToLower();

            var collabMatch = _context.General_Collaborative_Filtering_Recommendations
                .AsNoTracking()
                .AsEnumerable()
                .FirstOrDefault(r => r.show_id?.ToLower() == showId);

            return Ok(new
            {
                Collaborative = collabMatch
            });
        }

        [HttpGet("by-title/{title}")]
        public IActionResult GetByTitle(string title)
        {
            title = title.ToLower();

            var contentMatch = _context.General_Content_Filtering_Recommendations
                .AsNoTracking()
                .AsEnumerable()
                .FirstOrDefault(r => r.searched_title?.ToLower() == title);

            return Ok(new
            {
                Content = contentMatch
            });
        }
    }
}
