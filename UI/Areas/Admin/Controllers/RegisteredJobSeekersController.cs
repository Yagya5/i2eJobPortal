using DomainModel.RegisteredJobSeekers;
using Microsoft.AspNetCore.Mvc;
using Services.RegisteredJobSeekers;
using Services.Users;
using SkiaSharp;

namespace UI.Areas.Admin.Controllers
{
    public class RegisteredJobSeekersController : Controller
    {
        private readonly IRegisteredJobSeekersServices _RegisteredJobSeekerServices;

        public RegisteredJobSeekersController(IRegisteredJobSeekersServices RegisteredJobSeekersServices)
        {
            _RegisteredJobSeekerServices = RegisteredJobSeekersServices;
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
            var result = _RegisteredJobSeekerServices.UpdateJobSeekerAccountStatus(jobSeeker);
            return Ok(jobSeeker);
        }

    }
}
