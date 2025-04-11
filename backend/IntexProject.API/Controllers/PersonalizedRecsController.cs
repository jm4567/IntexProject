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
                    var rec = allCollaborativeRecs.FirstOrDefault(r =>
                        r.show_id?.Trim().ToLower() == showId.Trim().ToLower());

                    if (rec != null)
                    {
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_1)) collabIds.Add(rec.Recommendation_1.Trim().ToLower());
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_2)) collabIds.Add(rec.Recommendation_2.Trim().ToLower());
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_3)) collabIds.Add(rec.Recommendation_3.Trim().ToLower());
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_4)) collabIds.Add(rec.Recommendation_4.Trim().ToLower());
                        if (!string.IsNullOrWhiteSpace(rec.Recommendation_5)) collabIds.Add(rec.Recommendation_5.Trim().ToLower());
                    }

                    var movieTitle = allTitles.FirstOrDefault(t => t.ShowId == showId);
                    if (movieTitle == null) continue;

                    var genreTables = GetGenreTables(movieTitle);

                    foreach (var table in genreTables)
                    {
                        try
                        {
                            var sql = $"SELECT * FROM [{table}] WHERE CAST([show_id] AS VARCHAR(MAX)) = @p0";
                            var matches = await _recommenderContext.Set<GenericRecommendation>()
                                .FromSqlRaw(sql, showId)
                                .ToListAsync();

                            foreach (var m in matches)
                            {
                                if (!string.IsNullOrWhiteSpace(m.Recommendation1)) genreTypeIds.Add(m.Recommendation1.Trim().ToLower());
                                if (!string.IsNullOrWhiteSpace(m.Recommendation2)) genreTypeIds.Add(m.Recommendation2.Trim().ToLower());
                                if (!string.IsNullOrWhiteSpace(m.Recommendation3)) genreTypeIds.Add(m.Recommendation3.Trim().ToLower());
                                if (!string.IsNullOrWhiteSpace(m.Recommendation4)) genreTypeIds.Add(m.Recommendation4.Trim().ToLower());
                                if (!string.IsNullOrWhiteSpace(m.Recommendation5)) genreTypeIds.Add(m.Recommendation5.Trim().ToLower());
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

                // Include collaborative movies into genreMovies if not already there
                foreach (var movie in collabMovies)
                {
                    if (!genreMovies.Any(g => g.ShowId == movie.ShowId))
                    {
                        genreMovies.Add(movie);
                    }
                }

                var originalGroups = genreMovies
                    .GroupBy(m => GetCatchyGenreName(m))
                    .ToDictionary(g => g.Key, g => g.ToList());

                var mergeMap = new Dictionary<string, string>
                {
                    { "Your Dose of Daily Humor", "The Comedy Hour" },
                    { "Snackable Sitcoms", "The Comedy Hour" },
                    { "Love in Laugh Tracks", "The Comedy Hour" },
                    { "Global Giggles", "The Comedy Hour" },
                    { "Series That Keep You Laughing", "The Comedy Hour" },
                    { "Emotionally Driven Cinema", "Drama Club Select" },
                    { "Your Next Obsession Starts Here", "Drama Club Select" },
                    { "Serialized Stories on the Big Screen", "Drama Club Select" },
                    { "Feels from Every Corner of the Globe", "Drama Club Select" },
                    { "Love and Drama, Internationally Yours", "Drama Club Select" },
                    { "Love, Conflict, and Everything Between", "Drama Club Select" },
                    { "True Stories, Thoughtfully Told", "The Reel Truth" },
                    { "Docuseries Without Borders", "The Reel Truth" },
                    { "Reality that Rivets", "The Reel Truth" },
                    { "True Stories, Episode by Episode", "The Reel Truth" },
                    { "Tension and Terror", "Fear in Focus" },
                    { "Screams, One Episode at a Time", "Fear in Focus" },
                    { "Plot Twists You Didn't See Coming", "Fear in Focus" },
                    { "Tight Plots. Real Stakes.", "Fear in Focus" },
                    { "Twists from All Over", "Fear in Focus" },
                    { "Global Suspense Stories", "Fear in Focus" },
                    { "Love on Screen", "Silver Screen Sweethearts" },
                    { "Love Without Borders", "Silver Screen Sweethearts" },
                    { "Love and Loss on Film", "Silver Screen Sweethearts" },
                    { "High Impact Stories", "8-Bit Adventures" },
                    { "Adrenaline in Episodes", "8-Bit Adventures" },
                    { "Journeys Worth Takin", "8-Bit Adventures" },
                    { "New Worlds Every Week", "8-Bit Adventures" },
                    { "Stories for Young Minds", "Family Flick Fest" },
                    { "TV for Tiny Legends", "Family Flick Fest" },
                    { "Big Adventures for Small Viewers", "Family Flick Fest" },
                    { "Everyday Magic for Kids", "Family Flick Fest" },
                    { "Films for All Ages", "Family Flick Fest" },
                    { "Melodies You Can Binge", "Soul & Sound" },
                    { "Stories in Song", "Soul & Sound" },
                    { "Faith, Meaning, and Reflection", "Soul & Sound" },
                    { "Episodes that Elevate", "Soul & Sound" },
                    { "The Natural World in Focus", "Soul & Sound" },
                    { "Wild Wonders in HD", "Soul & Sound" },
                    { "Global Anime Highlights", "Reel Around the World" },
                    { "Top Anime from Around the World", "Reel Around the World" },
                    { "Streaming in Every Language", "Reel Around the World" },
                    { "World Cinema Selections", "Reel Around the World" },
                    { "Crime Through a Cinematic Lens", "Mystery Machine" },
                    { "Mystery That Hooks You", "Mystery Machine" },
                };

                var mergedGenreGroups = new Dictionary<string, List<RecommendationMoviesTitle>>();

                foreach (var kvp in originalGroups)
                {
                    var genreName = kvp.Key;
                    var movies = kvp.Value;

                    string targetGroup = genreName;

                    if (movies.Count < 5 && mergeMap.ContainsKey(genreName))
                    {
                        targetGroup = mergeMap[genreName];
                    }

                    if (!mergedGenreGroups.ContainsKey(targetGroup))
                        mergedGenreGroups[targetGroup] = new List<RecommendationMoviesTitle>();

                    mergedGenreGroups[targetGroup].AddRange(movies);
                }

                return Ok(new
                {
                    recommended = collabMovies,
                    genre = genreMovies,
                    genreSections = mergedGenreGroups.Select(g => new
                    {
                        title = g.Key,
                        movies = g.Value.DistinctBy(m => m.ShowId).Take(10).ToList()
                    })
                    .Where(g => g.movies.Count >= 5)
                    .ToList()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Server error", error = ex.Message });
            }
        }

        private string GetCatchyGenreName(RecommendationMoviesTitle title)
        {
            bool isMovie = title.Type?.Trim().ToLower() == "movie";
            bool isTvShow = title.Type?.Trim().ToLower().Contains("tv") == true;

            var genres = new List<string>();

            if (title.Action == 1)
                genres.Add(isMovie ? "High Impact Stories" : "Adrenaline in Episodes");

            if (title.Adventure == 1)
                genres.Add(isMovie ? "Journeys Worth Takin" : "New Worlds Every Week");

            if (title.AnimeSeriesInternationalTvShows == 1)
                genres.Add(isMovie ? "Global Anime Highlights" : "Top Anime from Around the World");

            if (title.BritishTvShowsDocuseriesInternationalTvShows == 1)
                genres.Add(isMovie ? "UK & World Perspectives" : "Across the Pond & Beyond");

            if (title.Children == 1)
                genres.Add(isMovie ? "Stories for Young Minds" : "TV for Tiny Legends");

            if (title.Comedies == 1)
                genres.Add(isMovie ? "Your Dose of Daily Humor" : "Series That Keep You Laughing");

            if (title.ComediesDramasInternationalMovies == 1)
                genres.Add(isMovie ? "International Slices of Life" : "Global Dramedies to Devour");

            if (title.ComediesInternationalMovies == 1)
                genres.Add(isMovie ? "Global Laughs" : "Global Giggles");

            if (title.ComediesRomanticMovies == 1)
                genres.Add(isMovie ? "Love on Screen" : "Love in Laugh Tracks");

            if (title.CrimeTvShowsDocuseries == 1)
                genres.Add(isMovie ? "Crime Through a Cinematic Lens" : "Mystery That Hooks You");

            if (title.Documentaries == 1)
                genres.Add(isMovie ? "True Stories, Thoughtfully Told" : "True Stories, Episode by Episode");

            if (title.DocumentariesInternationalMovies == 1)
                genres.Add(isMovie ? "Global Nonfiction Features" : "Docuseries Without Borders");

            if (title.Docuseries == 1)
                genres.Add(isMovie ? "Unscripted. Unfiltered." : "Reality that Rivets");

            if (title.Dramas == 1)
                genres.Add(isMovie ? "Emotionally Driven Cinema" : "Your Next Obsession Starts Here");

            if (title.DramasInternationalMovies == 1)
                genres.Add(isMovie ? "Stories That Cross Borders" : "Feels from Every Corner of the Globe");

            if (title.DramasRomanticMovies == 1)
                genres.Add(isMovie ? "Love and Loss on Film" : "Love, Conflict, and Everything Between");

            if (title.FamilyMovies == 1)
                genres.Add(isMovie ? "Films for All Ages" : "TV for All Generations");

            if (title.Fantasy == 1)
                genres.Add(isMovie ? "Imaginative Worlds, Big-Screen Scope" : "Dream Realms Weekly");

            if (title.HorrorMovies == 1)
                genres.Add(isMovie ? "Tension and Terror" : "Screams, One Episode at a Time");

            if (title.InternationalMoviesThrillers == 1)
                genres.Add(isMovie ? "Global Suspense Stories" : "Twists from All Over");

            if (title.InternationalTvShowsRomanticTvShowsTvDramas == 1)
                genres.Add(isMovie ? "Love Without Borders" : "Love and Drama, Internationally Yours");

            if (title.KidsTv == 1)
                genres.Add(isMovie ? "Big Adventures for Small Viewers" : "Everyday Magic for Kids");

            if (title.LanguageTvShows == 1)
                genres.Add(isMovie ? "World Cinema Selections" : "Streaming in Every Language");

            if (title.Musicals == 1)
                genres.Add(isMovie ? "Stories in Song" : "Melodies You Can Binge");

            if (title.NatureTv == 1)
                genres.Add(isMovie ? "The Natural World in Focus" : "Wild Wonders in HD");

            if (title.Spirituality == 1)
                genres.Add(isMovie ? "Faith, Meaning, and Reflection" : "Episodes that Elevate");

            if (title.TvAction == 1)
                genres.Add(isMovie ? "Series-Style Action, Film-Sized Impact" : "Punchy Plots & Heroic Hooks");

            if (title.TvComedies == 1)
                genres.Add(isMovie ? "Light Stories with Familiar Faces" : "Snackable Sitcoms");

            if (title.TvDramas == 1)
                genres.Add(isMovie ? "Serialized Stories on the Big Screen" : "Episodes That Tug the Heart");

            if (title.TalkShowsTvComedies == 1)
                genres.Add(isMovie ? "Conversations in Motion" : "Fresh Takes, Casual Conversations");

            if (title.Thrillers == 1)
                genres.Add(isMovie ? "Tight Plots. Real Stakes." : "Plot Twists You Didn't See Coming");

            return genres.FirstOrDefault() ?? "Top Picks For You";
        }

        private List<string> GetGenreTables(RecommendationMoviesTitle title)
        {
            var tables = new List<string>();
            bool isMovie = title.Type?.Trim().ToLower() == "movie";
            bool isTvShow = title.Type?.Trim().ToLower().Contains("tv") == true;

            if (title.Action == 1)
                tables.Add(isMovie ? "Movie_Action" : "TV_Show_Action");

            if (title.Adventure == 1)
                tables.Add(isMovie ? "Movie_Adventure" : "TV_Show_Adventure");

            if (title.AnimeSeriesInternationalTvShows == 1)
                tables.Add(isMovie ? "Movie_Anime_Series_International_TV_Shows" : "TV_Show_Anime_Series_International_TV_Shows");

            if (title.BritishTvShowsDocuseriesInternationalTvShows == 1)
                tables.Add(isMovie ? "Movie_British_TV_Shows_Docuseries_International_TV_Shows" : "TV_Show_Anime_British_TV_Shows_Docuseries_International_TV_Shows");

            if (title.Children == 1)
                tables.Add(isMovie ? "Movie_Children" : "TV_Show_Children");

            if (title.Comedies == 1)
                tables.Add(isMovie ? "Movie_Comedies" : "TV_Show_Comedies");

            if (title.ComediesDramasInternationalMovies == 1)
                tables.Add(isMovie ? "Movie_Comedies_Dramas_International_Movies" : "TV_Show_Comedies_Dramas_International_Movies");

            if (title.ComediesInternationalMovies == 1)
                tables.Add(isMovie ? "Movie_Comedies_International_Movies" : "TV_Show_Comedies_International_Movies");

            if (title.ComediesRomanticMovies == 1)
                tables.Add(isMovie ? "Movie_Comedies_Romantic_Movies" : "TV_Show_Comedies_Romantic_Movies");

            if (title.CrimeTvShowsDocuseries == 1)
                tables.Add(isMovie ? "Movie_Crime_TV_Shows_Docuseries" : "TV_Show_Crime_TV_Shows_Docuseries");

            if (title.Documentaries == 1)
                tables.Add(isMovie ? "Movie_Documentaries" : "TV_Show_Documentaries");

            if (title.DocumentariesInternationalMovies == 1)
                tables.Add(isMovie ? "Movie_Documentaries_International_Movies" : "TV_Show_Documentaries_International_Movies");

            if (title.Docuseries == 1)
                tables.Add(isMovie ? "Movie_Docuseries" : "TV_Show_Docuseries");

            if (title.Dramas == 1)
                tables.Add(isMovie ? "Movie_Dramas" : "TV_Show_Dramas");

            if (title.DramasInternationalMovies == 1)
                tables.Add(isMovie ? "Movie_Dramas_International_Movies" : "TV_Show_Dramas_International_Movies");

            if (title.DramasRomanticMovies == 1)
                tables.Add(isMovie ? "Movie_Dramas_Romantic_Movies" : "TV_Show_Dramas_Romantic_Movies");

            if (title.FamilyMovies == 1)
                tables.Add(isMovie ? "Movie_Family_Movies" : "TV_Show_Family_Movies");

            if (title.Fantasy == 1)
                tables.Add(isMovie ? "Movie_Fantasy" : "TV_Show_Fantasy");

            if (title.HorrorMovies == 1)
                tables.Add(isMovie ? "Movie_Horror_Movies" : "TV_Show_Horror_Movies");

            if (title.InternationalMoviesThrillers == 1)
                tables.Add(isMovie ? "Movie_International_Movies_Thrillers" : "TV_Show_International_Movies_Thrillers");

            if (title.InternationalTvShowsRomanticTvShowsTvDramas == 1)
                tables.Add(isMovie ? "Movie_International_TV_Shows_Romantic_TV_Shows_TV_Dramas" : "TV_Show_International_TV_Shows_Romantic_TV_Shows_TV_Dramas");

            if (title.KidsTv == 1)
                tables.Add(isMovie ? "Movie_Kids'_TV" : "TV_Show_Kids'_TV");

            if (title.LanguageTvShows == 1)
                tables.Add(isMovie ? "Movie_Language_TV_Shows" : "TV_Show_Language_TV_Shows");

            if (title.Musicals == 1)
                tables.Add(isMovie ? "Movie_Musicals" : "TV_Show_Musicals");

            if (title.NatureTv == 1)
                tables.Add(isMovie ? "Movie_Nature_TV" : "TV_Show_Nature_TV");

            if (title.Spirituality == 1)
                tables.Add(isMovie ? "Movie_Spirituality" : "TV_Show_Spirituality");

            if (title.TvAction == 1)
                tables.Add(isMovie ? "Movie_TV_Action" : "TV_Show_TV_Action");

            if (title.TvComedies == 1)
                tables.Add(isMovie ? "Movie_TV_Comedies" : "TV_Show_TV_Comedies");

            if (title.TvDramas == 1)
                tables.Add(isMovie ? "Movie_TV_Dramas" : "TV_Show_TV_Dramas");

            if (title.TalkShowsTvComedies == 1)
                tables.Add(isMovie ? "Movie_Talk_Shows_TV_Comedies" : "TV_Show_Talk_Shows_TV_Comedies");

            if (title.Thrillers == 1)
                tables.Add(isMovie ? "Movie_Thrillers" : "TV_Show_Thrillers");

            return tables;
        }

    }
}