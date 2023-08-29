using Dapper;
using DomainModel.Common;
using DomainModel.Jobs;
using DomainModel.MasterDetails;
using Repository.Connection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Jobs
{
    public class JobRepository : IJobRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public JobRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }
        //Start Functions to display all the jobs list
        public IEnumerable<Job> GetJobs()
        {
            IEnumerable<Job> result = new List<Job>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<Job>("spGetJobs", null, commandType: CommandType.StoredProcedure);
            return result;
        }
        public Master FindJobIdInMaster(int jobId)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT Value FROM " + Constant.MasterDetailsTableName + " WHERE Id = @MasterId";
            return connection.Query<Master>(sql, new { MasterId = jobId }).Single();
        }

        //End

        //Start Create operation
        public int GetMasterIdByValue(string category, string value)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT Id FROM " + Constant.MasterDetailsTableName + " WHERE Category = @Category AND Value = @Value";
            return connection.QuerySingleOrDefault<int>(sql, new { Category = category, Value = value });
        }

        public bool CreateJob(Job job_Obj)
        {
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();

           

            param.Add("JobType", job_Obj.JobType);
            param.Add("JobTitle", job_Obj.JobTitle);
            param.Add("DepartmentName", job_Obj.DepartmentName);
            param.Add("Salary", job_Obj.Salary);
            param.Add("CurrencyType", job_Obj.CurrencyType);
            param.Add("JobMode", job_Obj.JobMode);
            param.Add("MinExperience", job_Obj.MinExperience);
            param.Add("MaxExperience", job_Obj.MaxExperience);
            param.Add("Description", job_Obj.Description);
            param.Add("IsActive", job_Obj.IsActive);
            param.Add("PostDate", job_Obj.PostDate);
            param.Add("Location", job_Obj.Location);
            param.Add("urgentRequirement", job_Obj.urgentRequirement);
            connection.Execute(Constant.CreateNewJob, param, null, 0, CommandType.StoredProcedure);
            return true;
        }

        //To get the dropdown elements
        public IEnumerable<Master> GetMasterValuesByCategory(string category)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT Id, Category, Value FROM " + Constant.MasterDetailsTableName + " WHERE Category = @Category";
            return connection.Query<Master>(sql, new { Category = category });
        }
        //End

        //Start Delete Operation
        public bool DeleteJob(int JobId)
        {
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add(nameof(Job.JobId), JobId);
            connection.Execute(Constant.DeleteAJob, param, null, 0, CommandType.StoredProcedure);
            return true;
        }

        //End
        //to find a job by its id
        public Job GetJobById(int jobId)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT * FROM " + Constant.JobsTableName + " WHERE JobId = @JobId";
            return connection.QuerySingleOrDefault<Job>(sql, new { JobId = jobId });
        }
        //Updating a Job
        public bool UpdateJob(Job job)
        {
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();



            param.Add("JobId", job.JobId);
            param.Add("JobType", job.JobType);
            param.Add("JobTitle", job.JobTitle);
            param.Add("DepartmentName", job.DepartmentName);
            param.Add("Salary", job.Salary);
            param.Add("CurrencyType", job.CurrencyType);
            param.Add("JobMode", job.JobMode);
            param.Add("MinExperience", job.MinExperience);
            param.Add("MaxExperience", job.MaxExperience);
            param.Add("Description", job.Description);
            param.Add("IsActive", job.IsActive);
            param.Add("Location", job.Location);
            param.Add("urgentRequirement", job.urgentRequirement);
            connection.Execute(Constant.UpdateAJob, param, null, 0, CommandType.StoredProcedure);
            return true;
        }

    }
}
