using Microsoft.AspNetCore.Mvc;
using Services.Users;

namespace UI.Areas.Admin.Controllers
{
    public class AuditUserLoginsController : Controller
    {
        private readonly IUserServices _userServices;

        public AuditUserLoginsController(IUserServices userServices)
        {
            _userServices = userServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetRecentLogins()
        {
            var result = _userServices.GetRecentLogins();
            return Ok(result);
        }
    }
}
