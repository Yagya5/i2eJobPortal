/****** Object:  StoredProcedure [dbo].[spUpdateUserDetails]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spUpdateUserDetails]
GO
/****** Object:  StoredProcedure [dbo].[spUpdateUserDetails]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[spUpdateUserDetails]
	@UserId int,
	@FirstName nvarchar(50),
	@LastName nvarchar(50),
	@Gender nvarchar(50),
	@BirthDate date,
	@PhoneNumber nvarchar(50),
	@Country nvarchar(50),
	@State nvarchar(50),
	@City nvarchar(50),
	@Address nvarchar(50),
	@ProfilePicture nvarchar(100),
	@Bachelors nvarchar(100),
	@Masters nvarchar(100),
	@Skills nvarchar(100),
	@ExperienceInYears nvarchar(100),
	@ExperienceInMonths nvarchar(100),
	@CoverLetter nvarchar(500),
	@Resume nvarchar(100)
    
AS
BEGIN Try
    Update Table_Users set FirstName=@FirstName, LastName=@LastName, Gender=@Gender,
	BirthDate=@BirthDate, PhoneNumber=@PhoneNumber, 
	Country=(select Category_Id from Table_Country_State_City where Value =@Country),
	State=(select Category_Id from Table_Country_State_City where Value =@State),
	City=(select Category_Id from Table_Country_State_City where Value =@City),
	Address=@Address, ProfilePicture=@ProfilePicture
	where UserId = @UserId;

	Update Table_EducationalDetails set
	Bachelors=(select Id from Table_MasterDetails where Value = @Bachelors),
	Masters=(select Id from Table_MasterDetails where Value = @Masters),
	Skills=@Skills, ExperienceInYears=@ExperienceInYears,ExperienceInMonths=@ExperienceInMonths,
	CoverLetter=@CoverLetter, Resume=@Resume
	where User_Id=@UserId;

	select 'Update Sucessfully' as Response,
    TU.UserId, TU.FirstName, TU.LastName, TU.Email, TU.Gender, TU.BirthDate,
    TU.PhoneNumber, TU.Address, TU.ProfilePicture,
    TED.Bachelors, TED.Masters, TED.Skills, TED.ExperienceInYears,
	TED.ExperienceInMonths, TED.CoverLetter, TED.Resume,
    City.Value as City, state.Value as State, country.Value as Country
	from 
		Table_Users TU
	inner join 
		Table_EducationalDetails TED on TU.UserId = TED.User_Id 
	left join 
		Table_Country_State_City City on TU.City = City.Category_Id and City.Category_Name = 'City'
	left join 
		Table_Country_State_City state on TU.State = State.Category_Id and State.Category_Name = 'State' 
	left join 
		Table_Country_State_City Country on TU.Country = Country.Category_Id and Country.Category_Name = 'Country' 
	where 
		TU.UserId = @UserId;
END Try
begin catch
	select ERROR_MESSAGE() as Response
end catch
GO
