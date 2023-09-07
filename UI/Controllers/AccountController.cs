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
        public AccountController(IUserServices UserServices) // Class constructor & Dependency Injection
        {
            _UserServices = UserServices;
        }

        [HttpGet]
        public IActionResult Login()  // It will return Login Page
        {
            return View();
        }   

        [HttpPost]
        public IActionResult Login(Login Obj)  // It will handle Login Page POST Request
        {
            if(string.IsNullOrEmpty(Obj.Email) || string.IsNullOrEmpty(Obj.Password))
            {                
                return RedirectToAction("Login");
            }

            var result =  _UserServices.AuthenticateUser(Obj.Email, Obj.Password); // It will check authentication

            if (result != null)
            {
                AuditLogin newLogin = new AuditLogin() 
                {
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Email = result.Email,
                    UserId = result.UserId,
                    RoleId = result.RoleId,   
                };
                
                _UserServices.AuditUserLogin(newLogin);  // It will insert entry into Table_AuditLogins of User who does Log-in


                var Identity = new ClaimsIdentity(new[]{                 // Setting-up Claims which will be stored in Cookie
                       new Claim(ClaimTypes.Name, result.FirstName),
                       new Claim(ClaimTypes.Email, result.Email),
                       new Claim(ClaimTypes.Role, result.RoleName),
                       new Claim(ClaimTypes.NameIdentifier, result.UserId.ToString())
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                var Principal = new ClaimsPrincipal(Identity);

                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.Now.AddDays(3), // Setting-up Cookie Life-Span
                    IsPersistent = Obj.RememberMe  // Setting-up whether the Cookie should be persistent or not
                };

                var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal, authProperties);

                if (result.RoleName == "Super Admin" || result.RoleName == "Admin")
                    return RedirectToAction("Index", "AdminDashboard", new { area = "Admin" });  // Redirection for Super-Admin & Admin
                else
                    return RedirectToAction("MyProfile", "UserDashboard");  // Redirection for JobSeeker
            }
            ViewBag.Message = "Incorrect Email or Password !!!";
            return View();
        }

        [HttpGet]
        public IActionResult SignUp()  // It will return SignUp Page
        {
            return View();
        }

        [HttpPost]
        public IActionResult SignUp(string FirstName, string LastName, string Email, string Password) // It will handle Sign-Up Page POST Request
        {            
            var result = _UserServices.JobSeekerSignUp(FirstName, LastName, Email, Password);
            if(result == true)
            {
                int UserId = _UserServices.GetRecentSignedUp_UserId(Email); // Getting UserId of User right after his Sign-Up Process, this UserId might be required for Dashboard related Operations.

                var Identity = new ClaimsIdentity(new[]{
                       new Claim(ClaimTypes.Name, FirstName),
                       new Claim(ClaimTypes.Email,Email),
                       new Claim(ClaimTypes.Role, "Job Seeker"),
                       new Claim(ClaimTypes.NameIdentifier, UserId.ToString())
                    }, CookieAuthenticationDefaults.AuthenticationScheme);

                var Principal = new ClaimsPrincipal(Identity);                

                var login = HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, Principal);
                return RedirectToAction("MyProfile", "UserDashboard");  // Redirection for JobSeeker
            }
            ViewBag.DuplicateEmailEntry = "Sign Up Failed. This Email is already registered !!!";
            return View();
        }

        [HttpGet]
        public IActionResult Logout()  // Destroying Cookie and Log Out
        {
            var logout = HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login","Account");
        }
    }
}
