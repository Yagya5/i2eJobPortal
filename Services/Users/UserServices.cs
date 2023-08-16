using DomainModel.Users;
using Repository.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Users
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _UserRepository;

        public UserServices(IUserRepository UserRepository)
        {
            _UserRepository = UserRepository;    
        }

        public User AuthenticateUser(string Email, string Password)
        {
           var result =  _UserRepository.AuthenticateUser(Email, Password);
            return result;
        }

        public int GetRecentSignedUp_UserId(string Email)
        {
            int result = _UserRepository.GetRecentSignedUp_UserId(Email);
            return result;
        }

        public IEnumerable<User> GetUsers()
        {
            var result = _UserRepository.GetUsers();
            return result;
        }

        public bool JobSeekerSignUp(string FirstName, string LastName, string Email, string Password)
        {
            var result = _UserRepository.JobSeekerSignUp(FirstName, LastName, Email, Password);
            return result;
        }
    }
}
