using IntexProject.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IntexProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MovieDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public MovieController(MovieDbContext temp, UserManager<IdentityUser> userManager)
        {
            _context = temp;
            _userManager = userManager;
        }

        // Helper to get custom user from Identity email
        private async Task<MoviesUser?> GetMovieUserFromIdentityAsync()
        {
            var identityUser = await _userManager.GetUserAsync(User);
            var email = identityUser?.Email;

            if (string.IsNullOrEmpty(email))
                return null;

            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        // Return all movies with filtering, grouping, and paging
        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? movieCat = null, bool ascending = true)
        {
            var baseQuery = _context.Titles.AsQueryable();

            if (movieCat != null && movieCat.Any())
            {
                baseQuery = baseQuery.Where(m => movieCat.Contains(m.Genre));
            }

            var groupedQuery = baseQuery
                .AsEnumerable()
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

            groupedQuery = ascending
                ? groupedQuery.OrderBy(g => g.Key.Title)
                : groupedQuery.OrderByDescending(g => g.Key.Title);

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

            return Ok(new { Movies = movies, TotalNumMovies = totalNumMovies });
        }

        // Return movies with poster thumbnails
        [HttpGet("ShowMovies")]
        public IActionResult ShowMovies(int? pageSize = null, int pageNum = 1, [FromQuery] List<string>? movieCat = null, bool ascending = true)
        {
            var baseQuery = _context.Titles.AsQueryable();

            if (movieCat != null && movieCat.Any())
            {
                baseQuery = baseQuery.Where(m => movieCat.Contains(m.Genre));
            }

            var grouped = baseQuery
                .AsEnumerable()
                .GroupBy(m => new { m.ShowId, m.Title, m.PosterUrl });

            int total = grouped.Count();
            int size = pageSize ?? total;

            var movies = grouped
                .OrderBy(g => ascending ? g.Key.Title : "")
                .ThenByDescending(g => ascending ? "" : g.Key.Title)
                .Skip((pageNum - 1) * size)
                .Take(size)
                .Select(g => new
                {
                    g.Key.ShowId,
                    g.Key.Title,
                    g.Key.PosterUrl,
                    Genres = g.Select(x => x.Genre).Distinct().ToList()
                })
                .ToList();

            return Ok(new { Movies = movies, TotalNumMovies = total });
        }

        // Return list of distinct genres
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

        // Return users with grouped subscriptions
        [HttpGet("AllUsers")]
        public IActionResult GetUsers()
        {
            var allUsers = _context.Users.AsEnumerable();

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

        // Return all ratings
        [HttpGet("GetRatings")]
        public IActionResult GetRatings()
        {
            var ratings = _context.Ratings
                .AsEnumerable()
                .Select(r => new
                {
                    r.UserId,
                    r.ShowId,
                    r.Rating
                })
                .ToList();

            return Ok(ratings);
        }

        // Add a movie with multiple genres
        [HttpPost("AddMovie")]
        public IActionResult AddMovies([FromBody] MovieDto newMovie)
        {
            if (newMovie.Genres == null || !newMovie.Genres.Any())
                return BadRequest("At least one genre is required.");

            if (string.IsNullOrWhiteSpace(newMovie.ShowId))
            {
                var maxId = _context.Titles
                    .Where(m => m.ShowId.StartsWith("s") && m.ShowId.Length > 1)
                    .AsEnumerable()
                    .Select(m =>
                    {
                        var numPart = m.ShowId.Substring(1);
                        return int.TryParse(numPart, out var idNum) ? idNum : 0;
                    })
                    .DefaultIfEmpty(0)
                    .Max();

                var nextId = maxId + 1;
                newMovie.ShowId = $"s{nextId}";
            }

            var createdMovies = new List<MoviesTitle>();

            foreach (var genre in newMovie.Genres.Distinct())
            {
                var alreadyExists = _context.Titles.Any(m =>
                    m.ShowId.ToLower() == newMovie.ShowId.ToLower() &&
                    m.Genre.ToLower() == genre.ToLower());

                if (alreadyExists)
                    continue;

                var newRow = new MoviesTitle
                {
                    ShowId = newMovie.ShowId,
                    Title = newMovie.Title,
                    Type = newMovie.Type,
                    Director = newMovie.Director,
                    CastList = newMovie.CastList,
                    Country = newMovie.Country,
                    ReleaseYear = newMovie.ReleaseYear,
                    Rating = newMovie.Rating,
                    Duration = newMovie.Duration,
                    Description = newMovie.Description,
                    Genre = genre,
                    PosterUrl = newMovie.PosterUrl
                };

                _context.Titles.Add(newRow);
                createdMovies.Add(newRow);
            }

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return StatusCode(500, "An error occurred while saving the movie.");
            }

            return Ok(createdMovies);
        }

        // Update a movie by ShowId
        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] MovieDto updatedMovie)
        {
            var existing = _context.Titles
                .Where(m => m.ShowId.ToLower() == show_id.ToLower());

            if (!existing.Any())
            {
                return NotFound(new { message = $"No movie found with ShowId = {show_id}" });
            }

            _context.Titles.RemoveRange(existing);

            foreach (var genre in updatedMovie.Genres)
            {
                var newRow = new MoviesTitle
                {
                    ShowId = updatedMovie.ShowId,
                    Title = updatedMovie.Title,
                    Type = updatedMovie.Type,
                    Director = updatedMovie.Director,
                    CastList = updatedMovie.CastList,
                    Country = updatedMovie.Country,
                    ReleaseYear = updatedMovie.ReleaseYear,
                    Rating = updatedMovie.Rating,
                    Duration = updatedMovie.Duration,
                    Description = updatedMovie.Description,
                    Genre = genre,
                    PosterUrl = updatedMovie.PosterUrl
                };
                _context.Titles.Add(newRow);
            }

            _context.SaveChanges();
            return Ok();
        }

        // Delete a movie by ShowId
        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteMovie(string show_id)
        {
            var moviesToDelete = _context.Titles.Where(m => m.ShowId == show_id).ToList();

            if (!moviesToDelete.Any())
                return NotFound(new { message = "Movie not found" });

            _context.Titles.RemoveRange(moviesToDelete);
            _context.SaveChanges();

            return NoContent();
        }

        // Get a single movie with its genres by ShowId
        [HttpGet("GetMovieById/{show_id}")]
        public IActionResult GetMovieById(string show_id)
        {
            var movies = _context.Titles
                .Where(m => m.ShowId == show_id)
                .ToList();

            if (!movies.Any())
                return NotFound();

            var grouped = movies
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
                    m.Description,
                    m.PosterUrl
                })
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
                    g.Key.PosterUrl,
                    Genres = g.Select(x => x.Genre).Distinct().ToList()
                })
                .FirstOrDefault();

            return Ok(grouped);
        }
    }
}
