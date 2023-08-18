using Dapper;
using Repository.Connection;
using DomainModel.Users;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModel.AppliedJob;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.Data.Common;
using NuGet.Protocol.Plugins;


namespace Repository.MyAppliedJos
{
    public class AppliedJobsReposiotory:IAppliedReposiotory
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public AppliedJobsReposiotory(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }
        public IEnumerable<ViewModel_AppliedJob> MyAppliedJobs()
        {
            IEnumerable<ViewModel_AppliedJob> result = new List<ViewModel_AppliedJob>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<ViewModel_AppliedJob>("spAllAppliedjobs", null, commandType: CommandType.StoredProcedure);
            return result;
        }

    }
}
