namespace LagerHantering.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LagerHantering.DataAcess.DbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "LagerHantering.DataAcess.DbContext";
        }

        protected override void Seed(DataAcess.DbContext context)
        {
            DataAcess.DbContext userscontext = new DataAcess.DbContext();
            var userStore = new UserStore<ApplicationUser>(userscontext);
            var userManager = new UserManager<ApplicationUser>(userStore);

            var roleStore = new RoleStore<IdentityRole>(userscontext);
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            // Create Role
            if (!roleManager.RoleExists("Admin"))
            {
                roleManager.Create(new IdentityRole("Admin"));
            }

            if (!userscontext.Users.Any(x => x.UserName == "admin"))
            {
                // Create User
                var user = new ApplicationUser { UserName = "admin", Email = "admin@mail.se" };
                userManager.Create(user, "Passw0rd");

                // Add User To Role
                if (!userManager.IsInRole(user.Id, "Admin"))
                {
                    userManager.AddToRole(user.Id, "Admin");
                }

            }
        }
    }
}
