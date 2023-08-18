/****** Object:  StoredProcedure [dbo].[spAllAppliedjobs]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spAllAppliedjobs]
GO
/****** Object:  StoredProcedure [dbo].[spAllAppliedjobs]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAllAppliedjobs]
AS
BEGIN

   select  Table_Users.UserId,Table_Users.FirstName,Table_Users.LastName,Table_Users.Gender,Table_Jobs.JobId,Table_Jobs.JobTitle,Table_Jobs.JobType,Table_Jobs.JobMode
,masterJobType.value as JobTypeName, masterJobMode.value as JobModeName
from Table_Users 
inner join Table_AppliedJobs
on Table_AppliedJobs.UserId = Table_Users.UserId
inner join Table_Jobs
on Table_AppliedJobs.JobId = Table_Jobs.JobId
left join [dbo].[Table_MasterDetails] as masterJobType on masterJobType.[Category] = 'Job Type' and masterJobType.Id = Table_Jobs.JobType
left join [dbo].[Table_MasterDetails] as masterJobMode on masterJobMode.[Category] = 'Job Mode' and masterJobMode.Id = Table_Jobs.JobMode
END;
GO
