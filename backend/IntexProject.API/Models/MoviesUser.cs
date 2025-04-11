using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntexProject.API.Models
{
    // Maps this class to the "movies_users" table in the database
    [Table("movies_users")]
    public partial class MoviesUser
    {
        // Primary user identifier (part of composite key with Subscription)
        [Required]
        [Column("user_id")]
        public required int UserId { get; set; }

        // Full name of the user
        [Required]
        public required string Name { get; set; }

        // Phone number (stored as string for formatting flexibility)
        [Required]
        public required string Phone { get; set; }

        // Email address (used for login or lookup)
        [Required]
        public required string Email { get; set; }

        // User's age
        [Required]
        public required int Age { get; set; }

        // Gender encoded as an integer (e.g., 0 = Male, 1 = Female, etc.)
        [Required]
        public required int Gender { get; set; }

        // City of residence
        [Required]
        public required string City { get; set; }

        // State of residence
        [Required]
        public required string State { get; set; }

        // Zip code
        [Required]
        public required int Zip { get; set; }

        // Type of subscription (e.g., "Basic", "Premium", etc.) — part of composite key
        public required string Subscription { get; set; }
    }
}
