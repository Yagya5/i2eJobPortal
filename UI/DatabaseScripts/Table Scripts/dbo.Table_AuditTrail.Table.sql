/****** Object:  Table [dbo].[Table_AuditTrail]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_AuditTrail]') AND type in (N'U'))
DROP TABLE [dbo].[Table_AuditTrail]
GO
/****** Object:  Table [dbo].[Table_AuditTrail]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_AuditTrail](
	[AuditId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NULL,
	[TaskId] [int] NULL,
	[OldValue] [nvarchar](50) NULL,
	[NewValue] [nvarchar](50) NULL,
	[DataField] [nvarchar](50) NULL,
	[Module] [nvarchar](50) NULL,
	[Url] [nvarchar](50) NULL,
	[Action] [nvarchar](50) NULL,
	[DateTimeStamp] [datetime] NULL,
 CONSTRAINT [PK_Table_AuditTrail] PRIMARY KEY CLUSTERED 
(
	[AuditId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
