using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Authorize(Roles = "Job Seeker, Admin, Super Admin")]
    public class UserDashboardController : Controller
    {
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

        public IActionResult Logout()
        {
            return View();
        }

    }
}
