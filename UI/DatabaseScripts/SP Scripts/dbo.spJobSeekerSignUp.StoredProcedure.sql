/****** Object:  StoredProcedure [dbo].[spJobSeekerSignUp]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spJobSeekerSignUp]
GO
/****** Object:  StoredProcedure [dbo].[spJobSeekerSignUp]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[spJobSeekerSignUp]
@FirstName nvarchar(50),
@LastName nvarchar(50),
@Email nvarchar(50),
@Password nvarchar(50)
as
begin try
begin tran
 insert into Table_Users values (@FirstName,@LastName,@Email,@Password,null,null,null,null,null,null,null,3,1,1)
 commit tran
end try
begin catch
   print 'Sign Up Failed. This Email is already registered !!!'
   rollback tran   
end catch
GO
