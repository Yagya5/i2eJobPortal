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
        public DateTime JobsubmitDateTime { get; set; }
        public string? Status {get; set; }
        public int id { get; set; }



    }
    public class ViewModel_AppliedJob:AppliedJob
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? JobTypeName { get; set; }
        public string? JobModeName { get; set; }
       

    }
}
