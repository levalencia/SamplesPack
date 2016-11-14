﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238
using MeetAndGreet.Helpers;

namespace MeetAndGreet
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
             

        }

        private async void ShowItems<T>(Func<Task<IEnumerable<T>>> obtainItems, Func<T,String> whatToDisplay)
        {
            if (OutputBox != null && OutputBox.Items != null)
            {
                OutputBox.Items.Clear();
            }

            IEnumerable<T> results = await obtainItems.Invoke();
            foreach (var result in results)
            {
                OutputBox.Items.Add(whatToDisplay.Invoke(result));
            }
        }
         
        private async void LogOutClicked(object sender, RoutedEventArgs e)
        {
            await AuthenticationHelper.SignOutAsync();
        }

        private void OnReadMails(object sender, RoutedEventArgs e)
        {
            ShowItems(Model.MessagesOperations.GetMessages, m => m.Subject);
        }

        private void OnReadContacts(object sender, RoutedEventArgs e)
        {
            ShowItems(Model.ContactsOperations.GetContacts, m => m.DisplayName);
        }

        private void OnReadCalendar(object sender, RoutedEventArgs e)
        {
            ShowItems(Model.CalendarOperations.GetCalendarEvents, m=>m.Subject);
        }

        private void OnReadFiles(object sender, RoutedEventArgs e)
        {
            ShowItems(Model.FilesOperations.GetMyFiles, m => m.Name);
        }

        private void OnReadUsers(object sender, RoutedEventArgs e)
        {
            ShowItems(Model.AzureAdOperations.GetUsers, m => m.DisplayName);
        }

        private void OnReadSites(object sender, RoutedEventArgs e)
        {
            ShowItems(Model.SitesOperations.GetDefaultDocumentFiles, m => m.Name);
        }
    }
}
