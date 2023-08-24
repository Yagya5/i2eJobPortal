using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;
using DomainModel.EditAdminFullDetails;

namespace Repository.EditAdminFullDetails
{
    public interface IEditAdminFullDetailsRepository
    {
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetAdminFullDetails(int id);
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetCityList(string state);
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetCountryList();
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetStateList(string country);
        string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails userDetails);

    }

    
}
