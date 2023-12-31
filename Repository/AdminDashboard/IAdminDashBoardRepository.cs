﻿using DomainModel.AdminDashboard;
using DomainModel.AppliedJobs;
using DomainModel.Jobs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AdminDashboard
{
    public interface IAdminDashBoardRepository
    {
       

        IEnumerable<Counts> GetCounts();
        IEnumerable<JobDetails> GetJobDetails();

        IEnumerable<AuditDetails> GetAuditDetails();
        IEnumerable<JobDetails> GetJobModeDetails();

        IEnumerable<Job> GetStatewise_JobCount();
    }
}
