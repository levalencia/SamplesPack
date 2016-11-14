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
    
    public class ODataResponse : IODataResponseMessage 
    {
        private readonly HttpWebResponse webResponse;

        public ODataResponse(HttpWebResponse webResponse)
        {
            if (webResponse == null)
            {
                throw new ArgumentNullException("webResponse");
            }

            this.webResponse = webResponse;
        }

        public IEnumerable<KeyValuePair<string, string>> Headers 
        { 
            get
            {
                return this.webResponse.Headers.AllKeys.Select(headerName =>
                    new KeyValuePair<string, string>(headerName, this.webResponse.Headers.Get(headerName)));
            }
        }

        public int StatusCode 
        { 
            get
            {
                return (int)this.webResponse.StatusCode;
            }
            set
            {
                throw new InvalidOperationException("The HTTP response is read-only, status code can't be modified on it.");
            }
        }

        public string GetHeader(string headerName)
        {
            if (string.IsNullOrEmpty(headerName))
            {
                throw new ArgumentException(headerName + " is not a valid header name.");
            }

            return this.webResponse.Headers.Get(headerName);
        }



        public Stream GetStream()
        {
            return this.webResponse.GetResponseStream();
        }


        public void SetHeader(string headerName, string headerValue)
        {
            throw new InvalidOperationException("The HTTP response is read-only, headers can't be modified on it.");
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
