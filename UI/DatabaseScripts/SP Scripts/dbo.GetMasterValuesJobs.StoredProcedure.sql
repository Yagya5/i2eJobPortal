/****** Object:  StoredProcedure [dbo].[GetMasterValuesJobs]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[GetMasterValuesJobs]
GO
/****** Object:  StoredProcedure [dbo].[GetMasterValuesJobs]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetMasterValuesJobs]
AS
BEGIN
    SELECT Id, Category, Value
    FROM Table_MasterDetails
    WHERE Category IN ('Job Type', 'Job Mode', 'Currency');
END;
GO
