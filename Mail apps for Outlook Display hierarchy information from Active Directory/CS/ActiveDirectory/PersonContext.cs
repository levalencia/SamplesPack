namespace Data.ActiveDirectory
{
    using System;
    using System.Xml;
    using System.Xml.Serialization;

    using System.Collections.Generic;

    using System.Diagnostics;

    /// <summary>
    /// Class to hold a person, the manager, and the direct reports.
    /// </summary>
    [Serializable]
    public class PersonContext
    {
        /// <summary>
        /// The person.
        /// </summary>
        public Person Person;

        /// <summary>
        /// The person mananger
        /// </summary>
        public Person Manager;

        /// <summary>
        /// The person direct reports. Directs is null if the person doesn't have any reports.
        /// </summary>
        public List<Person> Directs;
    }
}
