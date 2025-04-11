using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace IntexProject.API.Controllers;

// This controller manages user roles and is restricted to administrators
[Route("[controller]")]
[ApiController]
[Authorize(Roles = "Administrator")]
public class RoleController : Controller
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;

    // Constructor injects the role and user managers
    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    // Endpoint to add a new role
    // POST: /Role/AddRole
    [HttpPost("AddRole")]
    public async Task<IActionResult> AddRole(string roleName)
    {
        // Validate input
        if (string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("Role name cannot be empty.");
        }

        // Check if the role already exists
        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (roleExists)
        {
            return Conflict("Role already exists.");
        }

        // Attempt to create the new role
        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' created successfully.");
        }

        // If something went wrong, return server error
        return StatusCode(500, "An error occurred while creating the role.");
    }

    // Endpoint to assign an existing role to a user
    // POST: /Role/AssignRoleToUser
    [HttpPost("AssignRoleToUser")]
    public async Task<IActionResult> AssignRoleToUser(string userEmail, string roleName)
    {
        // Validate inputs
        if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("User email and role name are required.");
        }

        // Find the user by email
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        // Ensure the role exists
        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            return NotFound("Role does not exist.");
        }

        // Assign the role to the user
        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' assigned to user '{userEmail}'.");
        }

        // Handle assignment failure
        return StatusCode(500, "An error occurred while assigning the role.");
    }
}
