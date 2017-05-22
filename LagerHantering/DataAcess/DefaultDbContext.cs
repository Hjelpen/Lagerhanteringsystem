using LagerHantering.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;


namespace LagerHantering.DataAcess
{
    public class DefaultDbContext : IdentityDbContext<ApplicationUser>
    {
        public DefaultDbContext() : base("DbContext")
        {

        }

        public DbSet<Component> Components { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Receipt> Receipts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Component>()
                        .HasMany<Article>(s => s.Articles)
                        .WithMany(c => c.Components)
                        .Map(cs =>
                        {
                            cs.MapLeftKey("ComponentId");
                            cs.MapRightKey("ArticleId");
                            cs.ToTable("ArticleComponents");
                        });

            base.OnModelCreating(modelBuilder);
        }

    }
}