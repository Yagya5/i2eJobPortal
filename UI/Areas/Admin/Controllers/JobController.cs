using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
using Services.Jobs;

namespace UI.Areas.Admin.Controllers
{
    public class JobController : Controller
    {
        private readonly IJobServices _jobServices;
        public JobController(IJobServices JobServices)
        {
            _jobServices = JobServices;
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
        public IActionResult FindJobIdInMaster(int jobId)
        {
            var values = _jobServices.FindJobIdInMaster(jobId);
            return Json(values);
        }
        [HttpGet]
        public IActionResult GetMasterValuesByCategory(string category)
        {
            var values = _jobServices.GetMasterValuesByCategory(category);
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
            
                job.PostDate = DateTime.Now;

            var response = _jobServices.UpdateJob(job);

            return Ok(response); // Redirect to the job listing after editing


        }

    }
}

