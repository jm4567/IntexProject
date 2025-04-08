using IntexProject.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IntexProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieDbContext _context;

        public MovieController(MovieDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllMovies")]
        public IActionResult GetMovies(
            int pageSize = 10,
            int pageNum = 1,
            [FromQuery] List<string>? movieCat = null,
            bool ascending = true)
        {
            var baseQuery = _context.Titles.AsQueryable();

            // Filter by genre
            if (movieCat != null && movieCat.Any())
            {
                baseQuery = baseQuery.Where(m => movieCat.Contains(m.Genre));
            }

            // Group by ShowId to get one movie with a list of genres
            var groupedQuery = baseQuery
                .AsEnumerable() // ⬅️ Switch to in-memory LINQ
                .GroupBy(m => new
                {
                    m.ShowId,
                    m.Title,
                    m.Type,
                    m.Director,
                    m.CastList,
                    m.Country,
                    m.ReleaseYear,
                    m.Rating,
                    m.Duration,
                    m.Description
                });

            var totalNumMovies = groupedQuery.Count();

            // Sort
            if (ascending)
            {
                groupedQuery = groupedQuery.OrderBy(g => g.Key.Title);
            }
            else
            {
                groupedQuery = groupedQuery.OrderByDescending(g => g.Key.Title);
            }

            // Paging + Project
            var movies = groupedQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .Select(g => new
                {
                    g.Key.ShowId,
                    g.Key.Title,
                    g.Key.Type,
                    g.Key.Director,
                    g.Key.CastList,
                    g.Key.Country,
                    g.Key.ReleaseYear,
                    g.Key.Rating,
                    g.Key.Duration,
                    g.Key.Description,
                    Genres = g.Select(x => x.Genre).Distinct().ToList()
                })
                .ToList();

            return Ok(new
            {
                Movies = movies,
                TotalNumMovies = totalNumMovies
            });
        }

        [HttpGet("GetMovieGenres")]
        public IActionResult GetMovieGenres()
        {
            var genres = _context.Titles
                .Select(m => m.Genre)
                .Distinct()
                .OrderBy(g => g)
                .ToList();

            return Ok(genres);
        }

        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            // Step 1: Get all users into memory
            var allUsers = _context.Users
                .AsEnumerable(); // prevents SQL issues with GroupBy

            // Step 2: Group by UserId and flatten subscriptions
            var result = allUsers
                .GroupBy(u => new
                {
                    u.UserId,
                    u.Name,
                    u.Phone,
                    u.Email,
                    u.Age,
                    u.Gender,
                    u.City,
                    u.State,
                    u.Zip
                })
                .Select(g => new
                {
                    g.Key.UserId,
                    g.Key.Name,
                    g.Key.Phone,
                    g.Key.Email,
                    g.Key.Age,
                    g.Key.Gender,
                    g.Key.City,
                    g.Key.State,
                    g.Key.Zip,
                    Subscriptions = g.Select(x => x.Subscription).Distinct().ToList()
                })
                .ToList();

            return Ok(result);
        }
        
        [HttpGet("GetRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _context.Ratings
                .AsEnumerable()  // Helps prevent SQLite translation issues
                .Select(r => new
                {
                    r.UserId,
                    r.ShowId,
                    r.Rating
                    // Optionally, include related info:
                    // UserName = r.MovieUser?.Name,
                    // MovieTitle = r.MovieTitle?.Title
                })
                .ToList();

            return Ok(ratings);
        }

    }
}
