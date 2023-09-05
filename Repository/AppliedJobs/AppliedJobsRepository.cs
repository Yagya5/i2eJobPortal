using Dapper;
using DomainModel.Users;
using DomainModel.AppliedJobs;
using Repository.Connection;
using DomainModel.MasterDetails;
using DomainModel.Common;
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
using System.Reflection.Metadata;




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
            string Query = @"Select AppliedJobId
,FirstName
,LastName
,Gender
,JobTitle
,DepartmentName
,MinExperience
,MaxExperience
,MinExperienceMonth
,MaxExperienceMonth
,JobType
,Country_Home
,State_Home
,City_Home
,ProfilePicture 
,Status
,Round
,Resume from v_AppliedJobs";
            result = connection.Query<DM_AppliedJobs>(Query,transaction:transaction);
            return result;

        }

        //To get the dropdown elements
        public IEnumerable<Master> GetMasterValuesByCategoryForAppliedJobs(string category)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT Value FROM " + DomainModel.Common.Constant.MasterDetailsTableName + " WHERE Category = @Category";
            return connection.Query<Master>(sql, new { Category = category });
        }
        //End



        public int GetMasterIdByValueForAppliedJobs(string category, string value)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT Id FROM " + DomainModel.Common.Constant.MasterDetailsTableName + " WHERE Category = @Category AND Value = @Value";
            return connection.QuerySingleOrDefault<int>(sql, new { Category = category, Value = value });
        }


        public bool UpdateAppliedJob(DM_AppliedJobs appliedJobs_Obj)
        {
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            var Status = GetMasterIdByValueForAppliedJobs("Status", appliedJobs_Obj.StatusValue);
            var Round = GetMasterIdByValueForAppliedJobs("Round", appliedJobs_Obj.RoundValue);
            param.Add("AppliedJobId", appliedJobs_Obj.AppliedJobId);
            //param.Add("FirstName", appliedJobs_Obj.FirstName);
            //param.Add("lastName", appliedJobs_Obj.LastName);
            //param.Add("Gender", appliedJobs_Obj.Gender);
            //param.Add("JobTitle", appliedJobs_Obj.JobTitle);
            //param.Add("DepartmentName", appliedJobs_Obj.DepartmentName);
            //param.Add("MinExperience", appliedJobs_Obj.MinExperience);
            //param.Add("Location", appliedJobs_Obj.Location);
            //param.Add("ProfilePicture", appliedJobs_Obj.ProfilePicture);
            param.Add("Status",Status);
            param.Add("Round",Round);
            //param.Add("Resume", appliedJobs_Obj.Resume);
            //connection.Execute(DomainModel.Common.Constant.UpdateStatusRoundStoredProcedure, param, null, 0, CommandType.StoredProcedure);
            var result = connection.Query<DM_AppliedJobs>("spUpdateStatusAndRound", param, commandType: CommandType.StoredProcedure);

            return true;
        }







        //public bool UpdateUserStatusandRound(DM_AppliedJobs appliedJobs)
        //{

        //    using var connection = _dapperConnection.CreateConnection();
        //    var para=new {Round = appliedJobs.Round,Status=appliedJobs.Status};
        //    var result = connection.Query<DM_AppliedJobs>("spUpdateStatusAndRound", para, commandType: CommandType.StoredProcedure);

        //    if (result != null && result.FirstOrDefault().Response == "Updated Successfully")
        //    {
        //        return true;

        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}

        //Task<IEnumerable<ViewModel_AppliedJob>> IAppliedJobsRepository.MyAppliedJobs(int userId)
        //{
        //    throw new NotImplementedException();
        //}
    }
}

















