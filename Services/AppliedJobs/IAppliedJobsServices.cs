﻿using DomainModel.AppliedJobs;
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
        //Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId);
        IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category);

        bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj);
    }
}
