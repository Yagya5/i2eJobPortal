using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.MasterDetails
{
    public class Master
    {
        public int MasterId { get; set; }
        public string? Category { get; set; }
        public string? Value { get; set; }
    }
}
