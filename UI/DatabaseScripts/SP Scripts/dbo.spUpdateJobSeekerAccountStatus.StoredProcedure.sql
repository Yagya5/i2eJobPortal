/****** Object:  StoredProcedure [dbo].[spUpdateJobSeekerAccountStatus]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spUpdateJobSeekerAccountStatus]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateJobSeekerAccountStatus]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[spUpdateJobSeekerAccountStatus]
	@Is_Active bit,
	@Is_Deleted bit,
	@UserId int
    
AS
BEGIN Try
    Update Table_Users set Is_Active = @Is_Active, Is_Deleted = @Is_Deleted
	where UserId = @UserId;

	Select 'Update Sucessfully' as Response,
	FirstName, LastName, Email, Gender, BirthDate,
	PhoneNumber, State, City, Address, ProfilePicture, Is_Active
	from Table_Users where UserId = @UserId;
END Try
begin catch
	select ERROR_MESSAGE() as Response
end catch
GO
