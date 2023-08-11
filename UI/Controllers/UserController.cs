using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Users;

namespace UI.Controllers
{

    
    public class UserController : Controller
    {
        private readonly IUserServices _UserServices;

        public UserController(IUserServices UserServices)
        {
            _UserServices = UserServices;
        }


        public IActionResult Index()
        {
            //  var Result = _UserServices.GetUsers();
            return Content("This is Yagya Branch");
        }

        public IActionResult NewMethod()
        {
            //  var Result = _UserServices.GetUsers();
            return Content("This is New Method in Yagya Branch");
        }
    }
}
