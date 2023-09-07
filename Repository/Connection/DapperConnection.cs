using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Connection
{
    public class DapperConnection : IDapperConnection
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionName;

        public DapperConnection(IConfiguration configuration, string connectionName = "DefaultConnection") // Class constructor & Dependency Injection
        {
            _configuration = configuration;
            _connectionName = connectionName;
        }

        public IDbConnection CreateConnection() // It will create connection with Database using Connection String
        {
            IDbConnection dbConnection;
            string connectionStr = _configuration.GetConnectionString(_connectionName);
            if (string.IsNullOrWhiteSpace(connectionStr))
                throw new ArgumentNullException(nameof(_connectionName), $"The config of {_connectionName} cannnot be null");
            dbConnection = new SqlConnection(connectionStr);
            dbConnection.Open();
            return dbConnection;
        }

        public string GetDatabaseSchemaName() // It will get Database schema
        {
            return _configuration.GetSection("DbconnectionSchemaName").GetSection("schema_name").Value;
        }
    }
}
