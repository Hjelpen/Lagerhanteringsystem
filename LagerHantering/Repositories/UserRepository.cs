using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;
using LagerHantering.Models;
using LagerHantering.DataAcess;
using LagerHantering.Providers;

namespace LagerHantering.Repositories
{
    public class UserRepository : IDisposable
    {

        private DefaultDbContext _ctx;

        private UserManager<ApplicationUser> _userManager;

        public UserRepository()
        {
            _ctx = new DefaultDbContext();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(User userModel)
        {

            ApplicationUser user = new ApplicationUser
            {
                UserName = userModel.UserName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<ApplicationUser> FindUser(string userName, string password)
        {
            ApplicationUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public ApplicationUser GetUserByUserName(string userName)
        {
            ApplicationUser user = _userManager.FindByName(userName);

            return user;
        }

        public void Dispose()
        {

            _ctx = null;
            _userManager.Dispose();
        }
    }
}