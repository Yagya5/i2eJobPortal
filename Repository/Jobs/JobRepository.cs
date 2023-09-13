using Dapper;
using DomainModel.AuditLogins;
using DomainModel.Common;
using DomainModel.CountryStateCityTable;
using DomainModel.EditUserFullDetails;
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
      
        public IEnumerable<Job> GetJobs()
        {
            IEnumerable<Job> result = new List<Job>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<Job>("spGetJobs", null, commandType: CommandType.StoredProcedure);
            return result;
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
            param.Add("MinExperienceMonth", job_Obj.MinExperienceMonth);
            param.Add("MaxExperienceMonth", job_Obj.MaxExperienceMonth);
            param.Add("Description", job_Obj.Description);
            param.Add("IsActive", job_Obj.IsActive);
            param.Add("PostDate", job_Obj.PostDate);
            param.Add("urgentRequirement", job_Obj.urgentRequirement);
            param.Add("City", job_Obj.City);
            param.Add("Country", job_Obj.Country);
            param.Add("State", job_Obj.State);
            connection.Execute(Constant.CreateNewJob, param, null, 0, CommandType.StoredProcedure);
            return true;
        }

        //To get the dropdown elements
        public IEnumerable<Master> GetMasterValuesJob()
        {
            IEnumerable<Master> result = new List<Master>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<Master>("GetMasterValuesJobs", null, commandType: CommandType.StoredProcedure);
            return result;
        }

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
        public Job GetJobByIdView(int jobId)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT * FROM v_GetJobData  WHERE JobId = @JobId";
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
            param.Add("MinExperienceMonth", job.MinExperienceMonth);
            param.Add("MaxExperienceMonth", job.MaxExperienceMonth);
            param.Add("Description", job.Description);
            param.Add("IsActive", job.IsActive);
            param.Add("urgentRequirement", job.urgentRequirement);
            param.Add("City", job.City);
            param.Add("Country", job.Country);
            param.Add("State", job.State);
            connection.Execute(Constant.UpdateAJob, param, null, 0, CommandType.StoredProcedure);
            return true;
        }

        public IEnumerable<Job> GetJobsForHomePage()
        {
            IEnumerable<Job> result = new List<Job>();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "SELECT * FROM v_GetJobData";
            result = connection.Query<Job>(Query, null, null, true, 0, null);
            return result;
        }

        public IEnumerable<CountryStateCityData> GetAllCountryStateCity()
        {
            IEnumerable<CountryStateCityData> result = new List<CountryStateCityData>();
            using var connection = _dapperConnection.CreateConnection();
            result = connection.Query<CountryStateCityData>("spGetAllCountryStateCity", null, commandType: CommandType.StoredProcedure);
            return result;
        }

        public Job GetJobById_ForAuditTrail(int jobId)
        {
            using var connection = _dapperConnection.CreateConnection();
            var sql = "SELECT * FROM v_GetJobDetails_ForOldObject_AuditTrail WHERE JobId = @JobId";
            return connection.QuerySingleOrDefault<Job>(sql, new { JobId = jobId });
        }


        public string GetCountryStateCityForAuditTrail(int category_Id, string category_Name)
        {
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add("category_Id", category_Id);
            param.Add("category_Name", category_Name);
            string Value = connection.QuerySingle<string>(Constant.CountryStateCityForAuditTrailStoredProcedure, param, null, 0, CommandType.StoredProcedure);           
            return Value;
        }
    }
}
