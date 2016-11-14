using System.Data.Entity.Migrations;

namespace CustomerService.Migrations {

  internal sealed class Configuration : DbMigrationsConfiguration<CustomerService.CustomerContext> {
    public Configuration() {
      AutomaticMigrationsEnabled = false;
    }
  }
}
