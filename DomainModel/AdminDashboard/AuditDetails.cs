using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AdminDashboard
{
    public class AuditDetails
    {
        public int Id { get; set; } /* Call from Jobs table */
        public DateTime? LoginTimeStamp { get; set; } /* Call from Audit Logins table */


        public string? FirstName { get; set; } /* Call from Users table */
        public string? LastName { get; set; } /* Call from Users table */

    }
}
