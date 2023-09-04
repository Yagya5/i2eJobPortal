using DomainModel.Jobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AppliedJobs;
using Services.Jobs;
using Microsoft.AspNetCore.Mvc.Rendering;
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
            var jobs = _jobServices.GetJobsForHomePage();
            var activeJobs = jobs.Where(job => job.IsActive).ToList();

            return View(activeJobs);
        }
        //Job fetching 
        public IActionResult AllJobs()
        {
            var jobs = _jobServices.GetJobsForHomePage();
            var jobTypes = _jobServices.GetMasterValuesByCategory("Job Type");
            var jobModes = _jobServices.GetMasterValuesByCategory("Job Mode");

            ViewBag.JobTypes = new SelectList(jobTypes, "Id", "Value");
            ViewBag.JobModes = new SelectList(jobModes, "Id", "Value");
            return View(jobs);
        }
        public IActionResult Details(int id)
        {
            var JobDetails = _jobServices.GetJobByIdView(id);

            if (JobDetails == null)
            {

                return NotFound();
            }

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
