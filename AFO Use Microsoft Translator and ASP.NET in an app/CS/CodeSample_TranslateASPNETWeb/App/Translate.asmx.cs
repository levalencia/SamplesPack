using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using CodeSample_TranslateASPNETWeb.App_Code;
using System.Collections.Specialized;
using System.Net;
using System.IO;

namespace CodeSample_TranslateASPNETWeb.App
{
    /// <summary>
    /// The Translate service has a single method, TranslateSelection.
    /// </summary>
    [WebService(Namespace = "http://CodeSample_TranslateASPNET")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class Translate : System.Web.Services.WebService
    {
        
        // Replace these constants with values for your own apps.
        // Get Client Id and Client Secret from https://datamarket.azure.com/developer/applications/
        const string clientID = "[Your client ID]";
        const string clientSecret = "[Your client secret]";

        // Makes a Web service call to the Bing Translator Web service,
        // using three parameters (word, sourcelang, and targetlang).
        [WebMethod]
        public string TranslateSelection()
        {
            // Store the URL from the incoming request and declare
            // strings to store the query and the translation result.
            string currentURL = HttpContext.Current.Request.RawUrl;
            string queryString;
            string resultWord = "No results ... ";

            try
            {
                // Check to make sure some query string variables exist.
                int indexQueryString = currentURL.IndexOf('?');
                if (indexQueryString >= 0)
                {
                    queryString = (indexQueryString < currentURL.Length - 1) ? currentURL.Substring(indexQueryString + 1) : String.Empty;

                    // Parse the query string variables into a NameValueCollection.
                    NameValueCollection queryStringCollection = HttpUtility.ParseQueryString(queryString);

                    // Get the word to translate, the source language,
                    // and the target language parameters.
                    string sourceWord = queryStringCollection["word"];
                    string sourceLang = queryStringCollection["sourcelang"];
                    string targetLang = queryStringCollection["targetlang"];

                    // Call the translate service, passing in the word to 
                    // translate, the source language, and the target language.
                    resultWord = CallTranslateService(sourceWord, sourceLang, targetLang);
                }
            }
            catch (Exception ex)
            {
                resultWord = ex.Message;
            }

            // Return the translation result to as the response
            // to the HTTP request.
            return resultWord;
        }

        // Call the Bing Translator service, passing in the word to translate, 
        // the source language, and the target language, and returning the response
        // to the calling code.
        private string CallTranslateService(string sourceWord, string sourceLang, string targetLang)
        {
            
            // Declare and initialize variables to store the
            // response from the Bing Translator service.
            string resultWord = "";
            WebResponse response = null;

            try
            {

                // Create AdmAuthentication and AdmAccessToken objects, as defined
                // in the AdminAccess.cs code file.
                // Refer obtaining AccessToken (http://msdn.microsoft.com/en-us/library/hh454950.aspx) 
                AdmAuthentication admAuth = new AdmAuthentication(clientID, clientSecret);
                AdmAccessToken admToken = admAuth.GetAccessToken();

                // Define the request to the Bing Translator service as a URL.
                string uri = "http://api.microsofttranslator.com/v2/Http.svc/Translate?text=" + 
                    System.Web.HttpUtility.UrlEncode(sourceWord) + "&from=" + sourceLang + "&to=" + targetLang;

                // Create the HTTP request object and add a custom header to the request.
                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(uri);
                httpWebRequest.Headers.Add("Authorization", String.Format("Bearer {0}", admToken.access_token));

                // Send the HTTP request to the Bing Translator Web service and
                // read the response.
                response = httpWebRequest.GetResponse();
                using (Stream stream = response.GetResponseStream())
                {
                    // Convert the response from the Translator service to a string.
                    System.Runtime.Serialization.DataContractSerializer dcs = 
                        new System.Runtime.Serialization.DataContractSerializer(Type.GetType("System.String"));
                    resultWord = (string)dcs.ReadObject(stream);
                }
            }
            catch (WebException webEx)
            {
                resultWord = webEx.Message;
            }
            catch (Exception ex)
            {
                resultWord = ex.Message;
            }
            finally
            {
                // Make sure that the connection to the server is 
                // closed before the method exits.
                if (response != null)
                {
                    response.Close();
                    response = null;
                }
            }

            // Return the translation to the calling code.
            return resultWord;
        }
    }
}
