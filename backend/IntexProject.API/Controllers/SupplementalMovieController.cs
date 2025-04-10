using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Supplemental;

namespace IntexProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplementalMovieController : ControllerBase
    {
        private readonly SupplementalMoviesDbContext _context;

        public SupplementalMovieController(SupplementalMoviesDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetByTitle/{title}")]
        public IActionResult GetMovieByTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                return BadRequest("Title cannot be empty.");

            var movie = _context.RecommendationMoviesTitles
                .AsEnumerable()
                .FirstOrDefault(m => m.Title?.Trim().ToLower() == title.Trim().ToLower());

            if (movie == null)
                return NotFound(new { message = $"Movie titled '{title}' not found in supplemental database." });

            // Create a genre dictionary to map flags to genre names
            var genres = new List<string>();
            if (movie.Action == 1) genres.Add("Action");
            if (movie.Adventure == 1) genres.Add("Adventure");
            if (movie.AnimeSeriesInternationalTvShows == 1) genres.Add("Anime Series International TV Shows");
            if (movie.BritishTvShowsDocuseriesInternationalTvShows == 1) genres.Add("British TV Shows Docuseries International TV Shows");
            if (movie.Children == 1) genres.Add("Children");
            if (movie.Comedies == 1) genres.Add("Comedies");
            if (movie.ComediesDramasInternationalMovies == 1) genres.Add("Comedies Dramas International Movies");
            if (movie.ComediesInternationalMovies == 1) genres.Add("Comedies International Movies");
            if (movie.ComediesRomanticMovies == 1) genres.Add("Comedies Romantic Movies");
            if (movie.CrimeTvShowsDocuseries == 1) genres.Add("Crime TV Shows Docuseries");
            if (movie.Documentaries == 1) genres.Add("Documentaries");
            if (movie.DocumentariesInternationalMovies == 1) genres.Add("Documentaries International Movies");
            if (movie.Docuseries == 1) genres.Add("Docuseries");
            if (movie.Dramas == 1) genres.Add("Dramas");
            if (movie.DramasInternationalMovies == 1) genres.Add("Dramas International Movies");
            if (movie.DramasRomanticMovies == 1) genres.Add("Dramas Romantic Movies");
            if (movie.FamilyMovies == 1) genres.Add("Family Movies");
            if (movie.Fantasy == 1) genres.Add("Fantasy");
            if (movie.HorrorMovies == 1) genres.Add("Horror Movies");
            if (movie.InternationalMoviesThrillers == 1) genres.Add("International Movies Thrillers");
            if (movie.InternationalTvShowsRomanticTvShowsTvDramas == 1) genres.Add("International Romantic TV Dramas");
            if (movie.KidsTv == 1) genres.Add("Kids' TV");
            if (movie.LanguageTvShows == 1) genres.Add("Language TV Shows");
            if (movie.Musicals == 1) genres.Add("Musicals");
            if (movie.NatureTv == 1) genres.Add("Nature TV");
            if (movie.RealityTv == 1) genres.Add("Reality TV");
            if (movie.Spirituality == 1) genres.Add("Spirituality");
            if (movie.TvAction == 1) genres.Add("TV Action");
            if (movie.TvComedies == 1) genres.Add("TV Comedies");
            if (movie.TvDramas == 1) genres.Add("TV Dramas");
            if (movie.TalkShowsTvComedies == 1) genres.Add("Talk Shows TV Comedies");
            if (movie.Thrillers == 1) genres.Add("Thrillers");

            var formatted = new
            {
                showId = movie.ShowId,
                title = movie.Title,
                type = movie.Type,
                director = movie.Director,
                castList = movie.Cast,
                country = movie.Country,
                releaseYear = movie.ReleaseYear,
                rating = movie.Rating,
                duration = movie.Duration,
                description = movie.Description,
                genres = genres
            };

            return Ok(formatted);
        }

       [HttpGet("GetById/{showId}")]
public IActionResult GetMovieById(string showId)
{
    if (string.IsNullOrWhiteSpace(showId))
    {
        return BadRequest("ShowId cannot be empty");
    }

    var movie = _context.RecommendationMoviesTitles
        .AsEnumerable()
        .FirstOrDefault(m => m.ShowId?.Trim().ToLower() == showId.Trim().ToLower());

    if (movie == null)
    {
        return NotFound(new { message = $"Movie with ID '{showId}' not found in supplemental database." });
    }

    // 🧠 Reflectively extract genres where the column value == 1
    var genreProperties = typeof(RecommendationMoviesTitle).GetProperties()
        .Where(p => p.PropertyType == typeof(long) && Convert.ToInt64(p.GetValue(movie)) == 1)
        .Select(p => p.Name)
        .ToList();

    var fallbackDto = new FallbackMovieDto
    {
        ShowId = movie.ShowId,
        Title = movie.Title,
        Type = movie.Type,
        Director = movie.Director,
        CastList = movie.Cast,
        Country = movie.Country,
        ReleaseYear = movie.ReleaseYear,
        Rating = movie.Rating,
        Duration = movie.Duration,
        Description = movie.Description,
        Genres = genreProperties
    };

    return Ok(fallbackDto);
}


    }
}
