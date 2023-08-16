using Dapper;
using DomainModel.Users;
using DomainModel.AppliedJobs;
using Repository.Connection;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.Data.Common;
using NuGet.Protocol.Plugins;



namespace Repository.AppliedJobs
{
    public class AppliedJobsRepository : IAppliedJobsRepository
    {

        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public AppliedJobsRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }


        public IEnumerable<DM_AppliedJobs> GetAppliedJobs()
        {


            IEnumerable<DM_AppliedJobs> result = new List<DM_AppliedJobs>();
            using var connection = _dapperConnection.CreateConnection();
            IDbTransaction transaction = connection.BeginTransaction();
            string Query = @"Select UserId
,FirstName
,LastName
,Gender
,JobId
,JobTitle
,DepartmentName
,MinExperience
,Location
,ProfilePicture from v_AppliedJobs";
            result = connection.Query<DM_AppliedJobs>(Query,transaction:transaction);
            return result;

        }

    }
}

