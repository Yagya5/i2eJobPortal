/****** Object:  StoredProcedure [dbo].[spGetCountry]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetCountry]
GO
/****** Object:  StoredProcedure [dbo].[spGetCountry]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spGetCountry]
as
begin
 select Value from Table_Country_State_City where Category_Name = 'Country';
end
GO
