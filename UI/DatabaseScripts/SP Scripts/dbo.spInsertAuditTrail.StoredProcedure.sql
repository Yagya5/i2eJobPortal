/****** Object:  StoredProcedure [dbo].[spInsertAuditTrail]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spInsertAuditTrail]
GO
/****** Object:  StoredProcedure [dbo].[spInsertAuditTrail]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spInsertAuditTrail]
@UserId int = null,
@TaskId int = null,
@OldValue nvarchar(50) = null,
@NewValue nvarchar(50) = null,
@DataField nvarchar(50) = null,
@Module nvarchar(50) = null,
@Url nvarchar(50) = null,
@Action nvarchar(50) = null,
@DateTimeStamp datetime = null
as
begin try

begin tran
insert into Table_AuditTrail values (@UserId, @TaskId, @OldValue, @NewValue, @DataField, @Module, @Url, @Action, GETDATE())
commit tran

end try
begin catch


print error_message()
rollback tran

end catch
GO
