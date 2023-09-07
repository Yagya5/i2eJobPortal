using DomainModel.EditAdminFullDetails;
using DomainModel.EditUserFullDetails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.EditAdminFullDetails;

namespace UI.Areas.Admin.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
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
            EditAdminFullDetails model = new EditAdminFullDetails();
            model.UserId = id;
            return View(model);
        }

        [HttpGet]
        public IActionResult GetAdminDetails(int id)
        {
            var result = _EditAdminFullDetailServices.GetAdminFullDetails(id).ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetCountry()
        {
            var result = _EditAdminFullDetailServices.GetCountryList().ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetState(string country)
        {
            var result = _EditAdminFullDetailServices.GetStateList(country).ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetCity(string state)
        {
            var result = _EditAdminFullDetailServices.GetCityList(state).ToList();
            return Ok(result);
        }

        [HttpPost]        
        public IActionResult UpdateAdminDetails(EditAdminFullDetails adminDetails)
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
            adminDetails.Response = result;
            return Ok(adminDetails);
        }

        public async Task<IActionResult> UploadProfilePicture(IFormFile profilePicture)
        {
            if (profilePicture != null && profilePicture.Length > 0)
            {
                try
                {
                    var fileName = "AdminProfile/" + $"{Guid.NewGuid().ToString()}{Path.GetExtension(profilePicture.FileName)}";
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await profilePicture.CopyToAsync(fileStream);
                    }
                    TempData["ImagePath"] = fileName;
                    return Json(new { success = true, url = $"/{fileName}" });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, error = ex.Message });
                }
            }
            return Json(new { success = false, error = "No image was uploaded." });
        }

        public async Task<IActionResult> RemoveProfilePicture(string profilePicture)
        {
            if (profilePicture != null && profilePicture.Length > 0)
            {
                try
                {
                    var fileName = profilePicture;
                    TempData["ImagePath"] = fileName;
                    return Json(new { success = true, url = $"/{fileName}" });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, error = ex.Message });
                }
            }
            return Json(new { success = false, error = "Failed" });
        }

    }
}
