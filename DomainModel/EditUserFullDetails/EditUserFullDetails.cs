using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.EditUserFullDetails
{
    public class EditUserFullDetails
    {
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string? Gender { get; set; }

        public DateTime? BirthDate { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Country { get; set; }

        public string? State { get; set; }

        public string? City { get; set; }

        public string? Address { get; set; }

        public string? ProfilePicture { get; set; }

        public string ProfilePictureUrl { get; set; }

        public string? Bachelors { get; set; }
        public string? Masters { get; set; }
        public string? Skills { get; set; }
        public int? Experience { get; set; }
        public string? CoverLetter { get; set; }
        public string? Resume { get; set; }

        public string? ResumeUrl { get; set; }

        public string? Response { get; set; }

        public string? Value { get; set; }

        public List<string> CountryList { get; set; }
        public List<string> StateList { get; set; }
        public List<string> CityList { get; set; }

        public List<string> BachelorsList { get; set; }
        public List<string> MastersList { get; set; }
    }
}
