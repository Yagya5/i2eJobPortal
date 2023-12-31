/****** Object:  StoredProcedure [dbo].[spUpdateJob]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spUpdateJob]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateJob]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spUpdateJob]
    @JobId INT,
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
	@urgentRequirement BIT,
	@MaxExperienceMonth INT,
	@MinExperienceMonth INT,
	@City INT,
	@Country INT,
	@State INT
    
AS
BEGIN
    UPDATE Table_Jobs
    SET
        JobType = @JobType,
        JobTitle = @JobTitle,
        DepartmentName = @DepartmentName,
        Salary = @Salary,
        CurrencyType = @CurrencyType,
        JobMode = @JobMode,
        MinExperience = @MinExperience,
        MaxExperience = @MaxExperience,
        Description = @Description,
        IsActive = @IsActive,
		urgentRequirement= @urgentRequirement,
		MaxExperienceMonth= @MaxExperienceMonth,
		MinExperienceMonth= @MinExperienceMonth,
	    City= @City,
	    Country= @Country,
	    State= @State
		
    WHERE
        JobId = @JobId;
END;
GO
