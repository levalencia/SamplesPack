/*
 *  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
 */

using SPODataBatchWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace SPODataBatchWeb.SharePointDataHelpers
{
    public class ListDataHelper
    {
        public static List<XElement> ExtractListItemsFromATOMResponse(Stream stream)
        {
            XDocument oDataXML = XDocument.Load(stream, LoadOptions.None);
            XNamespace atom = "http://www.w3.org/2005/Atom";
            XNamespace d = "http://schemas.microsoft.com/ado/2007/08/dataservices";
            XNamespace m = "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata";

            // The ATOM markup for a SharePoint list nests field elements under <entry> <content> <properties>.
            List<XElement> entries = oDataXML.Descendants(atom + "entry")
                                     .Elements(atom + "content")
                                     .Elements(m + "properties")
                                     .ToList();

            return entries;
        }

        public static IEnumerable<SharePointListItemTitle> GetItemTitles(List<XElement> entries)
        {
            XNamespace d = "http://schemas.microsoft.com/ado/2007/08/dataservices";
            IEnumerable<SharePointListItemTitle> entryTitles = from entry in entries
                                   select new SharePointListItemTitle()
                                   {
                                       Title = entry.Element(d + "Title").Value,
                                   };
            return entryTitles;
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
