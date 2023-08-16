using Microsoft.AspNetCore.Mvc;
using Services.AppliedJobs;
using DomainModel.AppliedJobs;
using Services.Users;

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
    }
}



