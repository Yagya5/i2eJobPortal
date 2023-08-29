using Microsoft.AspNetCore.Mvc;

namespace UI.Areas.Admin.Controllers
{
    public class AuditUserActivitiesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
