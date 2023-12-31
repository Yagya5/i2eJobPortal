/****** Object:  View [dbo].[v_AuditedLogins]    Script Date: 06-09-2023 15:51:24 ******/
DROP VIEW [dbo].[v_AuditedLogins]
GO
/****** Object:  View [dbo].[v_AuditedLogins]    Script Date: 06-09-2023 15:51:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE view [dbo].[v_AuditedLogins]
as
select Table_AuditLogins.Id, FirstName, LastName, Email, UserId, Value as Role, LoginTimeStamp
from Table_AuditLogins
inner join Table_MasterDetails
on Table_AuditLogins.RoleId = Table_MasterDetails.Id
GO
