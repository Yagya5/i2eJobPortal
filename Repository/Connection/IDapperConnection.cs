using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Connection
{
    public interface IDapperConnection 
    {
        IDbConnection CreateConnection();  // It will create connection with Database using Connection String
        string GetDatabaseSchemaName();  // It will get Database schema
    }
}
