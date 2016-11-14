using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Xml;

namespace AttachmentsDemoWeb.Controllers
{
    public class GetAttachmentController : ApiController
    {
        [HttpPost()]
        public string SaveAttachment(AttachmentRequest request)
        {
            try
            {
                Attachment attachment = GetAttachment(request.AttachmentId, request.AuthToken, request.EwsUrl);
                return SaveAttachment(attachment);
            }
            catch (Exception e)
            {
                return "There was an exception: " + e.Message + "\n\n" + e.StackTrace;
            }
        }

        [HttpPost()]
        public string GetAttachment(AttachmentRequest request)
        {
            try
            {
                Attachment attachment = GetAttachment(request.AttachmentId, request.AuthToken, request.EwsUrl);
                System.IO.File.WriteAllBytes(@"c:\users\alexpark\desktop\temp\" + attachment.AttachmentName, attachment.AttachmentBytes);
            }
            catch (Exception e)
            {
                return "There was an exception: " + e.Message + "\n\n" + e.StackTrace;
            }

            return "Done!";
        }

        private Attachment GetAttachment(string attachmentId, string authToken, string ewsUrl)
        {
            string getAttachmentRequest =
                @"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance""
                xmlns:xsd=""http://www.w3.org/2001/XMLSchema""
                xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/""
                xmlns:t=""http://schemas.microsoft.com/exchange/services/2006/types"">
                <soap:Header>
                <t:RequestServerVersion Version=""Exchange2013"" />
                </soap:Header>
                    <soap:Body>
                    <GetAttachment xmlns=""http://schemas.microsoft.com/exchange/services/2006/messages""
                    xmlns:t=""http://schemas.microsoft.com/exchange/services/2006/types"">
                        <AttachmentShape/>
                        <AttachmentIds>
                        <t:AttachmentId Id=""{0}""/>
                        </AttachmentIds>
                    </GetAttachment>
                    </soap:Body>
                </soap:Envelope>";
            getAttachmentRequest = String.Format(getAttachmentRequest, attachmentId);

            // Prepare a web request object.
            HttpWebRequest webRequest = WebRequest.CreateHttp(ewsUrl);
            webRequest.Headers.Add("Authorization", string.Format("Bearer {0}", authToken));
            webRequest.PreAuthenticate = true;
            webRequest.AllowAutoRedirect = false;
            webRequest.Method = "POST";
            webRequest.ContentType = "text/xml; charset=utf-8";

            // Construct the SOAP message for the GetAttchment operation.
            byte[] bodyBytes = System.Text.Encoding.UTF8.GetBytes(getAttachmentRequest);
            webRequest.ContentLength = bodyBytes.Length;

            Stream requestStream = webRequest.GetRequestStream();
            requestStream.Write(bodyBytes, 0, bodyBytes.Length);
            requestStream.Close();

            // Make the request to the Exchange server and get the response.
            HttpWebResponse webResponse = (HttpWebResponse)webRequest.GetResponse();

            // If the response is okay, create an XML document from the
            // response and process the request.
            if (webResponse.StatusCode == HttpStatusCode.OK)
            {
                Stream responseStream = webResponse.GetResponseStream();

                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.Load(responseStream);

                string fileName = xmlDocument.GetElementsByTagName("t:Name")[0].InnerText;
                byte[] bytes = Convert.FromBase64String(xmlDocument.GetElementsByTagName("t:Content")[0].InnerText);

                // Close the response stream.
                responseStream.Close();
                webResponse.Close();

                return new Attachment() { AttachmentBytes = bytes, AttachmentName = fileName };
            }

            return null;
        }


        private string SaveAttachment(Attachment attachment)
        {
            string oneDriveResourceId = "https://microsoft705-my.sharepoint.com/";
            string oneDriveApiEndpoint = "https://microsoft705-my.sharepoint.com/personal/alexpark_microsoft705_onmicrosoft_com/_api";
            
            string accessToken = OAuthController.GetAccessTokenFromRefreshToken(oneDriveResourceId);

            // Prepare the HTTP request using the new "File" APIs
            HttpWebRequest webRequest =
                WebRequest.CreateHttp(oneDriveApiEndpoint + "/files/Add(name='" + attachment.AttachmentName + "', overwrite=true)");
            webRequest.Accept = "application/json;odata=verbose";
            webRequest.Headers.Add("Authorization", string.Format("Bearer {0}", accessToken));
            webRequest.Method = "POST";
            webRequest.ContentLength = attachment.AttachmentBytes.Length;
            webRequest.ContentType = "application/octet-stream";

            Stream requestStream = webRequest.GetRequestStream();
            requestStream.Write(attachment.AttachmentBytes, 0, attachment.AttachmentBytes.Length);
            requestStream.Close();

            // Make the request to SharePoint and get the response.
            HttpWebResponse webResponse = (HttpWebResponse)webRequest.GetResponse();

            // If the response is okay, read it
            if (webResponse.StatusCode == HttpStatusCode.OK)
            {
                Stream responseStream = webResponse.GetResponseStream();
                StreamReader reader = new StreamReader(responseStream);
                return reader.ReadToEnd();
            }

            return "StatusCode was not OK!";
        }

        public class Attachment
        {
            public byte[] AttachmentBytes { get; set; }
            public string AttachmentName { get; set; }
        }

        public class AttachmentRequest
        {
            public string AuthToken { get; set; }
            public string AttachmentId { get; set; }
            public string EwsUrl { get; set; }
        }
    }
}