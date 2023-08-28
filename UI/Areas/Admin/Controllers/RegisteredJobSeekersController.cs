using DomainModel.AuditTrails;
using DomainModel.RegisteredJobSeekers;
using KellermanSoftware.CompareNetObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Services.AuditTrails;
using Services.RegisteredJobSeekers;
using Services.Users;
using SkiaSharp;

namespace UI.Areas.Admin.Controllers
{
    
    public class RegisteredJobSeekersController : Controller
    {
        private readonly IRegisteredJobSeekersServices _RegisteredJobSeekerServices;
        private readonly IAuditTrailServices _auditTrailServices;

        public RegisteredJobSeekersController(IRegisteredJobSeekersServices RegisteredJobSeekersServices, IAuditTrailServices auditTrailServices)
        {
            _RegisteredJobSeekerServices = RegisteredJobSeekersServices;
            _auditTrailServices = auditTrailServices;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetRegisteredJobSeekers()
        {
            var record = _RegisteredJobSeekerServices.GetRegisteredJobSeekers().ToList();
            return Ok(record);
        }

        [HttpPost]        
        public IActionResult UpdateRegisteredJobSeekers(RegisteredJobSeeker jobSeeker)
        {          
            var OldObject = _RegisteredJobSeekerServices.GetJobSeekerById(jobSeeker.UserId);
            
            int TaskId = OldObject.UserId;

            string Module = "JobSeeker";

            string Action = AuditAction.Modified;            

            var result = _RegisteredJobSeekerServices.UpdateJobSeekerAccountStatus(jobSeeker);

            _ = _auditTrailServices.InsertAuditTrail(TaskId, Module, Action, this.HttpContext, OldObject, jobSeeker);

            return Ok(jobSeeker);
        }

    }
}
