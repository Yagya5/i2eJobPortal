using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.MyApplied;

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

        public IActionResult MyProfile()
        {
            return View();
        }

        public IActionResult AllJobs()
        {            
            return View();
        }

        public IActionResult AppliedJobs()
        {            
            return View();
        }

        public async Task<IActionResult>GetMyAppliedJobs()
        {            
            return Json(await _appliedJobsServices.MyAppliedJobs(1));
        }

        public IActionResult Logout()
        {
            return View();
        }

    }
}
