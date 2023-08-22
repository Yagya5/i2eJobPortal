/****** Object:  StoredProcedure [dbo].[spCreateJob]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spCreateJob]
GO
/****** Object:  StoredProcedure [dbo].[spCreateJob]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spCreateJob]
    @JobType INT,
    @JobTitle NVARCHAR(255),
    @DepartmentName NVARCHAR(255),
    @Salary INT,
    @CurrencyType INT,
    @JobMode INT,
    @MinExperience INT,
    @MaxExperience INT,
    @Description NVARCHAR(MAX),
    @IsActive BIT,
    @PostDate DATETIME,
    @Location NVARCHAR(255)
AS
BEGIN
    INSERT INTO dbo.Table_Jobs (JobType, JobTitle, DepartmentName, Salary, CurrencyType, JobMode, MinExperience, MaxExperience, Description, IsActive, PostDate, Location)
    VALUES (@JobType, @JobTitle, @DepartmentName, @Salary, @CurrencyType, @JobMode, @MinExperience, @MaxExperience, @Description, @IsActive, @PostDate, @Location);
END;
GO
