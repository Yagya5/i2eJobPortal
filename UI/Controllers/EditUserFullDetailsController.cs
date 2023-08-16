using DomainModel.EditUserFullDetails;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Services.RegisteredJobSeekers;

namespace UI.Controllers
{
    public class EditUserFullDetailsController : Controller
    {
        private readonly IEditUserFullDetailsServices _EditUserFullDetailServices;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EditUserFullDetailsController(IEditUserFullDetailsServices EditUserFullDetailsServices, IWebHostEnvironment webHostEnvironment)
        {
            _EditUserFullDetailServices = EditUserFullDetailsServices;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index(int id)
        {
            EditUserFullDetails model = new EditUserFullDetails();
            model.UserId = id;
            return View(model);
        }

        [HttpGet]
        public IActionResult GetUserDetails(int id)
        {
            var result = _EditUserFullDetailServices.GetUserFullDetails(id).ToList();
            return Ok(result);
        }



        [HttpPost]
        public IActionResult UpdateUserDetails(EditUserFullDetails userDetails)
        {
            if (TempData["ImagePath"] != null)
            {
                userDetails.ProfilePicture = "/" + TempData["ImagePath"].ToString();
            }
            else
            {
                userDetails.ProfilePicture = userDetails.ProfilePictureUrl;
            }

            if (TempData["ResumePath"] != null)
            {
                userDetails.Resume = "/" + TempData["ResumePath"].ToString();
            }
            else
            {
                userDetails.Resume = userDetails.ResumeUrl;
            }

            string result = string.Empty;
            result = _EditUserFullDetailServices.UpdateProfileDetails(userDetails);

            return View(userDetails);
        }


        [HttpPost]
        public async Task<IActionResult> UploadProfilePicture(IFormFile profilePicture)
        {
            if (profilePicture != null && profilePicture.Length > 0)
            {
                try
                {
                    // Generate a unique file name for the uploaded image
                    var fileName = "UserProfile/" + $"{Guid.NewGuid().ToString()}{Path.GetExtension(profilePicture.FileName)}";

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

        [HttpPost]
        public async Task<IActionResult> UploadResume(IFormFile resume)
        {
            if (resume != null && resume.Length > 0)
            {
                try
                {
                    // Generate a unique file name for the uploaded image
                    var fileName = "UserResume/" + $"{Guid.NewGuid().ToString()}{Path.GetExtension(resume.FileName)}";

                    // Combine the wwwroot path with the generated file name
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

                    // Save the image to the file path
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await resume.CopyToAsync(fileStream);
                    }

                    TempData["ResumePath"] = fileName;

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
