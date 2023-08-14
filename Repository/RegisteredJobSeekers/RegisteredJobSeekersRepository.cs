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

namespace Repository.RegisteredJobSeekers
{
    public class RegisteredJobSeekersRepository : IRegisteredJobSeekersRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public RegisteredJobSeekersRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        public IEnumerable<RegisteredJobSeeker> GetRegisteredJobSeekers()
        {
            IEnumerable<RegisteredJobSeeker> result = new List<RegisteredJobSeeker>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<RegisteredJobSeeker>("spGet_Registered_JobSeekers", null, commandType: CommandType.StoredProcedure);
            return result;
        }

        public bool UpdateJobSeekerAccountStatus(RegisteredJobSeeker jobSeeker)
        {
            using var connection = _dapperConnection.CreateConnection();
            var para = new { Is_Active = jobSeeker.Is_Active, UserId = jobSeeker.UserId };
            var result = connection.Query<RegisteredJobSeeker>("spUpdateJobSeekerAccountStatus", para,commandType: CommandType.StoredProcedure);
            
            if (result != null && result.FirstOrDefault().Response == "Update Sucessfully")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
