using DomainModel.AuditTrails;
using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
using Services.Jobs;
using Services.AuditTrails;

namespace UI.Areas.Admin.Controllers
{
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

            var response = _jobServices.DeleteJob(JobId);

            return Ok(response);

        }

        //Edit a Job
        [HttpPost]
        public IActionResult EditJob(Job job)
        {
            if (ModelState.IsValid)
            {
                var OldObject = _jobServices.GetJobById(job.JobId);
                int TaskId = OldObject.JobId;
                string Module = "Job";
                string Action = AuditAction.Modified;

                OldObject.PostDate = null;
                job.PostDate = null;

                var response = _jobServices.UpdateJob(job);


                _ = _auditTrailServices.InsertAuditTrail(TaskId, Module, Action, this.HttpContext, OldObject, job);
                return Ok(response); 

            }
            return Ok(null);

        }
    }

}

