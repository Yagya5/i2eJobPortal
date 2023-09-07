using DomainModel.EditUserFullDetails;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Services.RegisteredJobSeekers;

namespace UI.Controllers
{
    [Authorize(Roles = "Job Seeker, Admin, Super Admin")]
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

        [HttpGet]
        public IActionResult GetBachelors()
        {
            var result = _EditUserFullDetailServices.GetBachelorsList().ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetMasters()
        {
            var result = _EditUserFullDetailServices.GetMastersList().ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetCountry()
        {
            var result = _EditUserFullDetailServices.GetCountryList().ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetState(string country)
        {
            var result = _EditUserFullDetailServices.GetStateList(country).ToList();
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetCity(string state)
        {
            var result = _EditUserFullDetailServices.GetCityList(state).ToList();
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
            userDetails.Response = result;
            return Ok(userDetails);
        }


        [HttpPost]
        public async Task<IActionResult> UploadProfilePicture(IFormFile profilePicture)
        {
            if (profilePicture != null && profilePicture.Length > 0)
            {
                try
                {
                    var fileName = "UserProfile/" + $"{Guid.NewGuid().ToString()}{Path.GetExtension(profilePicture.FileName)}";
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

        [HttpPost]
        public async Task<IActionResult> UploadResume(IFormFile resume)
        {
            if (resume != null && resume.Length > 0)
            {
                try
                {
                    var fileName = "UserResume/" + $"{Guid.NewGuid().ToString()}{Path.GetExtension(resume.FileName)}";
                    var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await resume.CopyToAsync(fileStream);
                    }
                    TempData["ResumePath"] = fileName;
                    return Json(new { success = true, url = $"/{fileName}" });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, error = ex.Message });
                }
            }
            return Json(new { success = false, error = "No image was uploaded." });
        }
    }
}
