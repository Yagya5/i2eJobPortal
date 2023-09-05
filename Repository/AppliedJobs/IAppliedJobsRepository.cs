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

        //IEnumerable<DM_AppliedJobs> UpdateUserStatusandRound();
        IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category);
        bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj);

    }
}
