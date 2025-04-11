using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IntexProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        // GET: api/Account/GetUserRole
        [Authorize]
        [HttpGet("GetUserRole")]
        public async Task<IActionResult> GetUserRole([FromServices] UserManager<IdentityUser> userManager)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
                return new UnauthorizedResult();

            var roles = await userManager.GetRolesAsync(user);
            return Ok(new { roles });
        }

        // ✅ NEW: GET: api/Account/current
        [Authorize]
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentUser([FromServices] UserManager<IdentityUser> userManager)
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            var roles = await userManager.GetRolesAsync(user);

            return Ok(new
            {
                name = user.UserName,
                email = user.Email,     // or user.Email if preferred
                accountType = roles.FirstOrDefault() ?? "Customer"
            });
        }
    }
}
