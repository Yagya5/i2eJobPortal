using Microsoft.AspNetCore.Mvc;

namespace UI.Areas.Admin.Controllers
{
    public class JobController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
