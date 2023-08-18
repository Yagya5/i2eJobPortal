/****** Object:  Table [dbo].[Table_ContactUs]    Script Date: 18-08-2023 13:50:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Table_ContactUs]') AND type in (N'U'))
DROP TABLE [dbo].[Table_ContactUs]
GO
/****** Object:  Table [dbo].[Table_ContactUs]    Script Date: 18-08-2023 13:50:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_ContactUs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Table_ContactUs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
