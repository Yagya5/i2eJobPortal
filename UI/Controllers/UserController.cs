using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Users;

namespace UI.Controllers
{

    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserServices _UserServices;

        public UserController(IUserServices UserServices)
        {
            _UserServices = UserServices;
        }

        public IActionResult Index()
        {
            //  var Result = _UserServices.GetUsers();
            return Content("This is Yagya Branch");
        }

        [Authorize(Roles = "Job Seeker, Admin, Super Admin")]
        public IActionResult JobSeekerDashboard()
        {
            return View();
        }

        [Authorize(Roles = "Admin, Super Admin")]
        public IActionResult AdminDashboard()
        {
            return View();
        }

        [Authorize(Roles = "Super Admin")]
        public IActionResult SuperAdminDashboard()
        {
            return View();
        }


    }
}
