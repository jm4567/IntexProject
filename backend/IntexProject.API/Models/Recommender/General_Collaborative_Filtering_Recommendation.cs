using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models.Recommender;

public partial class General_Collaborative_Filtering_Recommendation
{
    [Column("show_id")]
    public string? show_id { get; set; }
    [Column("If you liked")]
    public string? If_you_liked { get; set; }
    [Column("Recommendation 1")]
    public string? Recommendation_1 { get; set; }
    [Column("Recommendation 2")]
    public string? Recommendation_2 { get; set; }
    [Column("Recommendation 3")]
    public string? Recommendation_3 { get; set; }
    [Column("Recommendation 4")]
    public string? Recommendation_4 { get; set; }
    [Column("Recommendation 5")]
    public string? Recommendation_5 { get; set; }
}
