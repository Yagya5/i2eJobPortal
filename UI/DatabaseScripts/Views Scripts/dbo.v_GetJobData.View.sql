/****** Object:  View [dbo].[v_GetJobData]    Script Date: 06-09-2023 15:51:24 ******/
DROP VIEW [dbo].[v_GetJobData]
GO
/****** Object:  View [dbo].[v_GetJobData]    Script Date: 06-09-2023 15:51:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[v_GetJobData] AS
SELECT 
    J.JobId, 
    Mst1.Value AS JobType_Home, 
    J.JobTitle, 
    J.DepartmentName, 
    J.Salary, 
    Mst2.Value AS CurrencyType_Home, 
    Mst3.Value AS JobMode_Home, 
    J.MinExperience, 
    J.MaxExperience, 
    J.PostDate, 
    J.JobType, 
    J.CurrencyType, 
    J.JobMode, 
    J.Description, 
    J.IsActive, 
    J.urgentRequirement, 
    J.MaxExperienceMonth, 
    J.MinExperienceMonth, 
    (SELECT Value FROM dbo.Table_Country_State_City WHERE Category_Id = J.Country AND Category_Name = 'Country') AS Country_Home, 
    (SELECT Value FROM dbo.Table_Country_State_City WHERE Category_Id = J.State AND Category_Name = 'State') AS State_Home,
    (SELECT Value FROM dbo.Table_Country_State_City WHERE Category_Id = J.City AND Category_Name = 'City') AS City_Home
FROM dbo.Table_Jobs AS J 
INNER JOIN dbo.Table_MasterDetails AS Mst1 ON J.JobType = Mst1.Id 
INNER JOIN dbo.Table_MasterDetails AS Mst2 ON J.CurrencyType = Mst2.Id 
INNER JOIN dbo.Table_MasterDetails AS Mst3 ON J.JobMode = Mst3.Id
WHERE J.is_Delete = 0;
GO
