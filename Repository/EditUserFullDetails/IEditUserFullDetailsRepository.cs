using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;
using DomainModel.EditUserFullDetails;

namespace Repository.RegisteredJobSeekers
{
    public interface IEditUserFullDetailsRepository
    {
        IEnumerable<EditUserFullDetails> GetBachelorsList();
        IEnumerable<EditUserFullDetails> GetCityList(string state);
        IEnumerable<EditUserFullDetails> GetCountryList();
        IEnumerable<EditUserFullDetails> GetMastersList();
        IEnumerable<EditUserFullDetails> GetStateList(string country);
        IEnumerable<EditUserFullDetails> GetUserFullDetails(int id);
        string UpdateProfileDetails(EditUserFullDetails userDetails);

        //public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker);
    }

    
}
