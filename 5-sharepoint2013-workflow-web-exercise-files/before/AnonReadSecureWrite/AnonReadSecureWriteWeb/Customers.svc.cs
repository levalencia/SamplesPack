//------------------------------------------------------------------------------
// <copyright file="WebDataService.svc.cs" company="Microsoft">
//     Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//------------------------------------------------------------------------------
using System;
using System.Collections.Generic;
using System.Data.Services;
using System.Data.Services.Common;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Web;

namespace AnonReadSecureWriteWeb {
  [ServiceBehavior(IncludeExceptionDetailInFaults = true)]
  public class Customers : DataService<CustomerContext> {
    // This method is called only once to initialize service-wide policies.
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
