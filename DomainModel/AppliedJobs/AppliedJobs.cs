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
        public string ?LastName{ get; set; } /*Call from Users table*/
        public string ?Gender{ get; set; } /*Call from Users table*/
        public string? Location { get; set; } /*Call from Jobs table*/
        public string ? ProfilePicture { get; set; } /*Call from Users table*/
        public string? Resume { get; set; } /*Call from EducationalDetails table*/

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

        public string? Location { get; set; }
        public string? JobModeName { get; set; }
        public string? JobTypeName { get; set; }

        public string? Status { get; set; }
        public string? Round { get; set; }

    }

}
