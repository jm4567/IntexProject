using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace IntexProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
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

    }
}
