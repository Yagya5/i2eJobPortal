using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Users;


namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]    
    public class AdminDashboardController : Controller
    {
        private readonly IUserServices _userServices;

        public AdminDashboardController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        
    }
}
