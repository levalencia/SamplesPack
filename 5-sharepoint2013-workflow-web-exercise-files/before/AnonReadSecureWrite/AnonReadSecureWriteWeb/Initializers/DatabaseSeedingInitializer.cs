using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace AnonReadSecureWriteWeb.Initializers {
  public class DatabaseSeedingInitializer : DropCreateDatabaseAlways<CustomerContext> {
    protected override void Seed(CustomerContext context) {
      Debug.WriteLine("Seeding database with initial data...");

      Debug.WriteLine(".. seeding customers");
      context.Customers.AddOrUpdate(c => c.Id,
          new Customer() {
            Id = 1,
            FirstName = "Janice",
            LastName = "Galvin",
            Email = "janice.galvin@contoso.com"
          }
        );
      context.Customers.AddOrUpdate(c => c.Id,
          new Customer() {
            Id = 2,
            FirstName = "Rob",
            LastName = "Walters",
            Email = "rob.walters@contoso.com"
          }
        );
      context.Customers.AddOrUpdate(c => c.Id,
          new Customer() {
            Id = 3,
            FirstName = "Ken",
            LastName = "Sanchez",
            Email = "ken.sanchez@contoso.com"
          }
        );
    }
  }
}