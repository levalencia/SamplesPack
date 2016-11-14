using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DotNetOpenAuth.AspNet;
using DotNetOpenAuth.AspNet.Clients;
using DotNetOpenAuth.OAuth;
using DotNetOpenAuth.OAuth.ChannelElements;
using DotNetOpenAuth.OAuth.Messages;
using DotNetOpenAuth.Messaging;


namespace AO2013_ZoteroWordCodeSample_CSWeb
{
    /// <summary>
    /// The client that will handle oauth authentication with Zotero
    /// </summary>
    public class ZoteroClient : OAuthClient
    {
        private const string UserAuthorizationRequestUrl =
            "https://www.zotero.org/oauth/authorize?fullsite=0";
        private const string AccessTokenRequestUrl =
            "https://www.zotero.org/oauth/access";
        private const string RequestTokenRequestUrl =
            "https://www.zotero.org/oauth/request";

        private static readonly ServiceProviderDescription ZoteroServiceDescription =
            new ServiceProviderDescription
            {
                AccessTokenEndpoint = new MessageReceivingEndpoint(
                    AccessTokenRequestUrl, HttpDeliveryMethods.PostRequest),
                RequestTokenEndpoint = new MessageReceivingEndpoint(
                    RequestTokenRequestUrl, HttpDeliveryMethods.PostRequest),
                UserAuthorizationEndpoint = new MessageReceivingEndpoint(
                    UserAuthorizationRequestUrl, HttpDeliveryMethods.PostRequest),
                ProtocolVersion = ProtocolVersion.V10a,
                TamperProtectionElements =
                    new ITamperProtectionChannelBindingElement[] { new 
                        HmacSha1SigningBindingElement() }
            };

        private string consumerKey;
        private string consumerSecret;

        public ZoteroClient(string consumerKey, string consumerSecret)
            : this(consumerKey, consumerSecret,
            new AuthenticationOnlyCookieOAuthTokenManager())
        { }

        public ZoteroClient(string consumerKey, string consumerSecret,
            IOAuthTokenManager tokenManager)
            : base("Zotero",
                ZoteroServiceDescription, new SimpleConsumerTokenManager(consumerKey,
                consumerSecret, tokenManager))
        {
            this.consumerKey = consumerKey;
            this.consumerSecret = consumerSecret;
        }

        /// <summary>
        /// Check if authentication succeeded after user is redirected back from the 
        /// service provider.
        /// </summary>
        /// <param name="response">
        /// The response token returned from service provider
        /// </param>
        /// <returns>
        /// Authentication result
        /// </returns>
        protected override AuthenticationResult VerifyAuthenticationCore(
            AuthorizedTokenResponse response)
        {
            string userId = null;

            //Two things are necessary for zotero access, the users id and an access
            //token. Here if we don't find the user is, we return a failed
            //authentication result.
            if (response.ExtraData.ContainsKey("userID"))
            {
                userId = response.ExtraData["userID"];
            }
            else
            {
                return new AuthenticationResult(false);
            }

            //We don't care if this is empty or not.
            string userName = "";
            if (response.ExtraData.ContainsKey("username"))
            {
                userName = response.ExtraData["username"];
            }

            string accessToken = response.AccessToken;

            //Since the access token is the other piece required for zotero api calls
            //if it is not found, return a failed authentication result.
            if (accessToken == null)
            {
                return new AuthenticationResult(false);
            }

            //Since we want to access the token outside of this client, we need to 
            //add it to the authentication results extra data.
            Dictionary<string, string> extraData = new Dictionary<string, string>();
            extraData.Add("accessToken", accessToken);

            return new AuthenticationResult(true, this.ProviderName, userId, userName, extraData);
        }


        public override AuthenticationResult VerifyAuthentication(
            HttpContextBase context)
        {
            return base.VerifyAuthentication(context);
        }
    }
}