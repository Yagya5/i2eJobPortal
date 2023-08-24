using DomainModel.Jobs;
using DomainModel.MasterDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Jobs
{
    public interface IJobServices
    {
        IEnumerable<Job> GetJobs();
        Master FindJobIdInMaster(int jobId);
        bool CreateJob(Job job_Obj);
        IEnumerable<Master> GetMasterValuesByCategory(string category);
        bool DeleteJob(int JobId);
        Job GetJobById(int jobId);
        bool UpdateJob(Job job);
    }
}
