using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AuditTrails;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class AuditUserActivitiesController : Controller
    {
        private readonly IAuditTrailServices _auditTrailServices;

        public AuditUserActivitiesController(IAuditTrailServices auditTrailServices)
        {
            _auditTrailServices = auditTrailServices;
        }


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAuditTrail()
        {
            var result = _auditTrailServices.GetAuditTrail();
            return Ok(result);
        }


    }
}
