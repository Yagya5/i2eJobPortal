using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class AdminDashboardController : Controller
    {

        public IActionResult MyProfile()
        {
            return View();
        }
    }
}
