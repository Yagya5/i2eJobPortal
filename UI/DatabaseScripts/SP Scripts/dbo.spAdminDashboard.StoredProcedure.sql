/****** Object:  StoredProcedure [dbo].[spAdminDashboard]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spAdminDashboard]
GO
/****** Object:  StoredProcedure [dbo].[spAdminDashboard]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAdminDashboard]
AS
BEGIN

    DECLARE @selected_count INT;
    DECLARE @rejected_count INT;
    DECLARE @user_count INT;
    DECLARE @total_applied_jobs INT;

    -- Query 1: Get selected and rejected counts
    SELECT
        @selected_count = SUM(CASE WHEN status = 14 THEN 1 ELSE 0 END),
        @rejected_count = SUM(CASE WHEN status = 15 THEN 1 ELSE 0 END)
    FROM [dbo].[Table_AppliedJobs];

    -- Query 2: Get user count with RoleId = 3
    SELECT @user_count = COUNT(*) 
    FROM Table_Users
    WHERE RoleId = 3;

    -- Query 3: Get total count of applied jobs
    SELECT @total_applied_jobs = COUNT(*)
    FROM [Table_AppliedJobs];

    -- Query 4: Get the top 10 audit logins
    SELECT TOP 10 Id, FirstName, LastName, LoginTimeStamp
    FROM Table_AuditLogins
    ORDER BY LoginTimeStamp DESC;

    -- Query 5: Get job information with JobType and JobMode descriptions
    SELECT
        J.JobId,
        J.DepartmentName,
        J.JobTitle,
        MD1.Value AS JobType,
        MD2.Value AS JobMode
    FROM Table_Jobs J
    INNER JOIN Table_MasterDetails MD1 ON J.JobType = MD1.Id AND MD1.Category = 'Job Type'
    INNER JOIN Table_MasterDetails MD2 ON J.JobMode = MD2.Id AND MD2.Category = 'Job Mode';

    -- Return the results as a result set
    SELECT 
        @selected_count AS selected_count,
        @rejected_count AS rejected_count,
        @user_count AS user_count,
        @total_applied_jobs AS total_applied_jobs;
END;
GO
