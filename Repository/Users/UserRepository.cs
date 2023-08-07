using Dapper;
using DomainModel.Users;
using Repository.Connection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Users
{
    public class UserRepository : IUserRepository
    {

        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public UserRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        public IEnumerable<User> GetUsers()
        {
            IEnumerable<User> result = new List<User>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<User>("spGetUsers", null, commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}
