﻿using DomainModel.AppliedJobs;
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
        Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId);
        bool CreateAppliedJob(int job_Id, int User_Id);

        //IEnumerable<DM_AppliedJobs> UpdateUserStatusandRound();
        IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category);
        bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj);

    }
}
