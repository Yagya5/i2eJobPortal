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
        
        private readonly IAdminDashboardServices _adminDashboardServices;

        public AdminDashboardController(IAdminDashboardServices adminDashboardServices)
        {
            _adminDashboardServices = adminDashboardServices;
        }

        public IActionResult Index()
        {
            return View();
        }

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


        public IActionResult GetAuditDetails()
        {
            var result = _adminDashboardServices.GetAuditDetails().ToList();
            return Ok(result);
        }

    }
}
