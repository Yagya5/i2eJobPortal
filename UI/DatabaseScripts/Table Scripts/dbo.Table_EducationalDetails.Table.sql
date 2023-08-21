/****** Object:  Table [dbo].[Table_EducationalDetails]    Script Date: 18-08-2023 13:50:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_EducationalDetails]') AND type in (N'U'))
DROP TABLE [dbo].[Table_EducationalDetails]
GO
/****** Object:  Table [dbo].[Table_EducationalDetails]    Script Date: 18-08-2023 13:50:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_EducationalDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Bachelors] [nvarchar](100) NULL,
	[Masters] [nvarchar](100) NULL,
	[Skills] [nvarchar](100) NULL,
	[Experience] [int] NULL,
	[CoverLetter] [nvarchar](500) NULL,
	[Resume] [nvarchar](100) NULL,
	[User_Id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
