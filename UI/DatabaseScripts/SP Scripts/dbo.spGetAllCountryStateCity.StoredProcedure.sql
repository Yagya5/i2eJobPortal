/****** Object:  StoredProcedure [dbo].[spGetAllCountryStateCity]    Script Date: 06-09-2023 15:42:38 ******/
DROP PROCEDURE [dbo].[spGetAllCountryStateCity]
GO
/****** Object:  StoredProcedure [dbo].[spGetAllCountryStateCity]    Script Date: 06-09-2023 15:42:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetAllCountryStateCity]
AS
BEGIN
    SELECT *
    FROM Table_Country_State_City;
END;
GO
