/****** Object:  StoredProcedure [dbo].[spGetState]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetState]
GO
/****** Object:  StoredProcedure [dbo].[spGetState]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spGetState]
@Country nvarchar(50)
as
begin
 select Value from Table_Country_State_City where
	Ref_ID = (select Category_Id from Table_Country_State_City where Value = @Country)
	and Category_Name = 'State' ;  --List State from India
end
GO
