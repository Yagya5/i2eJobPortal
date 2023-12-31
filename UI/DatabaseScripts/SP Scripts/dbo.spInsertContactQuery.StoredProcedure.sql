/****** Object:  StoredProcedure [dbo].[spInsertContactQuery]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spInsertContactQuery]
GO
/****** Object:  StoredProcedure [dbo].[spInsertContactQuery]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[spInsertContactQuery]
@FirstName nvarchar(50),
@LastName nvarchar(50),
@Email nvarchar(50),
@Phone nvarchar(50),
@Message nvarchar(MAX),
@IPAddress nvarchar(50)
as
begin
insert into Table_ContactQueries values (@FirstName, @LastName, @Email, @Phone, @Message, @IPAddress, GETDATE())
end
GO
