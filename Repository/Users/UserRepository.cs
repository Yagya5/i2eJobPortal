using Dapper;
using DomainModel.AuditLogins;
using DomainModel.Common;
using DomainModel.Users;
using Repository.Connection;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;


namespace Repository.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public UserRepository(IDapperConnection dapperConnection)  // Class constructor & Dependency Injection
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        public bool AuditUserLogin(AuditLogin model)  // It will insert entry into Table_AuditLogins of User who does Log-in
        {
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add(nameof(AuditLogin.FirstName), model.FirstName);
            param.Add(nameof(AuditLogin.LastName), model.LastName);
            param.Add(nameof(AuditLogin.Email), model.Email);
            param.Add(nameof(AuditLogin.UserId), model.UserId);
            param.Add(nameof(AuditLogin.RoleId), model.RoleId);
            connection.Execute(Constant.AuditUserLoginStoredProcedure, param, null, 0, CommandType.StoredProcedure);
            return true;
        }

        public User AuthenticateUser(string Email, string Password)  // It will check authentication
        {
            var result = new User();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "select * from " + Constant.GetAllUsersViewName + " where Email='" + Email + "' and Password = '" + Password + "'";
            result = connection.QueryFirstOrDefault<User>(Query, null, null, 0, null);
            return result;
        }

        public IEnumerable<AuditLogin> GetRecentLogins()  // It will fetch recent 50 Login entries according to LoginTimeStamp
        {
            IEnumerable<AuditLogin> result = new List<AuditLogin>();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "SELECT top 50 * FROM v_AuditedLogins ORDER BY LoginTimeStamp DESC";
            result = connection.Query<AuditLogin>(Query, null, null, true, 0, null);
            return result;
        }

        public int GetRecentSignedUp_UserId(string Email) // Getting UserId of User right after his Sign-Up Process, this UserId might be required for Dashboard related Operations.
        {
            var result = new User();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "select UserId from v_Users where Email='" + Email + "'";
            result = connection.QueryFirstOrDefault<User>(Query, null, null, 0, null);
            return result.UserId;
        }

        public IEnumerable<User> GetUsers()   // It will get all Users
        {
            IEnumerable<User> result = new List<User>();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "select * from v_Users";
            result = connection.Query<User>(Query, null, null, true, 0, null);            
            return result;
        }

        public bool JobSeekerSignUp(string FirstName, string LastName, string Email, string Password) // It will perform Sign Up functionality
        {
            int result = 0;
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add(nameof(User.FirstName), FirstName);
            param.Add(nameof(User.LastName), LastName);
            param.Add(nameof(User.Email), Email);
            param.Add(nameof(User.Password), Password);
            result = connection.Execute("spJobSeekerSignUp", param, null, 0, CommandType.StoredProcedure);
            if (result != 0)
            {
                return true;
            }
            else
                return false;
        }
    }
}