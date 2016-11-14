using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IdentityTokenService.Models
{
  public class ServiceRequest
  {
    public string token { get; set; }
    public string serviceUserName { get; set; }
    public string password { get; set; }
  }
}