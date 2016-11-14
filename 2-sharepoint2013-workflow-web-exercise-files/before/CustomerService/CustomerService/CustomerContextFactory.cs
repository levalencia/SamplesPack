using System.Configuration;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;

namespace CustomerService {
  public class CustomerContextFactory : IDbContextFactory<CustomerContext> {
    public CustomerContext Create() {
      // get connection string form web.config
      string connectionString = ConfigurationManager.ConnectionStrings["CustomerData"].ToString();

      // create DB connection
      SqlConnection sqlConnection = new SqlConnection(connectionString);

      return new CustomerContext(sqlConnection);
    }
  }
}