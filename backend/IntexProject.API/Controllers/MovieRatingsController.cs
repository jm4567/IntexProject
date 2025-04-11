using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace IntexProject.API.Controllers
{
    [Authorize] // Ensures only authenticated users can access these endpoints
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly MovieDbContext _movieContext;

        public RatingsController(MovieDbContext movieContext)
        {
            _movieContext = movieContext;
        }

        // GET: /api/ratings/get?userEmail=someone@example.com&showId=s603
        [HttpGet("get")]
        public async Task<IActionResult> GetRating(string userEmail, string showId)
        {
            // Look up the user by their email address
            var movieUser = await _movieContext.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (movieUser == null)
                return NotFound("Movie DB user not found");

            // Look up the specific rating for the given user and show
            var rating = await _movieContext.Ratings
                .FirstOrDefaultAsync(r => r.UserId == movieUser.UserId && r.ShowId == showId);

            if (rating == null)
                return NotFound("Rating not found");

            return Ok(new { rating = rating.Rating });
        }

        // POST: /api/ratings/rate
        [HttpPost("rate")]
        public async Task<IActionResult> RateMovie([FromBody] MovieRatingsDto dto)
        {
            // Look up the user by their email
            var movieUser = await _movieContext.Users.FirstOrDefaultAsync(u => u.Email == dto.UserEmail);
            if (movieUser == null)
                return NotFound("Movie DB user not found");

            // Try to find an existing rating for the same user and movie
            var existingRating = await _movieContext.Ratings
                .FirstOrDefaultAsync(r => r.UserId == movieUser.UserId && r.ShowId == dto.ShowId);

            if (existingRating != null)
            {
                // Update the rating if it already exists
                existingRating.Rating = dto.Rating;
                _movieContext.Ratings.Update(existingRating);
            }
            else
            {
                // Otherwise, create a new rating entry
                var newRating = new MoviesRating
                {
                    UserId = movieUser.UserId,
                    ShowId = dto.ShowId,
                    Rating = dto.Rating
                };
                _movieContext.Ratings.Add(newRating);
            }

            await _movieContext.SaveChangesAsync();
            return Ok(new { message = "Rating saved successfully" });
        }
    }
}
