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
    }
}
