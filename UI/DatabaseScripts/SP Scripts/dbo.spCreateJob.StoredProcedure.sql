/****** Object:  StoredProcedure [dbo].[spCreateJob]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spCreateJob]
GO
/****** Object:  StoredProcedure [dbo].[spCreateJob]    Script Date: 06-09-2023 15:42:38 ******/
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
	@urgentRequirement BIT,
	@MaxExperienceMonth INT,
	@MinExperienceMonth INT,
	@City INT,
	@Country INT,
	@State INT
    
AS
BEGIN
    INSERT INTO dbo.Table_Jobs (JobType, JobTitle, DepartmentName, Salary, CurrencyType, JobMode, MinExperience, MaxExperience, Description, IsActive, PostDate, urgentRequirement, MaxExperienceMonth, MinExperienceMonth,City,Country,State,is_Delete)
    VALUES (@JobType, @JobTitle, @DepartmentName, @Salary, @CurrencyType, @JobMode, @MinExperience, @MaxExperience, @Description, @IsActive, @PostDate, @urgentRequirement, @MaxExperienceMonth, @MinExperienceMonth,@City,@Country,@State,0);
END;
GO
