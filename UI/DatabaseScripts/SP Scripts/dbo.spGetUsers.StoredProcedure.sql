/****** Object:  StoredProcedure [dbo].[spGetUsers]    Script Date: 18-08-2023 14:03:07 ******/
DROP PROCEDURE [dbo].[spGetUsers]
GO
/****** Object:  StoredProcedure [dbo].[spGetUsers]    Script Date: 18-08-2023 14:03:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spGetUsers]
as
begin
select * from Table_Users
end
GO
