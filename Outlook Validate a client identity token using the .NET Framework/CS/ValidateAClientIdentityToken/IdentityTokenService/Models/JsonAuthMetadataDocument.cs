
namespace IdentityTokenService.Models
{
    public class JsonAuthMetadataDocument
    {
        public string id { get; set; }
        public string version { get; set; }
        public string name { get; set; }
        public string realm { get; set; }
        public string serviceName { get; set; }
        public string issuer { get; set; }
        public string[] allowedAudiences { get; set; }
        public JsonKey[] keys;
        public JsonEndpoint[] endpoints;
    }

    public class JsonEndpoint
    {
        public string location { get; set; }
        public string protocol { get; set; }
        public string usage { get; set; }
    }

    public class JsonKey
    {
        public string usage { get; set; }
        public JsonKeyValue keyValue { get; set; }
    }

    public class JsonKeyValue
    {
        public string type { get; set; }
        public string value { get; set; }
    }
}