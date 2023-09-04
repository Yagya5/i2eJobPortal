using DomainModel.ContactQueries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.AuditTrails;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class ContactQueriesController : Controller
    {

        private readonly IAuditTrailServices _auditTrailServices;

        public ContactQueriesController(IAuditTrailServices auditTrailServices)
        {
            _auditTrailServices = auditTrailServices;  
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult InsertContactQuery(ContactQuery query)
        {
            var result = _auditTrailServices.InsertContactQuery(query, this.HttpContext);
            return View();
        }


        [HttpGet]        
        public IActionResult GetContactQueries()
        {
            var result = _auditTrailServices.GetContactQueries();
            return Ok(result);
        }


    }
}
