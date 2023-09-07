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
        IEnumerable<User> GetUsers();  // It will get all Users

        User AuthenticateUser(string Email, string Password);  // It will check authentication

        bool JobSeekerSignUp(string FirstName, string LastName, string Email, string Password);  // It will perform Sign Up functionality

        int GetRecentSignedUp_UserId(string Email);  // Getting UserId of User right after his Sign-Up Process, this UserId might be required for Dashboard related Operations.

        bool AuditUserLogin(AuditLogin model);  // It will insert entry into Table_AuditLogins of User who does Log-in

        IEnumerable<AuditLogin> GetRecentLogins();  // It will fetch recent 50 Login entries according to LoginTimeStamp

    }
}