using Microsoft.AspNetCore.Mvc;
using Services.AppliedJobs;
using DomainModel.AppliedJobs;
using Services.Users;
using DomainModel.AuditTrails;
using DomainModel.RegisteredJobSeekers;
using DomainModel.Jobs;

namespace UI.Areas.Admin.Controllers
{
    public class JobApplicationsController : Controller
    {
        private readonly IAppliedJobsServices _AppliedJobsServices;



        public JobApplicationsController(IAppliedJobsServices AppliedJobsServices)
        {
            _AppliedJobsServices = AppliedJobsServices;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("JobApplications/GetAppliedJobs")]
        public IActionResult GetAppliedJobs()
        {
            var result = _AppliedJobsServices.GetAppliedJobs().ToList();
            return Ok(result);
        }


        [HttpGet]
        public IActionResult GetMasterValuesByCategoryForAppliedJobs(string category)
        {
            var values = _AppliedJobsServices.GetMasterValuesByCategoryForAppliedJobs(category);
            return Json(values);
        }


        [HttpPost]
        public IActionResult UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj)
        {
            if(ModelState.IsValid)
            {
                _AppliedJobsServices.UpdateAppliedJob(appliedJobs_Obj);
            }
            return View (appliedJobs_Obj);
        }


    }
}


