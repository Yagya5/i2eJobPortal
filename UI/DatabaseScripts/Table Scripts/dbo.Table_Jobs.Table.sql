/****** Object:  Table [dbo].[Table_Jobs]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_Jobs]') AND type in (N'U'))
DROP TABLE [dbo].[Table_Jobs]
GO
/****** Object:  Table [dbo].[Table_Jobs]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_Jobs](
	[JobId] [int] IDENTITY(1,1) NOT NULL,
	[JobType] [int] NULL,
	[JobTitle] [varchar](255) NULL,
	[DepartmentName] [varchar](255) NULL,
	[Salary] [int] NULL,
	[CurrencyType] [int] NULL,
	[JobMode] [int] NULL,
	[MinExperience] [int] NULL,
	[MaxExperience] [int] NULL,
	[Description] [varchar](max) NULL,
	[IsActive] [bit] NULL,
	[PostDate] [datetime] NULL,
	[urgentRequirement] [bit] NULL,
	[MaxExperienceMonth] [int] NULL,
	[MinExperienceMonth] [int] NULL,
	[City] [int] NULL,
	[Country] [int] NULL,
	[State] [int] NULL,
	[is_Delete] [bit] NULL,
	[Location] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[JobId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
