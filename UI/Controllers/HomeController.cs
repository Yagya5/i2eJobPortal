using DomainModel.ContactQueries;
using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
using Services.AuditTrails;
using NuGet.Protocol.Core.Types;
using Services.Jobs;
using Microsoft.AspNetCore.Mvc.Rendering;
using DNTCaptcha.Core;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IJobServices _jobServices;
        private readonly IAuditTrailServices _auditTrailServices;
        private readonly IDNTCaptchaValidatorService dNTCaptchaValidatorService;

        public HomeController(IJobServices jobServices, IAuditTrailServices auditTrailServices, IDNTCaptchaValidatorService dNTCaptchaValidatorService)
        {
            _jobServices = jobServices;
            _auditTrailServices = auditTrailServices;
            this.dNTCaptchaValidatorService = dNTCaptchaValidatorService;
        }

        public IActionResult Index()
        {
            var jobs = _jobServices.GetJobs();
            foreach (var job in jobs)
            {
                var currencyType = _jobServices.FindJobIdInMaster(job.CurrencyType);
                var jobType = _jobServices.FindJobIdInMaster(job.JobType);
                var jobMode = _jobServices.FindJobIdInMaster(job.JobMode);
                job.CurrencyType_Home = currencyType.Value;
                job.JobType_Home = jobType.Value;
                job.JobMode_Home = jobMode.Value;
            }
            return View(jobs);
        }

        public IActionResult AboutUs()
        {
            return View();
        }
        //Job fetching 
        public IActionResult Jobs()
        {
            var jobs = _jobServices.GetJobs();
            foreach (var job in jobs)
            {
                var currencyType = _jobServices.FindJobIdInMaster(job.CurrencyType);
                var jobType = _jobServices.FindJobIdInMaster(job.JobType);
                var jobMode = _jobServices.FindJobIdInMaster(job.JobMode);
                job.CurrencyType_Home = currencyType.Value;
                job.JobType_Home = jobType.Value;
                job.JobMode_Home = jobMode.Value;
            }

         
           
            var jobTypes = _jobServices.GetMasterValuesByCategory("Job Type");
            var jobModes = _jobServices.GetMasterValuesByCategory("Job Mode");

            ViewBag.JobTypes = new SelectList(jobTypes, "Id", "Value");
            ViewBag.JobModes = new SelectList(jobModes, "Id", "Value");
            return View(jobs);
        }

        public IActionResult Details(int id)
        {

            var JobDetails = _jobServices.GetJobById(id);

            if (JobDetails == null)
            {

                return NotFound();
            }
            var currencyType = _jobServices.FindJobIdInMaster(JobDetails.CurrencyType);
            var jobType = _jobServices.FindJobIdInMaster(JobDetails.JobType);
            var jobMode = _jobServices.FindJobIdInMaster(JobDetails.JobMode);

            JobDetails.CurrencyType_Home = currencyType.Value;
            JobDetails.JobType_Home = jobType.Value;
            JobDetails.JobMode_Home = jobMode.Value;
            return View(JobDetails);
        }
        //end
        [HttpGet]
        public IActionResult ContactUs()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ContactUs(ContactQuery query)
        {
            if (ModelState.IsValid)
            {
                if(!dNTCaptchaValidatorService.HasRequestValidCaptchaEntry())
                {
                    TempData["captchaError"] = "Incorrect captcha code!";
                    return View(query);
                }

                var result = _auditTrailServices.InsertContactQuery(query, this.HttpContext);
                ModelState.Clear();
                ViewBag.Message = "Your Message/Query Has Been Submitted";
                //if (HttpContext.User.Identity.IsAuthenticated)
                //{
                //    return RedirectToAction("ContactUs", "UserDashboard");
                //}
            }
            return View();
        }
    }
}
