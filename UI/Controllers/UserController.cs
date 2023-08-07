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
            var Result = _UserServices.GetUsers();
            return View(Result);
        }
    }
}
