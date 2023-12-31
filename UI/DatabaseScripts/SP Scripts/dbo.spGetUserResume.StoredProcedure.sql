/****** Object:  StoredProcedure [dbo].[spGetUserResume]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetUserResume]
GO
/****** Object:  StoredProcedure [dbo].[spGetUserResume]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[spGetUserResume]
	@UserId int,
	@Response bit = null OUTPUT
AS
BEGIN Try    

Set @Response = (Select Case when [Resume] is null then 1 Else 0 End as Response from [dbo].[Table_EducationalDetails] Where User_Id = @UserId);
	
END Try
begin catch
	select ERROR_MESSAGE() as Response
end catch
GO
