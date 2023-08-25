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
        #endregion


        #region [All STORED PROCEDURES]:
        AuditUserLoginStoredProcedure = "spAuditUserLogin",  //To audit data of User who login into their account.
        SignUpJobSeekerStoredProcedure = "spJobSeekerSignUp", // inserting data of New Job Seeker into database from Sign-up page.
        InsertAuditTrailStoredProcedure = "spInsertAuditTrail",
        CreateNewJob = "spCreateJob",
        DeleteAJob = "spDeleteJob",
        UpdateAJob = "spUpdateJob",
        #endregion


        #region [ALL TABLES]:
        AboutUsTableName = "Table_AboutUs",
        AppliedJobsTableName = "Table_AppliedJobs",
        AuditLoginsTableName = "Table_AuditLogins",
        ContactUsTableName = "Table_ContactUs",
        EducationalDetailsTableName = "Table_EducationalDetails",
        JobsTableName = "Table_Jobs",
        MasterDetailsTableName = "Table_MasterDetails",
        UsersTableName = "Table_Users";
        #endregion

    }
}
