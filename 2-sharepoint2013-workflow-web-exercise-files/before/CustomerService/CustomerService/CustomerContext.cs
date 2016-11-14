using System.Data.Entity;
using System.Data.SqlClient;

namespace CustomerService {
  public class CustomerContext : DbContext {
    public CustomerContext()
    {
    }

    public CustomerContext(SqlConnection sqlConnection)
      : base(sqlConnection, false) {
    }

    public DbSet<Customer> Customers { get; set; }
  }
}