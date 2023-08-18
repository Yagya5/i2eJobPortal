
using DomainModel.AppliedJob;
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
        private readonly IAppliedReposiotory _myAppliedRepository;

        public AppliedJobsServices(IAppliedReposiotory MyAppliedJobsReposiotory)
        {
            _myAppliedRepository = MyAppliedJobsReposiotory;

        }
        public IEnumerable<ViewModel_AppliedJob> MyAppliedJobs()
        {
            var result = _myAppliedRepository.MyAppliedJobs();
            return result;
        }
    }
}
