using System;
using System.ServiceModel;
using System.ServiceModel.Web;

using System.IO;

namespace Service.Who
{
    [ServiceContract(Name = "WhoService", Namespace = "Service.Who")]
    public interface IWhoService
    {
        [OperationContract]
        [WebInvoke(Method = "GET",
            UriTemplate = "/FindPerson?emailAddress={emailAddress}",
            ResponseFormat = WebMessageFormat.Json
        )]
        Data.ActiveDirectory.PersonContext FindPerson(string emailAddress);

        [OperationContract]
        [WebInvoke(Method = "GET",
            UriTemplate = "/GetImage?emailAddress={emailAddress}",
            RequestFormat = WebMessageFormat.Xml,
            ResponseFormat = WebMessageFormat.Xml,
            BodyStyle = WebMessageBodyStyle.Bare
        )]
        Stream GetImage(string emailAddress);
    }
}
