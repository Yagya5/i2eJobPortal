/****** Object:  StoredProcedure [dbo].[spGetMasters]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetMasters]
GO
/****** Object:  StoredProcedure [dbo].[spGetMasters]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spGetMasters]
as
begin
 select Value from Table_MasterDetails where Category = 'Masters';
end
GO
