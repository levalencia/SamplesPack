﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(KeepOnTrack.Startup))]

namespace KeepOnTrack {
  public partial class Startup {

    public void Configuration(IAppBuilder app)
    {
      ConfigureAuth(app);
    }

  }
}