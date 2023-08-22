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
        string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails userDetails);

        //public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker);
    }

    
}
