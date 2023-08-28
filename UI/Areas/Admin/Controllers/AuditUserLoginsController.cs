using Microsoft.AspNetCore.Mvc;

namespace UI.Areas.Admin.Controllers
{
    public class AuditUserLoginsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
