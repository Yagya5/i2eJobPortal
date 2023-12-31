/****** Object:  Table [dbo].[Table_AppliedJobs]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_AppliedJobs]') AND type in (N'U'))
DROP TABLE [dbo].[Table_AppliedJobs]
GO
/****** Object:  Table [dbo].[Table_AppliedJobs]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_AppliedJobs](
	[AppliedJobId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[JobId] [int] NULL,
	[DateTime] [datetime] NULL,
	[Status] [int] NULL,
	[Round] [int] NULL,
	[Table_EducationalDetails_Id] [int] NULL,
	[JobType] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[AppliedJobId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
