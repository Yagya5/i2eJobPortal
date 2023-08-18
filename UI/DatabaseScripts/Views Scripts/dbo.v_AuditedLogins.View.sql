/****** Object:  View [dbo].[v_AuditedLogins]    Script Date: 18-08-2023 13:59:35 ******/
DROP VIEW [dbo].[v_AuditedLogins]
GO
/****** Object:  View [dbo].[v_AuditedLogins]    Script Date: 18-08-2023 13:59:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[v_AuditedLogins]
as
select FirstName, LastName, Email, UserId, Value as Role, LoginTimeStamp
from Table_AuditLogins
inner join Table_MasterDetails
on Table_AuditLogins.RoleId = Table_MasterDetails.Id
GO
