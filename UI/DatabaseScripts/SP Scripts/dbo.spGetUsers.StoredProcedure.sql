/****** Object:  StoredProcedure [dbo].[spGetUsers]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetUsers]
GO
/****** Object:  StoredProcedure [dbo].[spGetUsers]    Script Date: 06-09-2023 15:42:38 ******/
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
