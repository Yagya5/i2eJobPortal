using DomainModel.Users;
using Repository.RegisteredJobSeekers;
using Repository.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;
using DomainModel.EditUserFullDetails;

namespace Services.RegisteredJobSeekers
{
    public class EditUserFullDetailsServices : IEditUserFullDetailsServices
    {
        private readonly IEditUserFullDetailsRepository _UserFullDetailsRepository;

        public EditUserFullDetailsServices(IEditUserFullDetailsRepository RegisteredJobSeekersRepository) 
        {
            _UserFullDetailsRepository = RegisteredJobSeekersRepository;
            
        }

        public IEnumerable<EditUserFullDetails> GetBachelorsList()
        {
            var result = _UserFullDetailsRepository.GetBachelorsList();
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetCityList(string state)
        {
            var result = _UserFullDetailsRepository.GetCityList(state);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetCountryList()
        {
            var result = _UserFullDetailsRepository.GetCountryList();
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetMastersList()
        {
            var result = _UserFullDetailsRepository.GetMastersList();
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetStateList(string country)
        {
            var result = _UserFullDetailsRepository.GetStateList(country);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetUserFullDetails(int id)
        {
            var result = _UserFullDetailsRepository.GetUserFullDetails(id);
            return result;
        }

        public string UpdateProfileDetails(EditUserFullDetails userDetails)
        {
            var result = _UserFullDetailsRepository.UpdateProfileDetails(userDetails);
            return (string)result;
            
        }

    }
}
