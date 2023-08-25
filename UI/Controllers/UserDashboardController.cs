using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AppliedJobs;

namespace UI.Controllers
{
    [Authorize(Roles = "Job Seeker, Admin, Super Admin")]
    public class UserDashboardController : Controller
    {

        private readonly IAppliedJobsServices _appliedJobsServices;

        public UserDashboardController(IAppliedJobsServices appliedJobsServices)
        {
            _appliedJobsServices = appliedJobsServices;
        }

        
       
        public IActionResult MyProfile() /*Used as a home page controller*/
        {
            return View();
        }

        public IActionResult AllJobs()
        {
            return View();
        }


        
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

        public async Task<IActionResult> GetMyAppliedJobs(int id)
        {
            return Json(await _appliedJobsServices.MyAppliedJobs(id));
        }

       
        public IActionResult Logout()
        {
            return View();
        }

    }
}
