/****** Object:  View [dbo].[v_AuditTrail]    Script Date: 06-09-2023 15:51:24 ******/
DROP VIEW [dbo].[v_AuditTrail]
GO
/****** Object:  View [dbo].[v_AuditTrail]    Script Date: 06-09-2023 15:51:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE view [dbo].[v_AuditTrail]
as
select t.AuditId, t.UserId, CONCAT(u.FirstName,' ', u.LastName) AS FullName, t.TaskId, t.OldValue, t.NewValue, t.DataField, t.Module, t.Url, t.Action, t.DateTimeStamp
from Table_AuditTrail as t
inner join Table_Users as u
on t.UserId = u.UserId
GO
