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
    }
}
