
namespace IdentityTokenService.Models
{
    public class ServiceResponse
    {
        public bool isKnown { get; set; }
        public bool isValidToken { get; set; }
        public string message { get; set; }
    }
}