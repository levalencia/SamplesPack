
namespace IdentityTokenService.Models
{
    public class IdentityTokenResponse
    {
        public string errorMessage { get; set; }
        public IdentityToken token { get; set; }
    }
}