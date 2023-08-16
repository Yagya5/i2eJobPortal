using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AuditLogins
{
    public class AuditLogin
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public int UserId { get; set; }

        public int? RoleId { get; set; }

        public DateTime? LoginTimeStamp { get; set; }

        public string? Role { get; set; }

    }
}
