using DomainModel.EditAdminFullDetails;
using DomainModel.EditUserFullDetails;
using Microsoft.AspNetCore.Mvc;
using Services.EditAdminFullDetails;

namespace UI.Areas.Admin.Controllers
{
    public class EditAdminFullDetailsController : Controller
    {
        private readonly IEditAdminFullDetailsServices _EditAdminFullDetailServices;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EditAdminFullDetailsController(IEditAdminFullDetailsServices EditAdminFullDetailsServices, IWebHostEnvironment webHostEnvironment)
        {
            _EditAdminFullDetailServices = EditAdminFullDetailsServices;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index(int id)
        {
            //EditAdminFullDetails model = new EditAdminFullDetails();
            //model.UserId = id;
            var result = _EditAdminFullDetailServices.GetAdminFullDetails(id).ToList();

            return View();
        }

        [HttpGet]
        public IActionResult GetAdminDetails(int id)
        {
            var result = _EditAdminFullDetailServices.GetAdminFullDetails(id).ToList();
            return Ok(result);
        }



        [HttpPost]
        public IActionResult UpdateUserDetails(EditAdminFullDetails adminDetails)
        {
            if (TempData["ImagePath"] != null)
            {
                adminDetails.ProfilePicture = "/" + TempData["ImagePath"].ToString();
            }
            else
            {
                adminDetails.ProfilePicture = adminDetails.ProfilePictureUrl;
            }

            string result = string.Empty;
            result = _EditAdminFullDetailServices.UpdateProfileDetails(adminDetails);

            return View(adminDetails);
        }

    }
}
