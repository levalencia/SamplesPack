//------------------------------------------------------------------------------
// <copyright file="WebDataService.svc.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------

using System.Data.Services;
using System.Data.Services.Common;
using System.ServiceModel;

namespace CustomerService {
  [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
  public class Customers : DataService<CustomerContext> {
    public static void InitializeService(DataServiceConfiguration config) {
#if DEBUG
      config.UseVerboseErrors = true;
#endif
      config.SetEntitySetAccessRule("*", EntitySetRights.All);
      config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V3;
    }

    protected override CustomerContext CreateDataSource() {
      CustomerContextFactory factory = new CustomerContextFactory();
      CustomerContext context = factory.Create();
      return context;
    }
  }
}
