using DomainModel.AdminDashboard;
using DomainModel.AppliedJobs;
using Repository.AdminDashboard;
using Repository.AppliedJobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.Jobs;
using DomainModel.MasterDetails;
using DomainModel.RegisteredJobSeekers;
using DomainModel.Users;
using System.Data;



namespace Services.AdminDashboard
{
    public class AdminDashboardServices : IAdminDashboardServices
    {
        private readonly IAdminDashBoardRepository _AdminDashboardRepository;

        public AdminDashboardServices(IAdminDashBoardRepository adminDashboardRepository)
        {
            _AdminDashboardRepository = adminDashboardRepository;
        }


        //public DataSet GetAdminDashData()
        //{
        //    var result= _AdminDashboardRepository.GetAdminDashData();
        //    return result;
        //}
        public IEnumerable<Counts> GetCounts()
        {
            var result =_AdminDashboardRepository.GetCounts();
            return result;
        }

        public IEnumerable<JobDetails> GetJobDetails()
        {
            var result = _AdminDashboardRepository.GetJobDetails();
            return result;
        }
    }
}

