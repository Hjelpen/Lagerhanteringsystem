namespace LagerHantering.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class databaseupdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Articles", "Name", c => c.String());
            DropColumn("dbo.Articles", "ArticleName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Articles", "Name", c => c.String());
            DropColumn("dbo.Articles", "ArticleName");
        }
    }
}
