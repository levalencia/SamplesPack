﻿namespace Data.ActiveDirectory
{
    using System;
    using System.Text;
    using System.Collections.Generic;
    using System.DirectoryServices;

    public class ActiveDirectorySource : ActiveDirectorySearcher
    {
        /// <summary>
        /// Finds the person context by searching in Active Directory 
        /// given the SMTP address.
        /// </summary>
        /// <param name="SMTPAddress">The SMTP address.</param>
        /// <returns>PersonContext object or null if not found.</returns>
        public PersonContext FindPersonContextBySMTPAddress(string SMTPAddress)
        {
            PersonContext context = null;

            if (!string.IsNullOrWhiteSpace(SMTPAddress))
            {
                // Specify AdProperties as the properties to retrieve 
                // from Active Directory during the search.
                this.Ds.PropertiesToLoad.Clear();
                this.Ds.PropertiesToLoad.AddRange(AdProperties);

                // Set the LDAP format filter string, since we're using LDAP as the
                // service provider for Active Directory Domain Services.
                this.Ds.Filter = "(&(proxyaddresses=smtp:" + SMTPAddress + ")(objectcategory=Person))";
                

                // Execute search in Active Directory and
                // get the first SearchResult object.
                SearchResult result = this.Ds.FindOne();

                // Create and initialize Person object from the 
                // SearchResult object.
                Person person = this.PersonFromSearchResult(result);

                if (person != null)
                {
                    context = new PersonContext
                    {
                        Person = person,
                        Manager = null,
                        Directs = null
                    };

                    // Find this person's manager.
                    if (!string.IsNullOrWhiteSpace(context.Person.Manager))
                    {
                        context.Manager = FindPersonByDistinguishedName(context.Person.Manager);
                    }

                    // Find this person's directs.
                    if (context.Person.DirectsCount > 0)
                    {
                        context.Directs = new List<Person>(context.Person.DirectsCount);

                        foreach (string direct in context.Person.Directs)
                        {
                            context.Directs.Add(FindPersonByDistinguishedName(direct));
                        }
                    }
                }
            }

            return context;
        }

        /// <summary>
        /// Finds the person by searching in Active Directory given
        /// the distinguished name.
        /// </summary>
        /// <param name="distinguishedName">The distinguished name.</param>
        /// <returns>Person object or null if not found.</returns>
        protected Person FindPersonByDistinguishedName(string distinguishedName)
        {
            Person person = null;

            if (!string.IsNullOrWhiteSpace(distinguishedName))
            {
                // Specify AdProperties as the properties to retrieve 
                // from Active Directory during the search.
                this.Ds.PropertiesToLoad.Clear();
                this.Ds.PropertiesToLoad.AddRange(AdProperties);

                // Set the LDAP format filter string, since we're using LDAP as the
                // service provider for Active Directory Domain Services.
                this.Ds.Filter = 
                    "(&(distinguishedname=" + EscapeLdap(distinguishedName) + ")(objectcategory=Person))";

                // Execute search in Active Directory and 
                // get the first SearchResult object.
                SearchResult result = this.Ds.FindOne();

                // Create and initialize Person object from the 
                // SearchResult object.
                person = this.PersonFromSearchResult(result);
            }

            return person;
        }
    }
}
