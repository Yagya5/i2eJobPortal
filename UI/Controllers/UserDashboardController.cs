using DomainModel.Jobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AppliedJobs;
using Services.Jobs;

namespace UI.Controllers
{
    [Authorize(Roles = "Job Seeker, Admin, Super Admin")]
    public class UserDashboardController : Controller
    {

        private readonly IAppliedJobsServices _appliedJobsServices;
        private readonly IJobServices _jobServices;
        public UserDashboardController(IAppliedJobsServices appliedJobsServices, IJobServices jobServices)
        {
            _appliedJobsServices = appliedJobsServices;
            _jobServices = jobServices;
        }

        
       
        public IActionResult MyProfile() /*Used as a home page controller*/
        {
            return View();
        }
        //Job fetching 
        public IActionResult AllJobs()
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


        public IActionResult AboutUs()
        {
            return View();
        }
        public IActionResult ContactUs()
        {
            return View();
        }
        public IActionResult AppliedJobs(int id)
        {
            ViewBag.UserId = id;
            return View();
        }

        //public async Task<IActionResult> GetMyAppliedJobs(int id)
        //{
        //    return Json(await _appliedJobsServices.MyAppliedJobs(id));
        //}

       
        public IActionResult Logout()
        {
            return View();
        }

    }
}
