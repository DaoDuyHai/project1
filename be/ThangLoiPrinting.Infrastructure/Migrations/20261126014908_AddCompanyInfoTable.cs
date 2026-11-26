using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThangLoiPrinting.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCompanyInfoTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CompanyInfo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Slogan = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Hotline = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    FacebookUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    YoutubeUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Copyright = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyInfo", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CompanyInfo");
        }
    }
}
