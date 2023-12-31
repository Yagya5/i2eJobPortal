/****** Object:  Table [dbo].[Table_Users]    Script Date: 06-09-2023 15:48:31 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_Users]') AND type in (N'U'))
DROP TABLE [dbo].[Table_Users]
GO
/****** Object:  Table [dbo].[Table_Users]    Script Date: 06-09-2023 15:48:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[Gender] [nvarchar](50) NULL,
	[BirthDate] [date] NULL,
	[PhoneNumber] [nvarchar](50) NULL,
	[State] [int] NULL,
	[City] [int] NULL,
	[Address] [nvarchar](100) NULL,
	[ProfilePicture] [nvarchar](100) NULL,
	[RoleId] [int] NULL,
	[Is_Active] [bit] NULL,
	[Is_CreatedBySignUp] [bit] NULL,
	[Country] [int] NULL,
	[Is_Deleted] [bit] NULL,
 CONSTRAINT [PK_Table_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
