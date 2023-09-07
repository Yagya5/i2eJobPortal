
namespace Services.EditAdminFullDetails
{
    public interface IEditAdminFullDetailsServices
    {
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetAdminFullDetails(int id);
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetCityList(string state);
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetCountryList();
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetStateList(string country);
        string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails adminDetails);  
    }
}
