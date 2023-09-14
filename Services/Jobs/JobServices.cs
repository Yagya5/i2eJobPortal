using DomainModel.CountryStateCityTable;
using DomainModel.EditUserFullDetails;
using DomainModel.Jobs;
using DomainModel.MasterDetails;
using Repository.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Services.Jobs
{
    public class JobServices : IJobServices
    {
        private readonly IJobRepository _jobRepository;

        public JobServices(IJobRepository JobRepository)
        {
            _jobRepository = JobRepository;
        }


        public IEnumerable<Job> GetJobs()
        {
            var result = _jobRepository.GetJobs();
            return result;
        }
        public IEnumerable<Master> GetMasterValuesJob()
        {
            var result = _jobRepository.GetMasterValuesJob();
            return result;

        }
        public bool CreateJob(Job job_Obj)
        {
            var result = _jobRepository.CreateJob(job_Obj);
            return result;
        }
        public IEnumerable<Master> GetMasterValuesByCategory(string category)
        {

            var result = _jobRepository.GetMasterValuesByCategory(category);
            return result;
        }

        public bool DeleteJob(int JobId)
        {
            var result = _jobRepository.DeleteJob(JobId);
            return result;
        }
        
             public Job GetJobById(int jobId)
        {
            var result = _jobRepository.GetJobById(jobId);
            return result;
        }
        public Job GetJobByIdView(int jobId)
        {
            var result = _jobRepository.GetJobByIdView(jobId);
            return result;
        }
        
        public bool UpdateJob(Job job)
        {
            var result = _jobRepository.UpdateJob(job);
            return result;
        }
        
        public IEnumerable<Job> GetJobsForHomePage()
        {
            var result = _jobRepository.GetJobsForHomePage();
            return result;
        }
        public IEnumerable<CountryStateCityData> GetAllCountryStateCity()
        {
            var result = _jobRepository.GetAllCountryStateCity();
            return result;
        }

        public Job GetJobById_ForAuditTrail(int jobId)
        {
            var result = _jobRepository.GetJobById_ForAuditTrail(jobId);
            return result;
        }

        public string GetCountryStateCityForAuditTrail(int category_Id, string category_Name)
        {
            var result = _jobRepository.GetCountryStateCityForAuditTrail(category_Id, category_Name);
            return result;
        }
    }
}