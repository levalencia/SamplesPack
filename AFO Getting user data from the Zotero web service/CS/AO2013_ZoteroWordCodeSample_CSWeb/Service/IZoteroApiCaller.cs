using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.IO;

namespace AO2013_ZoteroWordCodeSample_CSWeb.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IZoteroApiCaller" in both code and config file together.
    [ServiceContract]
    public interface IZoteroApiCaller
    {
        [OperationContract]
        string GetAllItems(string userId, string accessToken, int limit = 0,string style = null);
    }
}
