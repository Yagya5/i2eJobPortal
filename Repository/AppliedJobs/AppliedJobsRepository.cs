﻿using Dapper;
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



        //    public void UpdateAppliedJob(DM_AppliedJobs appliedJob)
        //    {
        //        using var connection = _dapperConnection.CreateConnection();
        //        string query = @"UPDATE v_AppliedJobs
        //                        SET FirstName = @FirstName,
        //                            LastName = @LastName,
        //                            Gender = @Gender,
        //                            JobId = @JobId,
        //                            JobTitle=@JobTitle,
        //                            DepartmentName=@DepartmentName,
        //                            MinExperience=@MinExperience,
        //                            Location=@Location
        //                        WHERE UserId = @UserId";

        //        connection.Execute(query, appliedJob);
        //    }

        public async Task<IEnumerable<ViewModel_AppliedJob>> MyAppliedJobs(int userId)
        {
            IEnumerable<ViewModel_AppliedJob> result = new List<ViewModel_AppliedJob>();
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add("@User_ID", userId);
            result = await connection.QueryAsync<ViewModel_AppliedJob>("spAllAppliedjobs", param: param, commandType: CommandType.StoredProcedure);

            // result = await connection.QueryAsync<ViewModel_AppliedJob>("spAllAppliedjobs", null, commandType: CommandType.StoredProcedure);
            return result;
        }
    }
}




    








       
       