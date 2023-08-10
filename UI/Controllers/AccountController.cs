using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string UserName, string Password)
        {
            return View();
        }


        [HttpGet]
        public IActionResult SignUP()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Logout()
        {
            return View();
        }


    }
}
