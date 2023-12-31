/****** Object:  Table [dbo].[Table_AuditLogins]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_AuditLogins]') AND type in (N'U'))
DROP TABLE [dbo].[Table_AuditLogins]
GO
/****** Object:  Table [dbo].[Table_AuditLogins]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_AuditLogins](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[LoginTimeStamp] [datetime] NOT NULL,
 CONSTRAINT [PK_Table_AuditLogins] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
