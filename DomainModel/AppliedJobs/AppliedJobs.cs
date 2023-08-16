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
        public int UserId { get; set; }
        public int JobId { get; set; }

        public DateTime DateTime { get; set; }

        public string ?Status { get; set; }

 
 

 public string ?FirstName{ get; set; }
 public string ?LastName{ get; set; }
 public string ?Gender{ get; set; }
 public string ?JobTitle{ get; set; }
 public string ?DepartmentName{ get; set; }
 public string ?MinExperience{ get; set; }
public string? Location { get; set; }


}
}
