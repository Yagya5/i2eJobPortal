using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AuditTrails;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class AuditUserActivitiesController : Controller
    {
        private readonly IAuditTrailServices _auditTrailServices;

        public AuditUserActivitiesController(IAuditTrailServices auditTrailServices) // Class constructor & Dependency Injection
        {
            _auditTrailServices = auditTrailServices;
        }

        public IActionResult Index()  // It will return Index Page where dxDataGrid will be shown
        {
            return View();
        }

        public IActionResult GetAuditTrail() // Fetch the User Activities which has been audited
        {
            var result = _auditTrailServices.GetAuditTrail();
            return Ok(result);
        }
    }
}
