using DomainModel.Users;
using Repository.RegisteredJobSeekers;
using Repository.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;

namespace Services.RegisteredJobSeekers
{
    public class RegisteredJobSeekersServices : IRegisteredJobSeekersServices
    {
        private readonly IRegisteredJobSeekersRepository _JobSeekersRepository;

        public RegisteredJobSeekersServices(IRegisteredJobSeekersRepository RegisteredJobSeekersRepository) 
        {
            _JobSeekersRepository = RegisteredJobSeekersRepository;
            
        }
        public IEnumerable<RegisteredJobSeeker> GetRegisteredJobSeekers()
        {
            var result = _JobSeekersRepository.GetRegisteredJobSeekers();
            return result;
        }

        public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker)
        {
            var result = _JobSeekersRepository.UpdateJobSeekerAccountStatus(jobSeeker);
            return result;
        }
    }
}
