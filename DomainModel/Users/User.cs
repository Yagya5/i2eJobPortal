using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Users
{
    public class User
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

    }
}
