using IdentityTokenService.Models;
using Microsoft.Exchange.WebServices.Auth.Validation;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace IdentityTokenService.Controllers
{
  public class IdentityTokenController : ApiController
  {
    static Dictionary<string, string> idCache;

    // Static constructor
    static IdentityTokenController()
    {
      idCache = new Dictionary<string, string>();
    }

    public ServiceResponse PostIdentityToken(ServiceRequest serviceRequest)
    {
      ServiceResponse response = new ServiceResponse();

      AppIdentityToken token = (AppIdentityToken)AuthToken.Parse(serviceRequest.token);

      try
      {
        // Validate the user identity token. 
        token.Validate(new Uri(Config.Audience));
        // If the token is invalid, Validate will throw an exception. If the service reaches
        // this line, the token is valid.
        response.isValidToken = true;

        // Check to see if the uniqued ID is in the cache.
        if (idCache.ContainsKey(token.UniqueUserIdentification))
        {
          response.isKnown = true;
          response.message = string.Format(
            "User ID found in cache. Response returned for {0} without requesting credentials.",
            idCache[token.UniqueUserIdentification]);
        }
        // If the unique ID is not found, check to see if the request contains credentials.
        else if (!string.IsNullOrEmpty(serviceRequest.serviceUserName) && !string.IsNullOrEmpty(serviceRequest.password))
        {
          response.isKnown = true;
          idCache.Add(token.UniqueUserIdentification, serviceRequest.serviceUserName);
          response.message = string.Format("Unique ID cached for {0}.", serviceRequest.serviceUserName);
        }
        else
        {
          response.isKnown = false;
          response.message = "Unknown identifier.";
        }
      }
      catch (TokenValidationException ex)
      {
        response.isKnown = false;
        response.isValidToken = false;
        response.message = ex.Message;
      }

      return response;
    }
  }
}
