/****** Object:  StoredProcedure [dbo].[spGetJobs]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetJobs]
GO
/****** Object:  StoredProcedure [dbo].[spGetJobs]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
	CREATE PROCEDURE [dbo].[spGetJobs]
AS
BEGIN
    SELECT * FROM dbo.Table_Jobs where is_Delete=0;
END;
GO
