using DomainModel.AppliedJobs;
using DomainModel.Jobs;
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
        bool CreateAppliedJob(int job_Id, int User_Id);

    }
}
