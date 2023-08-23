using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AppliedJob
{
    public class AppliedJob
    {
        public int UserId { get; set; }
        public int JobId { get; set; }  
        public DateTime? JobAppliedDateTime { get; set; }
    }
    public class ViewModel_AppliedJob:AppliedJob
    {
     
        public string? JobTitle { get; set; }

        public string? Location { get; set; }
        public string? JobModeName { get; set; }
        public string? JobTypeName { get; set; }
        
        public string? Status { get; set; }
        public string ? Round { get; set; }

    }
}
