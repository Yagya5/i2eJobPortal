/****** Object:  StoredProcedure [dbo].[spGetCity]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetCity]
GO
/****** Object:  StoredProcedure [dbo].[spGetCity]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spGetCity]
@State nvarchar(50)
as
begin
 select Value from Table_Country_State_City where 
	Ref_ID = (select Category_Id from Table_Country_State_City where Value = @State)
	and Category_Name = 'City';  
end
GO
