/****** Object:  StoredProcedure [dbo].[spGet_Registered_JobSeekers]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spGet_Registered_JobSeekers]
GO
/****** Object:  StoredProcedure [dbo].[spGet_Registered_JobSeekers]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[spGet_Registered_JobSeekers]
as
begin
select UserId, FirstName, LastName, Email, Gender, BirthDate,
		PhoneNumber, State, City, Address, ProfilePicture, Is_Active
from Table_Users where RoleID=3;
end
GO
