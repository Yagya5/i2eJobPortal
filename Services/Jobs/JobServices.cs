using DomainModel.Jobs;
using DomainModel.MasterDetails;
using Repository.Jobs;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public Master FindJobIdInMaster(int jobId)
        {
            var result = _jobRepository.FindJobIdInMaster(jobId);
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
        public bool UpdateJob(Job job)
        {
            var result = _jobRepository.UpdateJob(job);
            return result;
        }
        public int GetMasterIdByValue(string category, string value)
        {
            var result = _jobRepository.GetMasterIdByValue(category, value);
            return result;
        }

        public IEnumerable<Job> GetJobsForHomePage()
        {
            var result = _jobRepository.GetJobsForHomePage();
            return result;
        }
    }
}