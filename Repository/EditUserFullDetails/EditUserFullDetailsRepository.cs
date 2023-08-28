using DomainModel.Users;
using Repository.Connection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.RegisteredJobSeekers;
using Dapper;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.Data.Common;
using NuGet.Protocol.Plugins;
using DomainModel.EditUserFullDetails;
using System.Reflection;

namespace Repository.RegisteredJobSeekers
{
    public class EditUserFullDetailsRepository : IEditUserFullDetailsRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public EditUserFullDetailsRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        public IEnumerable<EditUserFullDetails> GetBachelorsList()
        {
            IEnumerable<EditUserFullDetails> result = new List<EditUserFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<EditUserFullDetails>("spGetBachelors", null, commandType: CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetCityList(string state)
        {
            IEnumerable<EditUserFullDetails> result = new List<EditUserFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            var para = new { State = state };
            result = connection.Query<EditUserFullDetails>("spGetCity", para, commandType: CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetCountryList()
        {
            IEnumerable<EditUserFullDetails> result = new List<EditUserFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<EditUserFullDetails>("spGetCountry", null, commandType: CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetMastersList()
        {
            IEnumerable<EditUserFullDetails> result = new List<EditUserFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<EditUserFullDetails>("spGetMasters", null, commandType: CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetStateList(string country)
        {
            IEnumerable<EditUserFullDetails> result = new List<EditUserFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            var para = new { Country = country };
            result = connection.Query<EditUserFullDetails>("spGetState", para, commandType: CommandType.StoredProcedure);
            return result;
        }

        public IEnumerable<EditUserFullDetails> GetUserFullDetails(int id)
        {
            IEnumerable<EditUserFullDetails> result = new List<EditUserFullDetails>();
            using var connection = _dapperConnection.CreateConnection();
            var para = new { UserId = id };
            result = connection.Query<EditUserFullDetails>("spUserDetails", para, commandType: CommandType.StoredProcedure);
            return result;
        }


        public string UpdateProfileDetails(EditUserFullDetails userDetails)
        {
            using var connection = _dapperConnection.CreateConnection();
            var para = new {
                UserId = userDetails.UserId,
                FirstName = userDetails.FirstName,
                LastName = userDetails.LastName,
                Gender = userDetails.Gender,
                BirthDate = userDetails.BirthDate,
                PhoneNumber = userDetails.PhoneNumber,
                Country = userDetails.Country,
                State = userDetails.State,
                City = userDetails.City,
                Address = userDetails.Address,
                ProfilePicture = userDetails.ProfilePicture,
                Bachelors = userDetails.Bachelors,
                Masters = userDetails.Masters,
                Skills = userDetails.Skills,
                Experience = userDetails.Experience,
                CoverLetter = userDetails.CoverLetter,
                Resume = userDetails.Resume

            };
            var result = connection.Query<EditUserFullDetails>("spUpdateUserDetails", para, commandType: CommandType.StoredProcedure);
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
