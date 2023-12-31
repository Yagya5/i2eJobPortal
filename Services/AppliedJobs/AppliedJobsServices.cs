﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.AppliedJobs;
using DomainModel.Jobs;
using DomainModel.MasterDetails;
using DomainModel.RegisteredJobSeekers;
using DomainModel.Users;
using Repository.AppliedJobs;
using System.Data;


namespace Services.AppliedJobs
{
    public class AppliedJobsServices  :IAppliedJobsServices
    {
        private readonly IAppliedJobsRepository _AppliedJobsRepository;
        public  AppliedJobsServices(IAppliedJobsRepository AppliedJobsRepository)
        {
            _AppliedJobsRepository = AppliedJobsRepository;
        }


        public IEnumerable<DM_AppliedJobs> GetAppliedJobs()
        {
            var result = _AppliedJobsRepository.GetAppliedJobs();
            return result;
        }

        public async Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId)
        {
            var result = _AppliedJobsRepository.MyAppliedJobs(userId);
            return await result;
        }

        public IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category)
        {

            var result = _AppliedJobsRepository.GetMasterValuesByCategoryForAppliedJobs(category);
            return result;
        }

        public async  Task<bool> CreateAppliedJob(int job_Id, int User_Id)
        {
            var result = _AppliedJobsRepository.CreateAppliedJob(job_Id,User_Id);
            return await result;
        }

        public async Task<bool> IsUserResumeUploaded(int userId)
        {
            var result= _AppliedJobsRepository.IsUserResumeUploaded(userId);
            return await  result;
        }
      
        public bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj)
        {
            var result = _AppliedJobsRepository.UpdateAppliedJob(appliedJobs_Obj);
           
            return result;
        }

        public bool HasUserApplied(int userId, int jobId)
        {
            var result = _AppliedJobsRepository.HasUserApplied( userId,  jobId);
            return result;
        }

        public DM_AppliedJobs GetAppliedJobsById(int Id)
        {
            var result = _AppliedJobsRepository.GetAppliedJobsById(Id);
            return result;
        }
    }
}



   
  




