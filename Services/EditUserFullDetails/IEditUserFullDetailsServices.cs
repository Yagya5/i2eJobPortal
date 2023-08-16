using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;
using DomainModel.EditUserFullDetails;

namespace Services.RegisteredJobSeekers
{
    public interface IEditUserFullDetailsServices
    {
        IEnumerable<EditUserFullDetails> GetUserFullDetails(int id);
        string UpdateProfileDetails(EditUserFullDetails userDetails);

        //public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker);
    }
}
