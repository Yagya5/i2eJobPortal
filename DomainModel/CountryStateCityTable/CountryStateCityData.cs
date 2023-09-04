using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.CountryStateCityTable
{
    public class CountryStateCityData
    {
        public int Id { get; set; }
        public int Category_Id { get; set; }
        public string? Category_Name { get; set; }
        public string? Value { get; set; }
        public int Ref_ID { get; set; }
    }
}
