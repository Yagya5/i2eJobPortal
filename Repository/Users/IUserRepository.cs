using DomainModel.AuditLogins;
using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Repository.Users
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();

        User AuthenticateUser(string Email, string Password);

        bool JobSeekerSignUp(string FirstName, string LastName, string Email, string Password);

        int GetRecentSignedUp_UserId(string Email);

        bool AuditUserLogin(AuditLogin model);

        IEnumerable<AuditLogin> GetRecentLogins();


    }
}
