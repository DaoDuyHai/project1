using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ThangLoiPrinting.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuoteHandledByUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HandledByUserId",
                table: "Quotes",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Quotes",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_HandledByUserId",
                table: "Quotes",
                column: "HandledByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Quotes_Users_HandledBy",
                table: "Quotes",
                column: "HandledByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Quotes_Users_HandledBy",
                table: "Quotes");

            migrationBuilder.DropIndex(
                name: "IX_Quotes_HandledByUserId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "HandledByUserId",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Quotes");
        }
    }
}
