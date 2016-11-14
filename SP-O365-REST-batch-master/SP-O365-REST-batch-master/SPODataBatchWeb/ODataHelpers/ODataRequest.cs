/*
 *  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.Data.OData;
using System.IO;
using System.Net;

namespace SPODataBatchWeb.ODataHelpers
{

    public class BatchODataRequest : ODataRequest
    {
        public BatchODataRequest(string baseServiceUrl)
            : base(baseServiceUrl, "$batch")
        {
            this.webRequest.Method = "POST";
        }


        public override string Method
        {
            get
            {
                return this.webRequest.Method;
            }
            set
            {
                throw new InvalidOperationException("The batch request's Method property can't be modified, it is set to POST in the constructor.");
            }
        }

    }
    public class ODataRequest : IODataRequestMessage
    {
        protected readonly HttpWebRequest webRequest;

        public ODataRequest(string baseServieUrl, string specificEndpoint)
        {
            this.webRequest = (HttpWebRequest)HttpWebRequest.Create(baseServieUrl + specificEndpoint);
        }


        public IEnumerable<KeyValuePair<string, string>> Headers
        {
            get
            {
                return this.webRequest.Headers.AllKeys.Select(headerName =>
                    new KeyValuePair<string, string>(headerName, this.webRequest.Headers.Get(headerName)));
            }

        }

        public virtual string Method
        {
            get
            {
                return this.webRequest.Method;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    throw new ArgumentException("Method must be a non-empty string.", "value");
                }

                this.webRequest.Method = value;
            }
        }

        public Uri Url
        {
            get
            {
                return this.webRequest.RequestUri;
            }
            set
            {
                throw new InvalidOperationException("The request's Url property can't be modified, it has to be specified in the constructor.");
            }
        }

        public string GetHeader(string headerName)
        {
            if (string.IsNullOrEmpty(headerName))
            {
                throw new ArgumentException(headerName + " is not a valid header name.");
            }

            return this.webRequest.Headers.Get(headerName);

        }

        public Stream GetStream()
        {
            return webRequest.GetRequestStream();
        }

        public void SetHeader(string headerName, string headerValue)
        {
            if (headerName == null)
            {
                throw new ArgumentNullException("headerName");
            }

            // Some of the headers can't be set through the WebRequest.Headers collection.
            // Instead they have to be set as properties on the HttpWebRequest object.
            // Note that HTTP headers are case insensitive.
            if (string.Equals(headerName, "Accept", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.Accept = headerValue;
            }
            else if (string.Equals(headerName, "Content-Length", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.ContentLength = headerValue == null ? -1 : long.Parse(headerValue);
            }
            else if (string.Equals(headerName, "Content-Type", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.ContentType = headerValue;
            }
            else if (string.Equals(headerName, "Date", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.Date = headerValue == null ? DateTime.MinValue : DateTime.Parse(headerValue);
            }
            else if (string.Equals(headerName, "Expect", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.Expect = headerValue;
            }
            else if (string.Equals(headerName, "Host", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.Host = headerValue;
            }
            else if (string.Equals(headerName, "If-Modified-Since", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.IfModifiedSince = headerValue == null ? DateTime.MinValue : DateTime.Parse(headerValue);
            }
            else if (string.Equals(headerName, "Referer", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.Referer = headerValue;
            }
            else if (string.Equals(headerName, "Transfer-Encoding", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.TransferEncoding = headerValue;
            }
            else if (string.Equals(headerName, "User-Agent", StringComparison.OrdinalIgnoreCase))
            {
                this.webRequest.UserAgent = headerValue;
            }
            else
            {
                if (headerValue == null)
                {
                    this.webRequest.Headers.Remove(headerName);
                }
                else
                {
                    this.webRequest.Headers.Set(headerName, headerValue);
                }
            }
        }

       // public virtual IODataResponseMessage GetResponse()
        public IODataResponseMessage GetResponse()
        {
            return new ODataResponse((HttpWebResponse)this.webRequest.GetResponse());
        }

    }

}
// *********************************************************
//
// SP-O365-REST-batch, https://github.com/OfficeDev/SP-O365-REST-batch
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// *********************************************************
