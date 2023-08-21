using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Users
{
    public class User
    {
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string? Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public string Password { get; set; }

        public string? PhoneNumber { get; set; }

        public string? State { get; set; }

        public string? City { get; set; }

        public string? Address { get; set; }

        public string? ProfilePicture { get; set; }

        public int RoleId { get; set; }

        public bool Is_Active { get; set; }

        public string? RoleName { get; set; }

        public bool? Is_CreatedBySignUp { get; set; }

    }
}
