using DomainModel.AppliedJobs;
using DomainModel.MasterDetails;
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

        DM_AppliedJobs GetAppliedJobsById(int Id);
        Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId);
        Task<bool> CreateAppliedJob(int job_Id, int User_Id);
        Task<bool> IsUserResumeUploaded(int userId);

        
        IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category);
        bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj);

    }
}
