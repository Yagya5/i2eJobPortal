using Microsoft.AspNetCore.Mvc;

namespace UI.Areas.Admin.Controllers
{
    public class JobApplicationsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
