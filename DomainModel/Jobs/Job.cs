﻿using System;
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
        
        public string? JobType_Home { get; set; }
        public string? JobMode_Home { get; set; }
        public string? CurrencyType_Home { get; set; }

        public string? JobTitle { get; set; }
        public string? DepartmentName { get; set; }
        public int Salary { get; set; }
        public int CurrencyType { get; set; } /*Call from Master table*/
        public int JobMode { get; set; } /*Call from Master table*/

        public int MinExperience { get; set; }
        public int MinExperienceMonth { get; set; }

        public int MaxExperience { get; set; }
        public int MaxExperienceMonth { get; set; }
        public string? Description { get; set; }

        public bool IsActive { get; set; }

        public DateTime? PostDate { get; set; }
       
        public int Country { get; set; }

        public int State { get; set; }

        public int City { get; set; }
        public bool urgentRequirement { get; set; }

        public string? Country_Home { get; set; }
        public string? State_Home { get; set; }
        public string? City_Home { get; set; }

        public bool is_Delete { get; set; }


        public string? CountrywiseJob_count { get; set; }

    }
}
