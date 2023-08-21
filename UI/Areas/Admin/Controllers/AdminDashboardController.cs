using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Users;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class AdminDashboardController : Controller
    {
        private readonly IUserServices _userServices;

        public AdminDashboardController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        public IActionResult MyProfile()
        {
            return View();
        }

        public IActionResult GetRecentLogins()
        {
            var result = _userServices.GetRecentLogins();
            return Ok(result);
        }
    }
}
