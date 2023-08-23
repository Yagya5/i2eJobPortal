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
    public class AppliedJobsReposiotory:IAppliedJobsReposiotory
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public AppliedJobsReposiotory(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }
        public async Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId)
        {
            IEnumerable<ViewModel_AppliedJob> result = new List<ViewModel_AppliedJob>();
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add("@UserId", userId);
            //result = await connection.QueryAsync<ViewModel_AppliedJob>("spAllAppliedjobs",param: param, null, commandType: CommandType.StoredProcedure);

            result = await connection.QueryAsync<ViewModel_AppliedJob>("spAllAppliedjobs", null, commandType: CommandType.StoredProcedure);
            return result;
        }

    }
}
