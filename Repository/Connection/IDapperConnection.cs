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
        IDbConnection CreateConnection();
        string GetDatabaseSchemaName();
    }
}
