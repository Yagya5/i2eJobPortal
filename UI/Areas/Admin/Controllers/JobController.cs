using DomainModel.AuditTrails;
using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
using Services.Jobs;
using Services.AuditTrails;
using Microsoft.AspNetCore.Authorization;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class JobController : Controller
    {
        private readonly IJobServices _jobServices;
        private readonly IAuditTrailServices _auditTrailServices;
        public JobController(IJobServices JobServices, IAuditTrailServices auditTrailServices)
        {
            _jobServices = JobServices;
            _auditTrailServices = auditTrailServices;
        }
        //View data with the values of categories instead of ids
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult GetJobs()
        {
            var jobs = _jobServices.GetJobs();
          

            return Ok(jobs);
        }
        
        [HttpGet]
        public IActionResult GetAllCountryStateCity()
        {
            var values = _jobServices.GetAllCountryStateCity();
            return Json(values);
        }
        [HttpGet]
        public IActionResult GetMasterValues()
        {
            var values = _jobServices.GetMasterValuesJob();
            return Json(values);
        }
        
        [HttpPost]
        public IActionResult CreateJob(Job job)
        {


            job.PostDate = DateTime.Now;

            var response = _jobServices.CreateJob(job);
            return Ok(response);

        }

        //delete the job according to their ID
        [HttpPost]
        public ActionResult Delete(int JobId)
        {
            var OldObject = _jobServices.GetJobById_ForAuditTrail(JobId);    // Audit Trail Code

            var response = _jobServices.DeleteJob(JobId);

            var NewObject = _jobServices.GetJobById_ForAuditTrail(JobId);    // Audit Trail Code       
            int TaskId = OldObject.JobId;   // Audit Trail Code
            string Module = "Job";   // Audit Trail Code
            string Action = AuditAction.Deleted;  // Audit Trail Code
            _ = _auditTrailServices.InsertAuditTrail(TaskId, Module, Action, this.HttpContext, OldObject, NewObject);  // Audit Trail Code

            return Ok(response);

        }

        //Edit a Job
        [HttpPost]
        public IActionResult EditJob(Job job)
        {
            if (ModelState.IsValid)
            {
                var OldObject = _jobServices.GetJobById_ForAuditTrail(job.JobId);
                int TaskId = OldObject.JobId;
                string Module = "Job";
                string Action = AuditAction.Modified;

                OldObject.PostDate = null;
                job.PostDate = null;

                var response = _jobServices.UpdateJob(job);


                OldObject.JobMode = job.JobMode;
                OldObject.JobType = job.JobType;
                OldObject.CurrencyType = job.CurrencyType;
                OldObject.Country = job.Country;
                OldObject.State = job.State;
                OldObject.City = job.City;
                _ = _auditTrailServices.InsertAuditTrail(TaskId, Module, Action, this.HttpContext, OldObject, job);
                return Ok(response); 

            }
            return Ok(null);

        }
    }

}

