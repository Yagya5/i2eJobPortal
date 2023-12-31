/****** Object:  StoredProcedure [dbo].[spAllAppliedjobs]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spAllAppliedjobs]
GO
/****** Object:  StoredProcedure [dbo].[spAllAppliedjobs]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spAllAppliedjobs]
(
@User_ID int = null
)
AS
BEGIN

   select  Table_Users.UserId,Table_Jobs.JobId,Table_Jobs.JobTitle,Table_Jobs.Location, Table_Jobs.JobType,Table_Jobs.JobMode ,Table_AppliedJobs.DateTime as JobAppliedDateTime,
   Table_AppliedJobs.Status,Table_AppliedJobs.Round 
,masterJobType.value as JobTypeName, masterJobMode.value as JobModeName,masterStatus.value as Status,masterRound.value as Round 
from Table_Users 
inner join Table_AppliedJobs
on Table_AppliedJobs.UserId = Table_Users.UserId
inner join Table_Jobs
on Table_AppliedJobs.JobId = Table_Jobs.JobId
inner join [dbo].[Table_MasterDetails] as masterJobType on masterJobType.[Category] = 'Job Type' and masterJobType.Id = Table_Jobs.JobType
inner join [dbo].[Table_MasterDetails] as masterJobMode on masterJobMode.[Category] = 'Job Mode' and masterJobMode.Id = Table_Jobs.JobMode
left join [dbo].[Table_MasterDetails] as masterStatus on masterStatus.[Category] = 'Status' and masterStatus.Id = Table_AppliedJobs.Status
left join [dbo].[Table_MasterDetails] as masterRound on masterRound.[Category] = 'Round' and masterRound.Id = Table_AppliedJobs.Round
Where Table_Users.UserId = (Case when  @User_ID is not null then @User_ID else Table_Users.UserId END)
order by JobAppliedDateTime desc
END;
GO
