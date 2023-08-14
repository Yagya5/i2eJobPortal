using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AboutUs()
        {
            return View();
        }

        public IActionResult Jobs()
        {
            return View();
        }

        public IActionResult ContactUs()
        {
            return View();
        }
    }
}
