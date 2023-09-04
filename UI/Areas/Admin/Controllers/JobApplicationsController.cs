using Microsoft.AspNetCore.Mvc;
using Services.AppliedJobs;
using DomainModel.AppliedJobs;
using Services.Users;
using DomainModel.AuditTrails;
using DomainModel.RegisteredJobSeekers;
using DomainModel.Jobs;
using Services.AuditTrails;

namespace UI.Areas.Admin.Controllers
{
    public class JobApplicationsController : Controller
    {
        private readonly IAppliedJobsServices _AppliedJobsServices;
        private readonly IAuditTrailServices _auditTrailServices;


        public JobApplicationsController(IAppliedJobsServices AppliedJobsServices, IAuditTrailServices auditTrailServices)
        {
            _AppliedJobsServices = AppliedJobsServices;
            _auditTrailServices = auditTrailServices;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("JobApplications/GetAppliedJobs")]
        public IActionResult GetAppliedJobs()
        {
            var result = _AppliedJobsServices.GetAppliedJobs().ToList();
            return Ok(result);
        }

        //public IActionResult GetAppliedJobsById(int Id)
        //{
        //    var result = _AppliedJobsServices.GetAppliedJobsById(Id);
        //    return View();
        //}


        [HttpGet]
        public IActionResult GetMasterValuesByCategoryForAppliedJobs(string category)
        {
            var values = _AppliedJobsServices.GetMasterValuesByCategoryForAppliedJobs(category);
            return Json(values);
        }


        [HttpPost]
        public IActionResult UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj)
        {
            if(ModelState.IsValid)
            {
                var OldObject = _AppliedJobsServices.GetAppliedJobsById(appliedJobs_Obj.AppliedJobId); //Audit Trail Code
                int TaskId = OldObject.AppliedJobId; //Audit Trail Code
                string Module = "AppliedJobs"; //Audit Trail Code
                string Action = AuditAction.Modified; //Audit Trail Code


                _AppliedJobsServices.UpdateAppliedJob(appliedJobs_Obj);


                appliedJobs_Obj.StatusValue = null; //Audit Trail Code
                appliedJobs_Obj.RoundValue = null; //Audit Trail Code
                _ = _auditTrailServices.InsertAuditTrail(TaskId, Module, Action, this.HttpContext, OldObject, appliedJobs_Obj); //Audit Trail Code
            }
            return View (appliedJobs_Obj);
        }




    }
}


