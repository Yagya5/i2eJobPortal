/****** Object:  View [dbo].[v_AppliedJobs]    Script Date: 18-08-2023 13:59:35 ******/
DROP VIEW [dbo].[v_AppliedJobs]
GO
/****** Object:  View [dbo].[v_AppliedJobs]    Script Date: 18-08-2023 13:59:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE VIEW [dbo].[v_AppliedJobs] AS 
SELECT 
Table_Users.UserId, 
Table_Users.FirstName,
Table_Users.LastName,
Table_Users.Gender,
Table_Jobs.JobId,
Table_Jobs.JobTitle,
Table_Jobs.DepartmentName,
Table_Jobs.MinExperience,
Table_Jobs.Location,
Table_Users.ProfilePicture,
Table_EducationalDetails.Resume,
Table_AppliedJobs.Status,
Table_AppliedJobs.Round
FROM 
Table_AppliedJobs
 JOIN Table_Users ON Table_Users.UserId =Table_AppliedJobs.UserId
 JOIN Table_Jobs ON Table_Jobs.JobId=Table_AppliedJobs.JobId
 JOIN Table_EducationalDetails ON Table_EducationalDetails.Id = Table_AppliedJobs.Id;



GO
