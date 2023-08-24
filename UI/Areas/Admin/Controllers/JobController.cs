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
            foreach (var job in jobs)
            {
                job.JobTypeValue = GetJobValue(job.JobType);
                job.JobModeValue = GetJobValue(job.JobMode);
                job.JobCurrencyValue = GetJobValue(job.CurrencyType);
            }
            return Ok(jobs);
        }
        //fetch the Value of the particular element ID to store it to the Table_Jobs DB
        private string GetJobValue(int jobId)
        {
            var jobValue = _jobServices.FindJobIdInMaster(jobId)?.Value;
            return jobValue ?? "N/A"; // Default value if not found
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
            //job.IsActive = bool.Parse(Request.Form["IsActive"]);
            _jobServices.CreateJob(job);
            return RedirectToAction("Index");

        }

        //delete the job according to their ID
        [HttpPost]
        public ActionResult Delete(int JobId)
        {

            var response = _jobServices.DeleteJob(JobId);

            return RedirectToAction("Index", "Job");

        }

        //Edit a Job
        [HttpPost]
        public IActionResult EditJob(Job job)
        {
            if (ModelState.IsValid)
            {
                job.PostDate = DateTime.Now;

                _jobServices.UpdateJob(job);

                return RedirectToAction("Index"); // Redirect to the job listing after editing
            }
            return View(job);
        }

    }
}

