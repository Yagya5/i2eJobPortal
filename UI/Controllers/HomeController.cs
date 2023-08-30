using DomainModel.Jobs;
using Microsoft.AspNetCore.Mvc;
using Services.Jobs;

namespace UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IJobServices _jobServices;

        public HomeController(IJobServices jobServices)
        {
            _jobServices = jobServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AboutUs()
        {
            return View();
        }

        public IActionResult Jobs()
        {
            IEnumerable<Job> Records = new List<Job>();
            Records = _jobServices.GetJobsForHomePage();
            return View(Records);
        }

        public IActionResult ContactUs()
        {
            return View();
        }
    }
}
