using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Services.Users;
using System.Security.Claims;

namespace UI.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserServices _UserServices;

        public AccountController(IUserServices UserServices)
        {
            _UserServices = UserServices;
        }


        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(string Email, string Password)
        {
            if(string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Password))
            {                
                return RedirectToAction("Login");
            }

            var result =  _UserServices.AuthenticateUser(Email, Password);

            if(result != null)
            {
                if(result.RoleName == "Super Admin")
                {
                    var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName)
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    var Principal = new ClaimsPrincipal(Identity);

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal);

                    return RedirectToAction("Index", "AdminDashboard");
                }

                if (result.RoleName == "Admin")
                {
                    var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName)
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    var Principal = new ClaimsPrincipal(Identity);

                    var authProperties = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.Now.AddMinutes(1),
                    };

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal, authProperties);

                    return RedirectToAction("Index", "AdminDashboard");
                }

                if (result.RoleName == "Job Seeker")
                {
                    var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName)
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    var Principal = new ClaimsPrincipal(Identity);

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal);

                    return RedirectToAction("MyProfile", "UserDashboard");
                }

            }

            ViewBag.Message = "Please enter valid Email or Password !!!";
            return View();
        }


        [HttpGet]
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SignUp(string param1)
        {
            return View();
        }


        [HttpGet]
        public IActionResult Logout()
        {
            var login = HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login","Account");
        }

    }
}
