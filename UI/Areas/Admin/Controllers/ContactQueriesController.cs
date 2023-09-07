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

        public ContactQueriesController(IAuditTrailServices auditTrailServices) // Class constructor & Dependency Injection
        {
            _auditTrailServices = auditTrailServices;  
        }

        public IActionResult Index() // It will return Index Page where dxDataGrid will be shown
        {
            return View();
        }

        [HttpPost]
        public IActionResult InsertContactQuery(ContactQuery query) // It will insert contact-form data into Table_ContactQueries
        {
            var result = _auditTrailServices.InsertContactQuery(query, this.HttpContext);
            return View();
        }

        [HttpGet]        
        public IActionResult GetContactQueries() // It will fetch Table_ContactQueries records
        {
            var result = _auditTrailServices.GetContactQueries();
            return Ok(result);
        }

    }
}
