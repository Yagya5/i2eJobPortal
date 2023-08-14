using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;

namespace Repository.RegisteredJobSeekers
{
    public interface IRegisteredJobSeekersRepository
    {
        IEnumerable<RegisteredJobSeeker> GetRegisteredJobSeekers();

        public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker);
    }

    
}
