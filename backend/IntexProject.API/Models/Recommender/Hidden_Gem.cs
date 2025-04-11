using System;
using System.Collections.Generic;

namespace IntexProject.API.Models.Recommender
{
    // Represents a "hidden gem" recommendation record used in the recommender system
    public partial class Hidden_Gem
    {
        // Title of the movie/show that the recommendation is based on
        public string? searched_title { get; set; }

        // Cast information for the searched title (may be used for similarity scoring)
        public string? searched_cast { get; set; }

        // Top 5 recommended titles based on the searched title
        public string? recommendation_1_title { get; set; }
        public string? recommendation_2_title { get; set; }
        public string? recommendation_3_title { get; set; }
        public string? recommendation_4_title { get; set; }
        public string? recommendation_5_title { get; set; }

        // Genre associated with the searched title
        public string? genre { get; set; }

        // Type of media (e.g., "Movie", "TV Show")
        public string? type { get; set; }

        // Label to categorize or tag the recommendation (e.g., "Hidden Gem", "Classic", etc.)
        public string? label { get; set; }
    }
}
