
namespace Services.EditAdminFullDetails
{
    public interface IEditAdminFullDetailsServices
    {
        IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetAdminFullDetails(int id);
        string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails adminDetails);
        //string UpdateProfileDetails(EditAdminFullDetails userDetails);
        //string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails userDetails);

        //public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker);
    }
}
