using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web;

namespace VendorLookupWeb
{
    public class RequestHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            WebClient wclient = new WebClient();
            wclient.Credentials = new NetworkCredential("[user]", "[password]");
       
            string resourceUrl = "https://[saphost]:[port]/sap/opu/odata/sap/Z_OFFICE_APPS_DEMOS_SRV/VendorCollection";
            
            string id = context.Request.QueryString["id"];
            if (id == null)
            {
                resourceUrl += "/";
            }
            else
            {
                resourceUrl += "('" + id + "')"; 
            }

            ServicePointManager.ServerCertificateValidationCallback = ValidateServerCertificate;

            // The resource URL for NetWeaver Gateway
            

            // The specific resource and options we need.
            string urlOptions = "?$format=json";

            // Make a request to the resource and capture its result.
            string response = wclient.DownloadString(resourceUrl + urlOptions);

            // Set the content-type so that libraries like jQuery can automatically parse the result.
            //context.Response.ContentType = "application/json";

            // Relay the API response back down to the client.
            context.Response.Write(response);

        }

        public static bool ValidateServerCertificate(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            //check certificate
            certificate.Subject.Contains("[server].[domain]");
            return true;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

    }
}