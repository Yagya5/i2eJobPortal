using DomainModel.AppliedJobs;
using DomainModel.MasterDetails;
using DomainModel.RegisteredJobSeekers;
using Repository.AppliedJobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AppliedJobs
{
    public interface IAppliedJobsServices
    {


        IEnumerable<DM_AppliedJobs> GetAppliedJobs();
        Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId);
        IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category);
         Task<bool> CreateAppliedJob( int job_Id, int User_Id);
        Task<bool> IsUserResumeUploaded(int userId);
        

        bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj);

        DM_AppliedJobs GetAppliedJobsById(int Id);
    }
}
