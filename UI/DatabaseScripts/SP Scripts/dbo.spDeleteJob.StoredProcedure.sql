/****** Object:  StoredProcedure [dbo].[spDeleteJob]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spDeleteJob]
GO
/****** Object:  StoredProcedure [dbo].[spDeleteJob]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spDeleteJob]
    @JobId INT
AS
BEGIN
    
    UPDATE Table_Jobs
    SET is_Delete = 1
    WHERE JobId = @JobId;
END;
GO
