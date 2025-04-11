using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models.Recommender
{
    public class GenericRecommendation
    {
        [Column("show_id")]
        public string ShowId { get; set; }

        [Column("Recommendation 1")]
        public string Recommendation1 { get; set; }

        [Column("Recommendation 2")]
        public string Recommendation2 { get; set; }

        [Column("Recommendation 3")]
        public string Recommendation3 { get; set; }

        [Column("Recommendation 4")]
        public string Recommendation4 { get; set; }

        [Column("Recommendation 5")]
        public string Recommendation5 { get; set; }
    }
}

