using Microsoft.EntityFrameworkCore;
using ThangLoiPrinting.Domain.Entities;

namespace ThangLoiPrinting.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<News> News => Set<News>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<Quote> Quotes => Set<Quote>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Title).HasMaxLength(250).IsRequired();
            entity.Property(p => p.Slug).HasMaxLength(250).IsRequired();
            entity.Property(p => p.Image).HasMaxLength(500).IsRequired();
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            entity.Property(p => p.PriceUnit).HasMaxLength(50).HasDefaultValue("/hộp");
            entity.Property(p => p.Sku).HasMaxLength(50);
            entity.Property(p => p.CreatedAt).HasDefaultValueSql("getutcdate()");

            entity.HasOne(p => p.Category)
                  .WithMany()
                  .HasForeignKey(p => p.CategoryId)
                  .HasConstraintName("FK_Products_Categories")
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.Property(n => n.Title).HasMaxLength(500).IsRequired();
            entity.Property(n => n.Slug).HasMaxLength(500).IsRequired();
            entity.Property(n => n.Summary).HasMaxLength(1000).IsRequired();
            entity.Property(n => n.Image).HasMaxLength(500).IsRequired();
            entity.Property(n => n.IsFeatured).HasDefaultValue(false);
            entity.Property(n => n.Views).HasDefaultValue(0);
            entity.Property(n => n.PublishedAt).HasDefaultValueSql("getutcdate()");
            entity.Property(n => n.CreatedAt).HasDefaultValueSql("getutcdate()");
        });

        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.Property(t => t.Name).HasMaxLength(250).IsRequired();
            entity.Property(t => t.Role).HasMaxLength(250).IsRequired();
            entity.Property(t => t.Avatar).HasMaxLength(500).IsRequired();
            entity.Property(t => t.Quote).HasMaxLength(1000).IsRequired();
            entity.Property(t => t.Rating).HasSentinel(0).HasDefaultValue(5);
            entity.Property(t => t.DisplayOrder).HasDefaultValue(0);
            entity.Property(t => t.CreatedAt).HasDefaultValueSql("getutcdate()");
        });

        modelBuilder.Entity<Quote>(entity =>
        {
            entity.Property(q => q.FullName).HasMaxLength(250).IsRequired();
            entity.Property(q => q.PhoneNumber).HasMaxLength(50).IsRequired();
            entity.Property(q => q.Email).HasMaxLength(250);
            entity.Property(q => q.Quantity).HasSentinel(0).HasDefaultValue(100);
            entity.Property(q => q.Status).HasMaxLength(50).HasDefaultValue("Pending");
            entity.Property(q => q.CreatedAt).HasDefaultValueSql("getutcdate()");

            entity.HasOne(q => q.Product)
                  .WithMany()
                  .HasForeignKey(q => q.ProductId)
                  .HasConstraintName("FK_Quotes_Products")
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
