using LagerHantering.Models;
using LagerHantering.Repositories;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http;

namespace LagerHantering.API
{
    [RoutePrefix("api/Account")]
    [Authorize]
    public class AccountController : ApiController
    {
        private UserRepository _repo = null;

        public AccountController()
        {
            _repo = new UserRepository();
        }

        [Authorize]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(User userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await _repo.RegisterUser(userModel);

            if (result == null) return InternalServerError();

            return Ok();
        }
    }
}