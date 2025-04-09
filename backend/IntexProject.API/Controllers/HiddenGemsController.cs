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
}
