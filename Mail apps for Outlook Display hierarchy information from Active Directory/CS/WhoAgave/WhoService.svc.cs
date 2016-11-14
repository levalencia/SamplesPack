using System.IO;
namespace Service.Who
{
    public class WhoService : IWhoService
    {
        /// <summary>
        /// Active Directory source object
        /// </summary>
        private static Data.ActiveDirectory.ActiveDirectorySource ads = new Data.ActiveDirectory.ActiveDirectorySource();

        /// <summary>
        /// Wrapper method to return a person from the given SMTP address.
        /// </summary>
        /// <param name="emailAddress">An SMTP email address.</param>
        /// <returns>PersonContext object.</returns>
        public Data.ActiveDirectory.PersonContext FindPerson(string emailAddress)
        {
            if (string.IsNullOrEmpty(emailAddress)) return null;

            try
            {
                Data.ActiveDirectory.PersonContext person = ads.FindPersonContextBySMTPAddress(emailAddress);

                return person;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Wrapper method to return a person thumbnail.
        /// </summary>
        /// <param name="emailAddress">An SMTP email address.</param>
        /// <returns></returns>
        public System.IO.Stream GetImage(string emailAddress)
        {
            if (string.IsNullOrEmpty(emailAddress)) return null;

            try
            {
                Data.ActiveDirectory.PersonContext person = ads.FindPersonContextBySMTPAddress(emailAddress);

                if (person.Person.ThumbnailPhoto != null)
                {
                    Stream ms = new MemoryStream(person.Person.ThumbnailPhoto);
                    return ms;
                }
            }
            catch
            {
                return null;
            }

            return null;
        }
    }
}
