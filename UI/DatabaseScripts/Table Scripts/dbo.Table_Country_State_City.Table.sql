/****** Object:  Table [dbo].[Table_Country_State_City]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_Country_State_City]') AND type in (N'U'))
DROP TABLE [dbo].[Table_Country_State_City]
GO
/****** Object:  Table [dbo].[Table_Country_State_City]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_Country_State_City](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Category_Id] [int] NOT NULL,
	[Category_Name] [nvarchar](100) NOT NULL,
	[Value] [nvarchar](100) NOT NULL,
	[Ref_ID] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
