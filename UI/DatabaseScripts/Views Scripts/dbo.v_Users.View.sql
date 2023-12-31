/****** Object:  View [dbo].[v_Users]    Script Date: 06-09-2023 15:51:24 ******/
DROP VIEW [dbo].[v_Users]
GO
/****** Object:  View [dbo].[v_Users]    Script Date: 06-09-2023 15:51:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



 CREATE view [dbo].[v_Users]
  as
  select UserId, FirstName, LastName, Email, Password, Gender, BirthDate, PhoneNumber, State, City, Address, ProfilePicture,  RoleId, Value as RoleName,  Is_Active
  from Table_Users
  inner join Table_MasterDetails
  on Table_Users.RoleId = Table_MasterDetails.Id
GO
