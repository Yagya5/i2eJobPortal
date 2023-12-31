ALTER TABLE [dbo].[Table_EducationalDetails] DROP CONSTRAINT [DF_DefaultValue2]
GO
ALTER TABLE [dbo].[Table_EducationalDetails] DROP CONSTRAINT [DF_DefaultValue]
GO
/****** Object:  Table [dbo].[Table_EducationalDetails]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_EducationalDetails]') AND type in (N'U'))
DROP TABLE [dbo].[Table_EducationalDetails]
GO
/****** Object:  Table [dbo].[Table_EducationalDetails]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_EducationalDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Bachelors] [int] NULL,
	[Masters] [int] NULL,
	[Skills] [nvarchar](100) NULL,
	[ExperienceInYears] [int] NULL,
	[CoverLetter] [nvarchar](500) NULL,
	[Resume] [nvarchar](100) NULL,
	[User_Id] [int] NOT NULL,
	[ExperienceInMonths] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Table_EducationalDetails] ADD  CONSTRAINT [DF_DefaultValue]  DEFAULT ((0)) FOR [ExperienceInYears]
GO
ALTER TABLE [dbo].[Table_EducationalDetails] ADD  CONSTRAINT [DF_DefaultValue2]  DEFAULT ((0)) FOR [ExperienceInMonths]
GO
