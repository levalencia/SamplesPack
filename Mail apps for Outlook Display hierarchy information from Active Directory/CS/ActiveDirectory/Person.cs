namespace Data.ActiveDirectory
{
    using System;
    using System.IO;

    using System.Xml;
    using System.Xml.Serialization;

    using System.Collections.Generic;

    using System.Diagnostics;

    /// <summary>
    /// Class reperesents a person.
    /// </summary>
    [Serializable]
    public class Person
    {
        public string Alias;

        public string FirstName;
        public string LastName;
        public string DisplayName;

        public string EmailAddress;
        public string Title;
        public string Office;
        public string Telephone;

        public int DirectsCount;
        public string Department;

        [XmlIgnore]
        public string DistinguishedName;

        [XmlIgnore]
        public string Manager;

        [XmlIgnore]
        public List<string> Directs;

        [XmlIgnore]
        public byte[] ThumbnailPhoto;
        public string EncodedThumbnail;

    }
}
