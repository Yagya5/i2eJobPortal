using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;

namespace Services.RegisteredJobSeekers
{
    public interface IRegisteredJobSeekersServices
    {
        IEnumerable<RegisteredJobSeeker> GetRegisteredJobSeekers();
        public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker);
        RegisteredJobSeeker GetJobSeekerById(int id);
    }
}
