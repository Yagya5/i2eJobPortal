/****** Object:  StoredProcedure [dbo].[spDeleteJob]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spDeleteJob]
GO
/****** Object:  StoredProcedure [dbo].[spDeleteJob]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spDeleteJob]
    @JobId INT
AS
BEGIN
    
    DELETE FROM dbo.Table_Jobs
    WHERE JobId = @JobId;
END;
GO
