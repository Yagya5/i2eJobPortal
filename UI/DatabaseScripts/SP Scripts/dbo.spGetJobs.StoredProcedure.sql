/****** Object:  StoredProcedure [dbo].[spGetJobs]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spGetJobs]
GO
/****** Object:  StoredProcedure [dbo].[spGetJobs]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	CREATE PROCEDURE [dbo].[spGetJobs]
AS
BEGIN
    SELECT * FROM dbo.Table_Jobs;
END;
GO
