using Microsoft.AspNetCore.Identity;

namespace IntexProject.API.Services
{

    public class CustomIdentityErrorDescriber : IdentityErrorDescriber
    {
        public override IdentityError PasswordTooShort(int length)
        {
            return new IdentityError
            {
                Code = nameof(PasswordTooShort),
                Description = $"Passwords must be at least {length} characters long."
            };
        }

    }

}
