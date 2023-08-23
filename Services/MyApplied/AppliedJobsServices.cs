
using DomainModel.AppliedJob;
using DomainModel.Users;
using Repository.MyAppliedJos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.MyApplied
{
    public class AppliedJobsServices:IAppliedJobsServices
    {
        private readonly IAppliedJobsReposiotory _myAppliedRepository;

        public AppliedJobsServices(IAppliedJobsReposiotory MyAppliedJobsReposiotory)
        {
            _myAppliedRepository = MyAppliedJobsReposiotory;

        }
        public async Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId)
        {
            return await _myAppliedRepository.MyAppliedJobs(userId);
        }
    }
}
