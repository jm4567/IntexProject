using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntexProject.API.Models.Recommender;
using IntexProject.API.Models.Supplemental;
using System.Security.Claims;

namespace IntexProject.API.Controllers
{
    [ApiController]
    [Route("api/personalized-recommendations")]
    public class PersonalizedRecsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SupplementalMoviesDbContext _supplementalContext;
        private readonly RecommenderDbContext _recommenderContext;

        public PersonalizedRecsController(
            UserManager<IdentityUser> userManager,
            SupplementalMoviesDbContext supplementalContext,
            RecommenderDbContext recommenderContext)
        {
            _userManager = userManager;
            _supplementalContext = supplementalContext;
            _recommenderContext = recommenderContext;
        }

        [HttpGet("by-user")]
        [Authorize]
        public async Task<IActionResult> GetRecommendations()
        {
            try
            {
                var identityUser = await _userManager.GetUserAsync(User);
                if (identityUser?.Email == null)
                    return Unauthorized("No authenticated user with email found.");

                var email = identityUser.Email.Trim().ToLower();

                var allUsers = await _supplementalContext.RecommendationMoviesUsers
                    .AsNoTracking()
                    .ToListAsync();

                var user = allUsers.FirstOrDefault(u =>
                    (u.Email ?? string.Empty).Trim().ToLower() == email);

                if (user?.UserId == null)
                    return NotFound("User not found in recommendation database.");

                var allRatings = await _supplementalContext.RecommendationMoviesRatings
                    .AsNoTracking()
                    .ToListAsync();

                var ratedIds = allRatings
                    .Where(r => r.UserId == user.UserId && r.Rating >= 3)
                    .Select(r => r.ShowId)
                    .Where(id => !string.IsNullOrEmpty(id))
                    .Distinct()
                    .ToList();

                Console.WriteLine("User rated these shows:");
                foreach (var id in ratedIds)
                    Console.WriteLine($"- {id}");

                var collabIds = new HashSet<string>();
                var genreTypeIds = new HashSet<string>();

                var allCollaborativeRecs = await _recommenderContext.General_Collaborative_Filtering_Recommendations
                    .AsNoTracking()
                    .ToListAsync();

                var allTitles = await _supplementalContext.RecommendationMoviesTitles
                    .AsNoTracking()
                    .ToListAsync();

                foreach (var showId in ratedIds)
                {
                    Console.WriteLine($"Checking collaborative recs for: {showId}");
                    var rec = allCollaborativeRecs.FirstOrDefault(r =>
                        r.show_id?.Trim().ToLower() == showId.Trim().ToLower());

                    if (rec != null)
                    {
                        Console.WriteLine($"Found collab recs: {rec.Recommendation_1}, {rec.Recommendation_2}, {rec.Recommendation_3}");
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_1)) collabIds.Add(rec.Recommendation_1.Trim().ToLower());
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_2)) collabIds.Add(rec.Recommendation_2.Trim().ToLower());
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_3)) collabIds.Add(rec.Recommendation_3.Trim().ToLower());
                    }

                    var movieTitle = allTitles.FirstOrDefault(t => t.ShowId == showId);
                    if (movieTitle == null)
                    {
                        Console.WriteLine($"No title found in RecommendationMoviesTitles for {showId}");
                        continue;
                    }

                    var genreTables = GetGenreTables(movieTitle);
                    Console.WriteLine($"Genres being searched for {showId}: {string.Join(", ", genreTables)}");

                    foreach (var table in genreTables)
                    {
                        try
                        {
                            Console.WriteLine($"Looking in table: {table} for showId {showId}");
                            var sql = $"SELECT * FROM [{table}] WHERE CAST([show_id] AS VARCHAR(MAX)) = @p0";
                            var matches = await _recommenderContext.Set<GenericRecommendation>()
                                .FromSqlRaw(sql, showId)
                                .ToListAsync();

                            foreach (var m in matches)
                            {
                                if (!string.IsNullOrWhiteSpace(m.Recommendation1)) genreTypeIds.Add(m.Recommendation1.Trim().ToLower());
                                if (!string.IsNullOrWhiteSpace(m.Recommendation2)) genreTypeIds.Add(m.Recommendation2.Trim().ToLower());
                                if (!string.IsNullOrWhiteSpace(m.Recommendation3)) genreTypeIds.Add(m.Recommendation3.Trim().ToLower());

                                Console.WriteLine($"Found genre recs: {m.Recommendation1}, {m.Recommendation2}, {m.Recommendation3}");
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"SQL error in {table}: {ex.Message}");
                        }
                    }
                }

                var collabMovies = allTitles
                    .Where(t => !string.IsNullOrEmpty(t.Title) && collabIds.Contains(t.Title.Trim().ToLower()))
                    .ToList();

                var genreMovies = allTitles
                    .Where(t => !string.IsNullOrEmpty(t.Title) && genreTypeIds.Contains(t.Title.Trim().ToLower()))
                    .ToList();

                Console.WriteLine($"Final Collab Results: {collabMovies.Count}");
                Console.WriteLine($"Final Genre Results: {genreMovies.Count}");

                return Ok(new
                {
                    recommended = collabMovies,
                    genre = genreMovies
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "Server error", error = ex.Message });
            }
        }

        private List<string> GetGenreTables(RecommendationMoviesTitle title)
        {
            var tables = new List<string>();

            if (title.Action == 1) tables.Add("Movie_Action");
            if (title.Comedies == 1) tables.Add("Movie_Comedies");
            if (title.Documentaries == 1) tables.Add("Movie_Documentaries");
            if (title.HorrorMovies == 1) tables.Add("Movie_Horror_Movies");
            if (title.TvComedies == 1) tables.Add("TV_Show_Comedies");
            if (title.TvDramas == 1) tables.Add("TV_Show_Dramas");
            if (title.Fantasy == 1) tables.Add("Movie_Fantasy");
            if (title.Thrillers == 1) tables.Add("Movie_Thrillers");

            return tables;
        }
    }
}
