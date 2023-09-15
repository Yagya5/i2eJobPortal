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
using DomainModel.AdminDashboard;
using DomainModel.Jobs;



namespace Repository.AdminDashboard
{
    public class AdminDashboardRepository : IAdminDashBoardRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;


        public AdminDashboardRepository(IDapperConnection dapperConnection)
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        //public DataSet GetAdminDashData()
        //{
        //    string connectionString = "Data Source=SQL-DB-01;Initial Catalog=I2eJobPortal_DB;User Id=JP_User;Password=I2e@JobPortal;";
        //    using (SqlConnection con = new SqlConnection(connectionString))
        //    {
        //        try
        //        {
        //            con.Open();
        //            using (SqlCommand cmd = new SqlCommand("spAdminDashboard", con))
        //            {
        //                cmd.CommandType = CommandType.StoredProcedure;

        //                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
        //                {
        //                    DataSet ds = new DataSet();
        //                    da.Fill(ds);

        //                    // Create an instance of your AdminDash model
        //                    AdminDash adminDash = new AdminDash();

        //                    // Map data to the Counts property
        //                    adminDash.Counts = new Counts
        //                    {
        //                        selected_count = ds.Tables[0].Rows[0]["selected_count"] as int?,
        //                        rejected_count = ds.Tables[0].Rows[0]["rejected_count"] as int?,
        //                        total_applied_jobs = ds.Tables[0].Rows[0]["total_applied_jobs"] as int?,
        //                        user_count = ds.Tables[0].Rows[0]["user_count"] as int?
        //                    };

        //                    // Map data to the AuditDetails property (assuming it's a list)
        //                    adminDash.AuditDetails = ds.Tables[1].AsEnumerable().Select(row => new AuditDetails
        //                    {
        //                        Id = row.Field<int>("Id"),
        //                        FirstName = row.Field<string>("FirstName"),
        //                        LastName = row.Field<string>("LastName"),
        //                        LoginTimeStamp = row.Field<DateTime?>("LoginTimeStamp")
        //                    }).ToList();

        //                    // Map data to the JobDetails property (assuming it's a list)
        //                    adminDash.JobDetails = ds.Tables[2].AsEnumerable().Select(row => new JobDetails
        //                    {
        //                        JobId = row.Field<int>("JobId"),
        //                        JobTitle = row.Field<string>("JobTitle"),
        //                        DepartmentName = row.Field<string>("DepartmentName"),
        //                        JobMode = row.Field<int>("JobMode"),
        //                        JobType = row.Field<int>("JobType")
        //                    }).ToList();

        //                    return adminDash;
        //                }
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            // Log or handle the exception
        //            Console.WriteLine(ex.Message);
        //            return null; // Return null or an empty AdminDash in case of an error
        //        }
        //    }
        //}


        public IEnumerable<Counts>GetCounts()
        {
            IEnumerable<Counts> countsresult= new List<Counts>();
            using var connection = _dapperConnection.CreateConnection();
            IDbTransaction transaction = connection.BeginTransaction();

            string Query = @"select selected_count
,rejected_count
,user_count
,total_applied_jobs from v_AppliedJobStats";

            countsresult = connection.Query<Counts>(Query, transaction: transaction);
            return countsresult;

        }

        public IEnumerable<JobDetails>GetJobDetails()
        {
            IEnumerable<JobDetails> jobsresult = new List<JobDetails>();
            using var connection = _dapperConnection.CreateConnection();
            IDbTransaction transaction = connection.BeginTransaction();
            string Query = @"select JobId
,JobTitle
,DepartmentName
,JobMode
,JobType
,JobTypeCount 
from v_JobInformation";

            jobsresult = connection.Query<JobDetails>(Query, transaction: transaction);
            return jobsresult;

        }


        public IEnumerable<AuditDetails>GetAuditDetails()
        {
            IEnumerable<AuditDetails> auditresult = new List<AuditDetails>();
            using var connection = _dapperConnection.CreateConnection();
            IDbTransaction transaction = connection.BeginTransaction();

            string Query = @"SELECT TOP 8 * FROM v_AuditedLogins 
                            WHERE Role IN ('admin', 'super admin') order by LoginTimeStamp desc";

            auditresult=connection.Query<AuditDetails>(Query,transaction: transaction);
            return auditresult;
        }


        public IEnumerable<JobDetails>GetJobModeDetails()
        {
            IEnumerable<JobDetails>countresult= new List<JobDetails>();
            using var connnection = _dapperConnection.CreateConnection();
            IDbTransaction transaction = connnection.BeginTransaction();
            string Query = @"
SELECT JobMode, COUNT(*) AS JobModeCount
FROM v_JobInformation
GROUP BY JobMode
ORDER BY JobModeCount DESC";

            countresult = connnection.Query<JobDetails>(Query, transaction: transaction);
            return countresult;

        }



        public IEnumerable<Job> GetStatewise_JobCount()
        {
            IEnumerable<Job> jobscount= new List<Job>();
            using var connection = _dapperConnection.CreateConnection();
            IDbTransaction transaction = connection.BeginTransaction();
            string Query = @"SELECT Country_Home, COUNT(JobId) AS CountrywiseJob_count
FROM v_GetJobData
GROUP BY Country_Home";


            jobscount = connection.Query<Job>(Query,transaction: transaction);
            return jobscount;
        }

    }
}
