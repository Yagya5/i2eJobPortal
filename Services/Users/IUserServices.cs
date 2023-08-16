using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Users
{
    public interface IUserServices
    {
        IEnumerable<User> GetUsers();

        User AuthenticateUser(string Email, string Password);

        bool JobSeekerSignUp(string FirstName, string LastName, string Email, string Password);

        int GetRecentSignedUp_UserId(string Email);
    }
}
