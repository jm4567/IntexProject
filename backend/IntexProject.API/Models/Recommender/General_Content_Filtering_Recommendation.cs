using System;
using System.Collections.Generic;

namespace IntexProject.API.Models.Recommender;

public partial class General_Content_Filtering_Recommendation
{
    public string? searched_title { get; set; }

    public string? searched_cast { get; set; }

    public string? recommendation_1_title { get; set; }

    public string? recommendation_2_title { get; set; }

    public string? recommendation_3_title { get; set; }

    public string? recommendation_4_title { get; set; }

    public string? recommendation_5_title { get; set; }
}
