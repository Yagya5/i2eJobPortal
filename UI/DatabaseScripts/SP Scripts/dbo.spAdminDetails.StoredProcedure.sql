/****** Object:  StoredProcedure [dbo].[spAdminDetails]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spAdminDetails]
GO
/****** Object:  StoredProcedure [dbo].[spAdminDetails]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[spAdminDetails]
@UserId int
as
begin
 SELECT 
    TU.UserId, TU.FirstName, TU.LastName, TU.Email, TU.Gender, TU.BirthDate,
    TU.PhoneNumber, TU.Address, TU.ProfilePicture,
    City.[Value] as City, State.[Value] as State, Country.[Value] as Country
FROM 
    Table_Users TU

LEFT JOIN 
    Table_Country_State_City City ON TU.City = City.Category_Id AND City.Category_Name = 'City'
LEFT JOIN 
    Table_Country_State_City State ON TU.State = State.Category_Id AND State.Category_Name = 'State' 
LEFT JOIN 
    Table_Country_State_City Country ON TU.Country = Country.Category_Id AND Country.Category_Name = 'Country' 

WHERE 
    TU.UserId = @UserId;
end

GO
