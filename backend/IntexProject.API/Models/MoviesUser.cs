using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models;

[Table("movies_users")]
public partial class MoviesUser
{
    [Required]
    [Column("user_id")]

    public required int UserId { get; set; }

    [Required]
    public required string Name { get; set; }

    [Required]
    public required string Phone { get; set; }

    [Required]
    public required string Email { get; set; }

    [Required]
    public required int Age { get; set; }
    
    [Required]
    public required int Gender { get; set; }

    [Required]
    public required string City { get; set; }

    [Required]
    public required string State { get; set; }

    [Required]
    public required int Zip { get; set; }
    
    public required string Subscription { get; set; }
}
