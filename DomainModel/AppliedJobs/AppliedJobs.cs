using DomainModel.Users;
using Microsoft.CodeAnalysis;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AppliedJobs
{
    public class DM_AppliedJobs
    {

        public string? Response { get; set; }

        public int AppliedJobId { get; set; }
        public int UserId { get; set; } /*Call from Users table*/
        public int JobId { get; set; } /*Call from Jobs table*/

        public DateTime DateTime { get; set; }

        public string ?Status { get; set; } /*Call from Master table*/
        public string? Round { get; set; } /*Call from Master table*/
        public  int Id { get; set; } /*Call from EducationalDetails table*/




        public string ?FirstName{ get; set; } /*Call from Users table*/
        public string? JobTitle { get; set; } /*Call from Jobs table*/
        public string ?DepartmentName{ get; set; }/*Call from Jobs table*/
        public string ?MinExperience{ get; set; }/*Call from Jobs table*/
        public string ? MaxExperience { get; set; }
        public string? MaxExperienceMonth { get; set; }
        public string? MinExperienceMonth { get; set; }
        public string ?LastName{ get; set; } /*Call from Users table*/
        public string ?Gender{ get; set; } /*Call from Users table*/

        public string? Country_Home { get; set; }
        public string? State_Home { get; set; }
        public string? City_Home { get; set; }

        public string ? ProfilePicture { get; set; } /*Call from Users table*/
        public string? Resume { get; set; } /*Call from EducationalDetails table*/

        public string? StatusValue { get; set; }
        public string? RoundValue { get; set; }
    }

    public class AppliedJob 
    {
        public int UserId { get; set; }
        public int JobId { get; set; }
        public DateTime? JobAppliedDateTime { get; set; }
    }
    public class ViewModel_AppliedJob : AppliedJob
    {

        public string? JobTitle { get; set; }

     
        public string? JobModeName { get; set; } /* call from master table */
        public string? JobTypeName { get; set; } /* call from master table */

        public string? Status { get; set; }
        public string? Round { get; set; }
      

    }

}
