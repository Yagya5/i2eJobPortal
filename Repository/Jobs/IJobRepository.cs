using DomainModel.Jobs;
using DomainModel.MasterDetails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Jobs
{
    public interface IJobRepository
    {
        IEnumerable<Job> GetJobs();
        bool CreateJob(Job job_Obj);
        Master FindJobIdInMaster(int jobId); /*This will be use to fetch the values of the id*/
        IEnumerable<Master> GetMasterValuesByCategory(string category);
        bool DeleteJob(int JobId);
        Job GetJobById(int jobId);
        bool UpdateJob(Job job);
        int GetMasterIdByValue(string category, string value);
    }
}
