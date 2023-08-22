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
                    // Generate a unique file name for the uploaded image
                    var fileName = "AdminProfile/" + $"{Guid.NewGuid().ToString()}{Path.GetExtension(profilePicture.FileName)}";

                    // Combine the wwwroot path with the generated file name
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

                    // Save the image to the file path
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await profilePicture.CopyToAsync(fileStream);
                    }

                    TempData["ImagePath"] = fileName;

                    // Return the URL of the uploaded image
                    return Json(new { success = true, url = $"/{fileName}" });
                }
                catch (Exception ex)
                {
                    // Handle the error if any
                    return Json(new { success = false, error = ex.Message });
                }
            }

            // Return an error response if no image was uploaded
            return Json(new { success = false, error = "No image was uploaded." });
        }

    }
}
