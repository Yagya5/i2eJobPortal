using DomainModel.CountryStateCityTable;
using DomainModel.EditUserFullDetails;
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
        IEnumerable<Job> GetJobsForHomePage();
        bool CreateJob(Job job_Obj);
        IEnumerable<Master> GetMasterValuesByCategory(string category);
        bool DeleteJob(int JobId);
        bool UpdateJob(Job job);
        Job GetJobByIdView(int jobId);
        Job GetJobById(int jobId);
        IEnumerable<Master> GetMasterValuesJob();
        IEnumerable<CountryStateCityData> GetAllCountryStateCity();
    }
}
