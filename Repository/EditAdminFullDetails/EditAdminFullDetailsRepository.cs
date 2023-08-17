using Repository.Connection;
using System.Data;
using Dapper;

using DomainModel.EditAdminFullDetails;

namespace Repository.EditAdminFullDetails
{
    public class EditAdminFullDetailsRepository : IEditAdminFullDetailsRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public EditAdminFullDetailsRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        public IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> GetAdminFullDetails(int id)
        {
            IEnumerable<DomainModel.EditAdminFullDetails.EditAdminFullDetails> result = new List<DomainModel.EditAdminFullDetails.EditAdminFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            var para = new { UserId = id };
            result = connection.Query<DomainModel.EditAdminFullDetails.EditAdminFullDetails>("spAdminDetails", para, commandType: CommandType.StoredProcedure);
            return result;
        }

        public string UpdateProfileDetails(DomainModel.EditAdminFullDetails.EditAdminFullDetails adminDetails)
        {
            using var connection = _dapperConnection.CreateConnection();
            var para = new {
                UserId = adminDetails.UserId,
                FirstName = adminDetails.FirstName,
                LastName = adminDetails.LastName,
                Gender = adminDetails.Gender,
                BirthDate = adminDetails.BirthDate,
                PhoneNumber = adminDetails.PhoneNumber,
                State = adminDetails.State,
                City = adminDetails.City,
                Address = adminDetails.Address,
                ProfilePicture = adminDetails.ProfilePicture

            };
            var result = connection.Query<DomainModel.EditAdminFullDetails.EditAdminFullDetails>("spUpdateUserDetails", para, commandType: CommandType.StoredProcedure);
            if (result != null && result.FirstOrDefault().Response == "Update Sucessfully")
            {
                return "Update Sucessfully";
            }
            else
            {
                return "Failed";
            }
        }
    }
}
