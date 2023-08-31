﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.AppliedJobs;
using Repository.AppliedJobs;


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




    }
}



   
  



