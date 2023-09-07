using DomainModel.AdminDashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AdminDashboard;
using Services.AppliedJobs;
using Services.AuditTrails;
using Services.Users;
using System.Data;


namespace UI.Areas.Admin.Controllers
{
   
    public class AdminDashboardController : Controller
    {
        //private object _adminDashboardServices;

        //private readonly IUserServices _userServices;
        private readonly IAdminDashboardServices _adminDashboardServices;



        //public AdminDashboardController(IUserServices userServices)
        //{
        //    _userServices = userServices;
        //}

        public AdminDashboardController(IAdminDashboardServices adminDashboardServices)
        {
            _adminDashboardServices = adminDashboardServices;
        }


        public IActionResult Index()
        {
            return View();
        }

        //[HttpGet]
        //public IActionResult GetAdminDashData()
        //{
        //    AdminDashboardResponse response = new AdminDashboardResponse();

        //    DataSet dataSet = _adminDashboardServices.GetAdminDashData();

        //    // Map data from the DataSet to the response object
        //    if (dataSet != null && dataSet.Tables.Count >= 3)
        //    {
        //        response.Counts = new Counts
        //        {
        //            selected_count = dataSet.Tables[0].Rows[0]["selected_count"] as int?,
        //            rejected_count = dataSet.Tables[0].Rows[0]["rejected_count"] as int?,
        //            total_applied_jobs = dataSet.Tables[0].Rows[0]["total_applied_jobs"] as int?,
        //            user_count = dataSet.Tables[0].Rows[0]["user_count"] as int?
        //        };

        //        response.AuditDetails = dataSet.Tables[1].AsEnumerable().Select(row => new AuditDetails
        //        {
        //            Id = row.Field<int>("Id"),
        //            FirstName = row.Field<string>("FirstName"),
        //            LastName = row.Field<string>("LastName"),
        //            LoginTimeStamp = row.Field<DateTime?>("LoginTimeStamp")
        //        }).ToList();

        //        response.JobDetails = dataSet.Tables[2].AsEnumerable().Select(row => new JobDetails
        //        {
        //            JobId = row.Field<int>("JobId"),
        //            JobTitle = row.Field<string>("JobTitle"),
        //            DepartmentName = row.Field<string>("DepartmentName"),
        //            JobMode = row.Field<int>("JobMode"),
        //            JobType = row.Field<int>("JobType")
        //        }).ToList();
        //    }

        //    return Ok(response);
        //}



        [HttpGet]
       
        public IActionResult GetCounts()
        {
            var result = _adminDashboardServices.GetCounts().ToList();

            return Ok(result);
        }



        public IActionResult GetJobDetails()
        {
            var result = _adminDashboardServices.GetJobDetails().ToList();
            return Ok(result);
        }

    }
}
