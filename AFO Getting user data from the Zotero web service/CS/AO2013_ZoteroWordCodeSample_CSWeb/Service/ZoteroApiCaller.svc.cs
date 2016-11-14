using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Activation;
using System.Net;
using System.Web;
using System.Text;
using System.IO;

namespace AO2013_ZoteroWordCodeSample_CSWeb.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the 
    //class name "ZoteroApiCaller" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please 
    //select ZoteroApiCaller.svc or ZoteroApiCaller.svc.cs at the Solution Explorer
    //and start debugging.
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple,    
        InstanceContextMode = InstanceContextMode.Single)]
    //[AspNetCompatibilityRequirements(RequirementsMode = 
    //    AspNetCompatibilityRequirementsMode.Allowed)]
    public class ZoteroApiCaller : IZoteroApiCaller
    {
        /// <summary>
        /// The REST URL to handle getting all items for Zotero. This is a wrapper
        /// around Zotero's API and demonstrates how to connect with it.
        /// </summary>
        /// <param name="userId">The users Zotero ID</param>
        /// <param name="accessToken">The OAuth access token from Zotero.</param>
        /// <param name="limit">Limit to the amount of items returned.</param>
        /// <param name="style">The style (APA,CMS,MLA,etc...) the citations
        /// should be returned as.</param>
        /// <returns></returns>
        [WebGet(UriTemplate="/GetAllItems?userId={userId}&accessToken={accessToken}&limit={limit}&style={style}", 
                ResponseFormat=WebMessageFormat.Json)]
        public string GetAllItems(string userId, string accessToken, int limit = 0, string style = null)
        {
            
            // {0} = userId, {1} = accessToken
            const string urlFormat = "https://api.zotero.org/users/{0}/items?key={1}";

            var apiUrl = string.Format(urlFormat, userId, accessToken);

            if (limit > 0)
            {
                apiUrl += "&limit=" + limit.ToString();
            }

            if (style != null)
            {
                apiUrl += "&style=" + style;
            }

            apiUrl += "&format=atom";
            apiUrl += "&content=bib";
            string apiResponse = CallApi(apiUrl);

            //Make sure the browser doesn't cache.
            HttpContext.Current.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            return apiResponse;            
        }

        /// <summary>
        /// Private method to handle calling Zoteros API and getting the response.
        /// </summary>
        /// <param name="url">Zotero API URL to call</param>
        /// <returns>The response from Zotero as a string</returns>
        private String CallApi(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            
            //Next add the X-Forwarded-For header so the API we're calling knows
            //we are not the party initiating the requests.
            string xForwards = "";

            if (HttpContext.Current.Request.Headers.AllKeys.Contains("X-Forwarded-For"))
            {
                string currentXfor = HttpContext.Current.Request.Headers["X-Forwarded-For"];
                if (currentXfor.Length > 0)
                {
                    xForwards = currentXfor;
                }
            }

            if (xForwards.Length > 0)
            {
                xForwards += ",";
            }

            xForwards += HttpContext.Current.Request.UserHostAddress.ToString();
            request.Headers.Add("X-Forwarded-For", xForwards);

            //Set Zotero API Header
            HttpContext.Current.Request.Headers.Add("Zotero-API-Version", "2");

            try
            {
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                {
                    using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                    {
                        string completeResponse = reader.ReadToEnd();
                        return completeResponse;
                    }
                }
            }
            catch (WebException)
            {
                //TODO: Handle this exception following your exception handling rules.
                return null;
            }
        }
    }
}
