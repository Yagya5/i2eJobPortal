using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
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
            return View();
        }

        public IActionResult AboutUs()
        {
            return View();
        }
        //Job fetching 
        public IActionResult Jobs()
        {
            IEnumerable<Job> Records = new List<Job>();
            Records = _jobServices.GetJobsForHomePage();
            return View(Records);
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

            // Assign the fetched values to the Job object
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
