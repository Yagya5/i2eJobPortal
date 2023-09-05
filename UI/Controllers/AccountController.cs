using DomainModel.Users;
using DomainModel.LoginModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Services.Users;
using System.Security.Claims;
using DomainModel.AuditLogins;

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
        public IActionResult Login(Login Obj)
        {
            if(string.IsNullOrEmpty(Obj.Email) || string.IsNullOrEmpty(Obj.Password))
            {                
                return RedirectToAction("Login");
            }

            var result =  _UserServices.AuthenticateUser(Obj.Email, Obj.Password);

            if(result != null)
            {

                AuditLogin newLogin = new AuditLogin() 
                {
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    UserId = result.UserId,
                    RoleId = result.RoleId,   
                };
                
                _UserServices.AuditUserLogin(newLogin);

                if(result.RoleName == "Super Admin")
                {
                    var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName),
                       new Claim(ClaimTypes.NameIdentifier, result.UserId.ToString())
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    var Principal = new ClaimsPrincipal(Identity);

                    var authProperties = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.Now.AddDays(3),
                        IsPersistent = Obj.RememberMe
                    };

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal, authProperties);

                    return RedirectToAction("Index", "RegisteredJobSeekers", new { area = "Admin" });
                }

                if (result.RoleName == "Admin")
                {
                    var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName),
                       new Claim(ClaimTypes.NameIdentifier, result.UserId.ToString())
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    var Principal = new ClaimsPrincipal(Identity);

                    var authProperties = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.Now.AddDays(3),
                        IsPersistent = Obj.RememberMe
                    };

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal, authProperties);

                    return RedirectToAction("Index", "RegisteredJobSeekers", new {area = "Admin"});
                }

                if (result.RoleName == "Job Seeker")
                {
                    var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName),
                       new Claim(ClaimTypes.NameIdentifier, result.UserId.ToString())
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                    var Principal = new ClaimsPrincipal(Identity);

                    var authProperties = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.Now.AddDays(3),
                        IsPersistent = Obj.RememberMe
                    };

                    var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal, authProperties);

                    return RedirectToAction("Index", "Home");
                }

            }

            ViewBag.Message = "Incorrect Email or Password !!!";
            return View();
        }


        [HttpGet]
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SignUp(string FirstName, string LastName, string Email, string Password)
        {            
            var result = _UserServices.JobSeekerSignUp(FirstName, LastName, Email, Password);
            if(result == true)
            {
                int UserId = _UserServices.GetRecentSignedUp_UserId(Email);

                var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, FirstName),
                       new Claim(ClaimTypes.Email,Email),
                       new Claim(ClaimTypes.Role, "Job Seeker"),
                       new Claim(ClaimTypes.NameIdentifier, UserId.ToString())
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                var Principal = new ClaimsPrincipal(Identity);                

                var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal);

                return RedirectToAction("MyProfile", "UserDashboard");

            }
            ViewBag.DuplicateEmailEntry = "Sign Up Failed. This Email is already registered !!!";
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
