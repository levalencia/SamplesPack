using IdentityTokenService.Models;
using System;
using System.Web.Http;

namespace IdentityTokenService.Controllers
{
    public class IdentityTokenController : ApiController
    {
        public IdentityTokenResponse PostJSONToken(IdentityTokenRequest token)
        {
            IdentityTokenResponse response = new IdentityTokenResponse();

            try
            {
                IdentityToken identityToken = null;

                using (DecodedJsonToken decodedToken = JsonTokenDecoder.Decode(token))
                {
                    if (decodedToken.IsValid)
                    {
                        identityToken = new IdentityToken(token, decodedToken.Audience, decodedToken.AuthMetadataUri);
                    }
                }

                response.token = identityToken;
            }
            catch (Exception ex)
            {
                response.errorMessage = ex.Message;
            }

            return response;
        }
    }
}
