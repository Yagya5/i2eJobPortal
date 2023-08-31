using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.ContactQueries
{
    public class ContactQuery
    {
        public int Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Message { get; set; }

        public string? IPAddress { get; set; }

        public DateTime? DateTimeStamp { get; set; }

    }
}
