using DomainModel.Jobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Core.Types;
using Services.AppliedJobs;
using Services.Jobs;
using Microsoft.AspNetCore.Mvc.Rendering;
using DomainModel.Users;
using static SkiaSharp.HarfBuzz.SKShaper;
using Repository.AppliedJobs;

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

        [HttpGet]
        public async Task<IActionResult> CreateAppliedJob(int job_Id)  /* Applied job by user function  */
        {
            int User_Id = Convert.ToInt32(User.FindFirst(claim => claim.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);
            bool count = _appliedJobsServices.HasUserApplied(User_Id, job_Id);
            if (count)
            {
                return Ok(new { response = count, status1 = true, responseof = "HasUserApplied" });
            }
            else
            {

                if (job_Id != 0)
                {
                    
                    bool result = await _appliedJobsServices.IsUserResumeUploaded(User_Id);
                    if (result)
                    {
                        var response = _appliedJobsServices.CreateAppliedJob(User_Id, job_Id);
                        return Ok(new { response = response, status = true, responseof = "Job Applied" });
                    }
                    else
                    {
                        return Ok(new { response = result, status = false, responseof = "Resume Required", userid = User_Id });
                    }
                }
            }
                    
            return BadRequest(new { status = false, responseof = "" });
        }
        public IActionResult AppliedJobs(int id)
        {
            ViewBag.UserId = id;
            return View();
        }
        public async Task<IActionResult> GetMyAppliedJobs(int id) /* User Applied job */
        {
            return Json(await _appliedJobsServices.MyAppliedJobs(id));
        }


        public IActionResult Logout()
        {
            return View();
        }

    }
}
