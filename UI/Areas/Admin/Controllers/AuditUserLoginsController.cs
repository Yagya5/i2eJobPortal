using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Users;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class AuditUserLoginsController : Controller
    {
        private readonly IUserServices _userServices;

        public AuditUserLoginsController(IUserServices userServices) // Class constructor & Dependency Injection
        {
            _userServices = userServices;
        }

        public IActionResult Index() // It will return Index Page where dxDataGrid will be shown
        {
            return View();
        }

        public IActionResult GetRecentLogins() // It will fetch recent 50 Login entries according to LoginTimeStamp
        {
            var result = _userServices.GetRecentLogins();
            return Ok(result);
        }
    }
}
