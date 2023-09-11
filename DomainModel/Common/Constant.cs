using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.Common
{
    public static class Constant
    {
        public const string

        #region [All VIEWS]:
        GetAllUsersViewName = "v_Users",   //To get details of All Users include their Role Name also.
        GetAllUserLoginsViewName = "v_AuditedLogins", //To get details of Users who login in past.
        GetAllUsersAppliedJobViewName = "v_AppliedJobs",//To get the details of Users who applied for the Jobs.
        GetUserActivitiesViewName = "v_AuditTrail", // It will get details of User Activities which have been audited.
        GetContactQueriesViewName = "v_ContactQueries", // It will get Contact Form related Queries and Messages.
        GetJobDetailsForOldObjectViewName = "v_GetJobDetails_ForOldObject_AuditTrail", // It will get Table_Jobs Details for Old Object before we start to compare & track changes. 
        GetJobData="v_GetJobData",
        #endregion


        #region [All STORED PROCEDURES]:
        AuditUserLoginStoredProcedure = "spAuditUserLogin",  //To audit data of User who login into their account.
        SignUpJobSeekerStoredProcedure = "spJobSeekerSignUp", // inserting data of New Job Seeker into database from Sign-up page.
        InsertAuditTrailStoredProcedure = "spInsertAuditTrail", // It will insert new changes in Table_AuditTrail.
        GetJobSeekerDetailsByIdStoredProcedure = "spGetJobSeekerById", // It will fetch Job Seeker details by Id (for Audit Trail Purpose).
        InsertContactQueryStoredProcedure = "spInsertContactQuery", // It will insert contact query into database.
        CreateNewJob = "spCreateJob",
        DeleteAJob = "spDeleteJob",
        UpdateAJob = "spUpdateJob",
        UpdateStatusRoundStoredProcedure= "spUpdateStatusAndRound",//Updating the Status and Round Of Users which Applied for the Jobs.
            CreateAppliedJob = "spAppliedJobdata",
        #endregion


        #region [ALL TABLES]:
        AboutUsTableName = "Table_AboutUs",
        AppliedJobsTableName = "Table_AppliedJobs",
        AuditLoginsTableName = "Table_AuditLogins",
        AuditTrailTableName = "Table_AuditTrail",
        ContactQueriesTableName = "Table_ContactQueries",
        EducationalDetailsTableName = "Table_EducationalDetails",
        JobsTableName = "Table_Jobs",
        MasterDetailsTableName = "Table_MasterDetails",
        UsersTableName = "Table_Users";
        #endregion

    }
}
