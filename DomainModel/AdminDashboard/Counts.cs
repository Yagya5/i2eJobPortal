using DomainModel.Users;
using Microsoft.CodeAnalysis;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace DomainModel.AdminDashboard
{
    public class Counts
    {

        public int? selected_count { get; set; } /* Call from AppliedJobs table */

        public int? rejected_count { get; set; } /* Call from AppliedJobs table */
        public int? total_applied_jobs { get; set; } /* Call from AppliedJobs table */
        public int? user_count { get; set; } /* Call from Users table */

    }
}
