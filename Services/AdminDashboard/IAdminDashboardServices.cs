using DomainModel.AdminDashboard;
using DomainModel.AppliedJobs;
using DomainModel.Jobs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.AdminDashboard
{
    public interface IAdminDashboardServices
    {
        //public DataSet GetAdminDashData();
        IEnumerable<Counts> GetCounts();
        IEnumerable<JobDetails> GetJobDetails();

        IEnumerable<AuditDetails> GetAuditDetails();

        IEnumerable<JobDetails> GetJobModeDetails();

        IEnumerable<Job> GetStatewise_JobCount();
    }
}
