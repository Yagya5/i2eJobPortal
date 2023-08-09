using Microsoft.AspNetCore.Mvc;

namespace UI.Areas.Admin.Controllers
{
    public class AdminDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
