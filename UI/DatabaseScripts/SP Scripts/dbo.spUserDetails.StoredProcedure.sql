/****** Object:  StoredProcedure [dbo].[spUserDetails]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spUserDetails]
GO
/****** Object:  StoredProcedure [dbo].[spUserDetails]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spUserDetails]
@UserId int
as
begin
 select UserId, FirstName, LastName, Email, Gender, BirthDate,
		PhoneNumber, State, City, Address, ProfilePicture,
		Bachelors, Masters, Skills, Experience, CoverLetter, Resume		
		from Table_Users inner join Table_EducationalDetails on
		Table_Users.UserId = Table_EducationalDetails.User_Id 
		where Table_Users.UserId = @UserId;
end
GO
