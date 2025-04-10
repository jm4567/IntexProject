using System;
using System.Collections.Generic;

namespace IntexProject.API.Models.Supplemental;

public partial class RecommendationMoviesRating
{
    public int? UserId { get; set; }

    public string? ShowId { get; set; }

    public int? Rating { get; set; }
}
