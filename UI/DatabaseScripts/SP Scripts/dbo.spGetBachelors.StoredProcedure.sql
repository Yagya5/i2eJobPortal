/****** Object:  StoredProcedure [dbo].[spGetBachelors]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetBachelors]
GO
/****** Object:  StoredProcedure [dbo].[spGetBachelors]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[spGetBachelors]
as
begin
 select Value from Table_MasterDetails where Category = 'Bachelors';
end
GO
