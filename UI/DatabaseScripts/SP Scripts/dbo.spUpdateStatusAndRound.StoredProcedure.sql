/****** Object:  StoredProcedure [dbo].[spUpdateStatusAndRound]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spUpdateStatusAndRound]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateStatusAndRound]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spUpdateStatusAndRound]
@AppliedJobId INT,
@Status INT,
@Round INT


AS
BEGIN
    UPDATE Table_AppliedJobs
    SET
		Status = @Status,
		Round = @Round
    WHERE
        AppliedJobId=@AppliedJobId;
END;

GO
