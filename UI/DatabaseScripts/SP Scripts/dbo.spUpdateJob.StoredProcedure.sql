/****** Object:  StoredProcedure [dbo].[spUpdateJob]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spUpdateJob]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateJob]    Script Date: 18-08-2023 14:03:07 ******/
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
    @Location NVARCHAR(255)
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
        Location = @Location
    WHERE
        JobId = @JobId;
END;
GO
