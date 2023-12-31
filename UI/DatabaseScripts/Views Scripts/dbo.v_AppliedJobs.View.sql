/****** Object:  View [dbo].[v_AppliedJobs]    Script Date: 06-09-2023 15:51:24 ******/
DROP VIEW [dbo].[v_AppliedJobs]
GO
/****** Object:  View [dbo].[v_AppliedJobs]    Script Date: 06-09-2023 15:51:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[v_AppliedJobs] AS 
SELECT 
    AJ.AppliedJobId,
    U.UserId,
    U.FirstName,
    U.LastName,
    U.Gender,
    J.JobId,
    J.JobTitle,
    J.DepartmentName,
    J.MinExperience,
	 J.MaxExperience, 
    J.MaxExperienceMonth, 
    J.MinExperienceMonth, 
	 U.ProfilePicture,
    ED.Resume,
	 MJT.Value AS JobType, 
    MS.Value AS Status,
    MR.Value AS Round,
	(SELECT Value FROM dbo.Table_Country_State_City WHERE Category_Id = J.Country AND Category_Name = 'Country') AS Country_Home, 
    (SELECT Value FROM dbo.Table_Country_State_City WHERE Category_Id = J.State AND Category_Name = 'State') AS State_Home,
    (SELECT Value FROM dbo.Table_Country_State_City WHERE Category_Id = J.City AND Category_Name = 'City') AS City_Home
FROM 
    Table_AppliedJobs AJ
INNER JOIN Table_Users U ON U.UserId = AJ.UserId
INNER JOIN Table_Jobs J ON J.JobId = AJ.JobId
INNER JOIN Table_EducationalDetails ED ON ED.Id = AJ.Table_EducationalDetails_Id
INNER JOIN Table_MasterDetails MS ON MS.Id = AJ.Status AND MS.Category = 'Status'
INNER JOIN Table_MasterDetails MR ON MR.Id = AJ.Round AND MR.Category = 'Round'
INNER JOIN Table_MasterDetails MJT ON MJT.Id = AJ.JobType AND MJT.Category = 'Job Type';



GO
