using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Jobs
{
    public class Job
    {
        public int JobId { get; set; }
        public int JobType { get; set; }   /*Call from Master table*/
        public string? JobTitle { get; set; }
        public string? DepartmentName { get; set; }
        public int Salary { get; set; }
        public int CurrencyType { get; set; } /*Call from Master table*/
        public int JobMode { get; set; } /*Call from Master table*/

        public int MinExperience { get; set; }

        public int MaxExperience { get; set; }
        public string? Description { get; set; }

        public bool IsActive { get; set; }

        public DateTime PostDate { get; set; }
        public string? Location { get; set; }
        public bool urgentRequirement { get; set; }

        //These are used to view Table_MasterDetails values for the ids fetched
        public string? JobTypeValue { get; set; }
        public string? JobModeValue { get; set; }

        public string? JobCurrencyValue { get; set; }
    }
}
