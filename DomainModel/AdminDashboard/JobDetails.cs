using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AdminDashboard
{
    public class JobDetails
    {

        public int JobId { get; set; }/* Call from Jobs table */
        public string? JobTitle { get; set; } /* Call from Jobs table */
        public string? DepartmentName { get; set; } /* Call from Jobs table */

        public string? JobMode { get; set; }/*Call from Master table*/
        public string? JobType { get; set; }/*Call from Master table*/

        public int JobTypeCount { get; set; }   
        public int JobModeCount { get; set; }

    }
}
