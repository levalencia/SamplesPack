using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AttachmentsDemoWeb.Controllers
{
    public class OAuthController : ApiController
    {
        private static readonly string ClientId = "1d027251-6b99-4a4e-8ae4-515ea6c7978d";
        private static readonly string ClientSecret = "HjvE/CVgX+zWxQdB+/nTILD1VSi2dLqujvWDEUfG0TY=";

        private const string OAuthUrl = "https://login.windows.net/{0}";
        private static readonly string AuthorizeUrl = string.Format(CultureInfo.InvariantCulture,
            OAuthUrl,
            "common/oauth2/authorize?response_type=code&client_id={0}&resource={1}&redirect_uri={2}");
        private static readonly Uri RedirectUrl = new Uri(
            System.Web.HttpContext.Current.Request.Url, "/AppRead/OAuthRedirect.html");

        [HttpPost()]
        public string GetAuthorizationUrl(AuthorizationRequest request)
        {
            return String.Format(CultureInfo.InvariantCulture,
                AuthorizeUrl,
                Uri.EscapeDataString(ClientId),
                Uri.EscapeDataString(request.ResourceId),
                Uri.EscapeDataString(RedirectUrl.ToString())
            );
        }

        [HttpPost()]
        public string CompleteOAuthFlow(AuthorizationParameters parameters) {
            try
            {
                ClientCredential credential = new ClientCredential(ClientId, ClientSecret);
                string authority = string.Format(CultureInfo.InvariantCulture, OAuthUrl, "common");
                AuthenticationContext authContext = new AuthenticationContext(authority);
                AuthenticationResult result = authContext.AcquireTokenByAuthorizationCode(
                    parameters.Code, new Uri(RedirectUrl.GetLeftPart(UriPartial.Path)), credential);

                // Cache the access token and refresh token
                Storage.SecureStore.RefreshToken = result.RefreshToken;
                return "OAuth succeeded";
            }
            catch (ActiveDirectoryAuthenticationException ex)
            {
                return "OAuth failed. " + ex.ToString();
            }
        }

        /// <summary>
        /// Try to get a new access token for this resource using a refresh token.
        /// If successful, this method will cache the access token for future use.
        /// If this fails, return null, signaling the caller to do the OAuth redirect.
        /// </summary>
        public static string GetAccessTokenFromRefreshToken(string resourceId)
        {
            // Redeem the refresh token for an access token:
            try
            {
                string refreshToken = Storage.SecureStore.RefreshToken;
                ClientCredential credential = new ClientCredential(ClientId, ClientSecret);
                string authority = string.Format(CultureInfo.InvariantCulture, OAuthUrl, "common");
                AuthenticationContext authContext = new AuthenticationContext(authority);
                AuthenticationResult result = authContext.AcquireTokenByRefreshToken(
                    refreshToken, ClientId, credential, resourceId);

                return result.AccessToken;
            }
            catch (ActiveDirectoryAuthenticationException)
            {
                return null;
            }
        }

        public class AuthorizationRequest
        {
            public string ResourceId { get; set; }
        }

        public class AuthorizationParameters
        {
            public string Code { get; set; }
        }
    }
}