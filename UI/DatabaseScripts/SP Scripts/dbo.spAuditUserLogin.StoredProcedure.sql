/****** Object:  StoredProcedure [dbo].[spAuditUserLogin]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spAuditUserLogin]
GO
/****** Object:  StoredProcedure [dbo].[spAuditUserLogin]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spAuditUserLogin]
@FirstName nvarchar(50),
@LastName nvarchar(50),
@Email nvarchar(50),
@UserId int,
@RoleId int
as
begin
insert into Table_AuditLogins values (@FirstName, @LastName, @Email, @UserId, @RoleId, GETDATE())
end
GO
