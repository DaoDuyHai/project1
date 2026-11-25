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
            entity.Property(p => p.Price)
                  .HasColumnType("decimal(18,2)");

            entity.HasOne(p => p.Category)
                  .WithMany()
                  .HasForeignKey(p => p.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Quote>(entity =>
        {
            entity.HasOne(q => q.Product)
                  .WithMany()
                  .HasForeignKey(q => q.ProductId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
