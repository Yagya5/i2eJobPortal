/****** Object:  StoredProcedure [dbo].[spAppliedJobdata]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spAppliedJobdata]
GO
/****** Object:  StoredProcedure [dbo].[spAppliedJobdata]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAppliedJobdata]
 @UserId int,
 @JobId int
AS
BEGIN
 insert into [dbo].[Table_AppliedJobs](UserId,JobId,DateTime) Values(@UserId,@JobId,GetDate())
END;
GO
