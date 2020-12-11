using Microsoft.EntityFrameworkCore.Migrations;

namespace GenshinSchedule.SyncServer.Migrations
{
    public partial class AddUserDiscordId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DiscordUserId",
                table: "Users",
                type: "numeric(20,0)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_DiscordUserId",
                table: "Users",
                column: "DiscordUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_DiscordUserId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DiscordUserId",
                table: "Users");
        }
    }
}
