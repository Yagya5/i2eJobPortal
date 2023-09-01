using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using NuGet.Protocol.Core.Types;
using Services.Jobs;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IJobServices _jobServices;

        public HomeController(IJobServices jobServices)
        {
            _jobServices = jobServices;
        }

        public IActionResult Index()
        {
            var jobs = _jobServices.GetJobs();
            foreach (var job in jobs)
            {
                var currencyType = _jobServices.FindJobIdInMaster(job.CurrencyType);
                var jobType = _jobServices.FindJobIdInMaster(job.JobType);
                var jobMode = _jobServices.FindJobIdInMaster(job.JobMode);
                job.CurrencyType_Home = currencyType.Value;
                job.JobType_Home = jobType.Value;
                job.JobMode_Home = jobMode.Value;
            }
            return View(jobs);
        }

        public IActionResult AboutUs()
        {
            return View();
        }
        //Job fetching 
        public IActionResult Jobs()
        {
            var jobs = _jobServices.GetJobs();
            foreach (var job in jobs)
            {
                var currencyType = _jobServices.FindJobIdInMaster(job.CurrencyType);
                var jobType = _jobServices.FindJobIdInMaster(job.JobType);
                var jobMode = _jobServices.FindJobIdInMaster(job.JobMode);
                job.CurrencyType_Home = currencyType.Value;
                job.JobType_Home = jobType.Value;
                job.JobMode_Home = jobMode.Value;
            }

         
           
            var jobTypes = _jobServices.GetMasterValuesByCategory("Job Type");
            var jobModes = _jobServices.GetMasterValuesByCategory("Job Mode");

            ViewBag.JobTypes = new SelectList(jobTypes, "Id", "Value");
            ViewBag.JobModes = new SelectList(jobModes, "Id", "Value");
            return View(jobs);
        }

        public IActionResult Details(int id)
        {

            var JobDetails = _jobServices.GetJobById(id);

            if (JobDetails == null)
            {

                return NotFound();
            }
            var currencyType = _jobServices.FindJobIdInMaster(JobDetails.CurrencyType);
            var jobType = _jobServices.FindJobIdInMaster(JobDetails.JobType);
            var jobMode = _jobServices.FindJobIdInMaster(JobDetails.JobMode);

            JobDetails.CurrencyType_Home = currencyType.Value;
            JobDetails.JobType_Home = jobType.Value;
            JobDetails.JobMode_Home = jobMode.Value;
            return View(JobDetails);
        }
        //end
        public IActionResult ContactUs()
        {
            return View();
        }
    }
}
