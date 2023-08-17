using Repository.EditAdminFullDetails;
using DomainModel.EditAdminFullDetails;

namespace Services.EditAdminFullDetails
{
    public class EditAdminFullDetailsServices : IEditAdminFullDetailsServices
    {
        private readonly IEditAdminFullDetailsRepository _AdminFullDetailsRepository;

        public EditAdminFullDetailsServices(IEditAdminFullDetailsRepository AdminRepository) 
        {
            _AdminFullDetailsRepository = AdminRepository;
            
        }
        public IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetAdminFullDetails(int id)
        {
            var result = _AdminFullDetailsRepository.GetAdminFullDetails(id);
            return result;
        }

        public string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails adminDetails)
        {
            var result = _AdminFullDetailsRepository.UpdateProfileDetails(adminDetails);
            return (string)result;
            
        }

        
    }
}
