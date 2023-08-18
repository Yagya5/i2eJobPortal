/****** Object:  StoredProcedure [dbo].[spAdminDetails]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spAdminDetails]
GO
/****** Object:  StoredProcedure [dbo].[spAdminDetails]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spAdminDetails]
@UserId int
as
begin
 select UserId, FirstName, LastName, Email, Gender, BirthDate,
		PhoneNumber, State, City, Address, ProfilePicture
		from Table_Users  
		where UserId = @UserId;
end

GO
