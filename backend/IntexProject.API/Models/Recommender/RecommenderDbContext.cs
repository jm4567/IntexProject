using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace IntexProject.API.Models.Recommender;

public partial class RecommenderDbContext : DbContext
{
    public RecommenderDbContext(DbContextOptions<RecommenderDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<General_Collaborative_Filtering_Recommendation> General_Collaborative_Filtering_Recommendations { get; set; }

    public virtual DbSet<General_Content_Filtering_Recommendation> General_Content_Filtering_Recommendations { get; set; }

    public virtual DbSet<Hidden_Gem> Hidden_Gems { get; set; }

    public virtual DbSet<Movie_Action> Movie_Actions { get; set; }

    public virtual DbSet<Movie_Adventure> Movie_Adventures { get; set; }

    public virtual DbSet<Movie_Child> Movie_Children { get; set; }

    public virtual DbSet<Movie_Comedies_Dramas_International_Movie> Movie_Comedies_Dramas_International_Movies { get; set; }

    public virtual DbSet<Movie_Comedies_International_Movie> Movie_Comedies_International_Movies { get; set; }

    public virtual DbSet<Movie_Comedies_Romantic_Movie> Movie_Comedies_Romantic_Movies { get; set; }

    public virtual DbSet<Movie_Comedy> Movie_Comedies { get; set; }

    public virtual DbSet<Movie_Documentaries_International_Movie> Movie_Documentaries_International_Movies { get; set; }

    public virtual DbSet<Movie_Documentary> Movie_Documentaries { get; set; }

    public virtual DbSet<Movie_Drama> Movie_Dramas { get; set; }

    public virtual DbSet<Movie_Dramas_International_Movie> Movie_Dramas_International_Movies { get; set; }

    public virtual DbSet<Movie_Dramas_Romantic_Movie> Movie_Dramas_Romantic_Movies { get; set; }

    public virtual DbSet<Movie_Family_Movie> Movie_Family_Movies { get; set; }

    public virtual DbSet<Movie_Fantasy> Movie_Fantasies { get; set; }

    public virtual DbSet<Movie_Horror_Movie> Movie_Horror_Movies { get; set; }

    public virtual DbSet<Movie_International_Movies_Thriller> Movie_International_Movies_Thrillers { get; set; }

    public virtual DbSet<Movie_Musical> Movie_Musicals { get; set; }

    public virtual DbSet<Movie_Spirituality> Movie_Spiritualities { get; set; }

    public virtual DbSet<Movie_Thriller> Movie_Thrillers { get; set; }

    public virtual DbSet<TV_Show_Action> TV_Show_Actions { get; set; }

    public virtual DbSet<TV_Show_Adventure> TV_Show_Adventures { get; set; }

    public virtual DbSet<TV_Show_Anime_Series_International_TV_Show> TV_Show_Anime_Series_International_TV_Shows { get; set; }

    public virtual DbSet<TV_Show_British_TV_Shows_Docuseries_International_TV_Show> TV_Show_British_TV_Shows_Docuseries_International_TV_Shows { get; set; }

    public virtual DbSet<TV_Show_Comedy> TV_Show_Comedies { get; set; }

    public virtual DbSet<TV_Show_Crime_TV_Shows_Docuseries> TV_Show_Crime_TV_Shows_Docuseries { get; set; }

    public virtual DbSet<TV_Show_Docuseries> TV_Show_Docuseries { get; set; }

    public virtual DbSet<TV_Show_Drama> TV_Show_Dramas { get; set; }

    public virtual DbSet<TV_Show_Fantasy> TV_Show_Fantasies { get; set; }

    public virtual DbSet<TV_Show_International_TV_Shows_Romantic_TV_Shows_TV_Drama> TV_Show_International_TV_Shows_Romantic_TV_Shows_TV_Dramas { get; set; }

    public virtual DbSet<TV_Show_Kids__TV> TV_Show_Kids__TVs { get; set; }

    public virtual DbSet<TV_Show_Language_TV_Show> TV_Show_Language_TV_Shows { get; set; }

    public virtual DbSet<TV_Show_Nature_TV> TV_Show_Nature_TVs { get; set; }

    public virtual DbSet<TV_Show_Reality_TV> TV_Show_Reality_TVs { get; set; }

    public virtual DbSet<TV_Show_TV_Action> TV_Show_TV_Actions { get; set; }

    public virtual DbSet<TV_Show_TV_Comedy> TV_Show_TV_Comedies { get; set; }

    public virtual DbSet<TV_Show_TV_Drama> TV_Show_TV_Dramas { get; set; }

    public virtual DbSet<TV_Show_Talk_Shows_TV_Comedy> TV_Show_Talk_Shows_TV_Comedies { get; set; }

    public virtual DbSet<TV_Show_Thriller> TV_Show_Thrillers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<General_Collaborative_Filtering_Recommendation>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<General_Content_Filtering_Recommendation>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.recommendation_1_title).HasColumnType("text");
            entity.Property(e => e.recommendation_2_title).HasColumnType("text");
            entity.Property(e => e.recommendation_3_title).HasColumnType("text");
            entity.Property(e => e.recommendation_4_title).HasColumnType("text");
            entity.Property(e => e.recommendation_5_title).HasColumnType("text");
            entity.Property(e => e.searched_cast).HasColumnType("text");
            entity.Property(e => e.searched_title).HasColumnType("text");
        });

        modelBuilder.Entity<Hidden_Gem>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.genre).HasColumnType("text");
            entity.Property(e => e.label).HasColumnType("text");
            entity.Property(e => e.recommendation_1_title).HasColumnType("text");
            entity.Property(e => e.recommendation_2_title).HasColumnType("text");
            entity.Property(e => e.recommendation_3_title).HasColumnType("text");
            entity.Property(e => e.recommendation_4_title).HasColumnType("text");
            entity.Property(e => e.recommendation_5_title).HasColumnType("text");
            entity.Property(e => e.searched_cast).HasColumnType("text");
            entity.Property(e => e.searched_title).HasColumnType("text");
            entity.Property(e => e.type).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Action>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Movie_Action");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Adventure>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Movie_Adventure");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Child>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Comedies_Dramas_International_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Comedies_International_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Comedies_Romantic_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Comedy>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Documentaries_International_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Documentary>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Drama>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Dramas_International_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Dramas_Romantic_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Family_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Fantasy>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Movie_Fantasy");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Horror_Movie>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_International_Movies_Thriller>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Musical>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Spirituality>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Movie_Spirituality");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<Movie_Thriller>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Action>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_Action");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Adventure>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_Adventure");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Anime_Series_International_TV_Show>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_British_TV_Shows_Docuseries_International_TV_Show>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Comedy>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Crime_TV_Shows_Docuseries>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Docuseries>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Drama>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Fantasy>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_Fantasy");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_International_TV_Shows_Romantic_TV_Shows_TV_Drama>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Kids__TV>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_Kids'_TV");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Language_TV_Show>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Nature_TV>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_Nature_TV");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Reality_TV>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_Reality_TV");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_TV_Action>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("TV_Show_TV_Action");

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_TV_Comedy>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_TV_Drama>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Talk_Shows_TV_Comedy>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        modelBuilder.Entity<TV_Show_Thriller>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.If_you_liked)
                .HasColumnType("text")
                .HasColumnName("If you liked");
            entity.Property(e => e.Recommendation_1)
                .HasColumnType("text")
                .HasColumnName("Recommendation 1");
            entity.Property(e => e.Recommendation_2)
                .HasColumnType("text")
                .HasColumnName("Recommendation 2");
            entity.Property(e => e.Recommendation_3)
                .HasColumnType("text")
                .HasColumnName("Recommendation 3");
            entity.Property(e => e.Recommendation_4)
                .HasColumnType("text")
                .HasColumnName("Recommendation 4");
            entity.Property(e => e.Recommendation_5)
                .HasColumnType("text")
                .HasColumnName("Recommendation 5");
            entity.Property(e => e.show_id).HasColumnType("text");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
