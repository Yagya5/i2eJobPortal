/****** Object:  StoredProcedure [dbo].[spUpdateUserDetails]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spUpdateUserDetails]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateUserDetails]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROC [dbo].[spUpdateUserDetails]
	@UserId int,
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Gender nvarchar(50),
	@BirthDate date,
	@PhoneNumber nvarchar(50),
	@State nvarchar(50),
	@City nvarchar(50),
	@Address nvarchar(50),
	@ProfilePicture nvarchar(100),
	@Bachelors nvarchar(100),
	@Masters nvarchar(100),
	@Skills nvarchar(100),
	@Experience nvarchar(100),
	@CoverLetter nvarchar(500),
	@Resume nvarchar(100)
    
AS
BEGIN Try
    Update Table_Users set FirstName=@FirstName, LastName=@LastName, Gender=@Gender,
	BirthDate=@BirthDate, PhoneNumber=@PhoneNumber, State=@State, City=@City,
	Address=@Address, ProfilePicture=@ProfilePicture
	where UserId = @UserId;

	Update Table_EducationalDetails set Bachelors=@Bachelors, Masters=@Masters,
	Skills=@Skills, Experience=@Experience, CoverLetter=@CoverLetter, Resume=@Resume
	where User_Id=@UserId;

	Select 'Update Sucessfully' as Response,
	UserId, FirstName, LastName, Email, Gender, BirthDate,
		PhoneNumber, State, City, Address, ProfilePicture,
		Bachelors, Masters, Skills, Experience, CoverLetter, Resume		
from Table_Users inner join Table_EducationalDetails on
		Table_Users.UserId = Table_EducationalDetails.User_Id 
		where Table_Users.UserId = @UserId;
END Try
begin catch
	select ERROR_MESSAGE() as Response
end catch
GO
