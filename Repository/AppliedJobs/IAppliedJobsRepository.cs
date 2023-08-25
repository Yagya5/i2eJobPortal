using DomainModel.AppliedJobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AppliedJobs
{
    public interface IAppliedJobsRepository
    {
        IEnumerable<DM_AppliedJobs> GetAppliedJobs();
        Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId);

    }
}
