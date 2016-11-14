function Add-Nodes-In-SP-Top-Bar([string]$SiteURL)
{
   [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
   
   $site = new-object Microsoft.SharePoint.SPSite($SiteURL)
   $web = $site.openweb()
   Write-Host "Web URL", $web.URL
   
   $topNav = $web.Navigation.TopNavigationBar

   $DropDownMenuBlogs = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Blogs", "", 0)
   $topNav[0].Children.AddAsLast($DropDownMenuBlogs)
   
   $tempLink = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Blogs Codes-Sources", "http://blogs.developpeur.org", 1)
   $DropDownMenuBlogs.Children.AddAsLast($tempLink)

   $tempLink = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Blogs MSDN", "http://blogs.msdn.com", 1)
   $DropDownMenuBlogs.Children.AddAsLast($tempLink)
   $tempLink = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Blogs TECHNET", "http://blogs.technet.com", 1)
   $DropDownMenuBlogs.Children.AddAsLast($tempLink)
   
   $DropDownMenuSearch = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Search", "", 0)
   $topNav[0].Children.AddAsLast($DropDownMenuSearch)
   
   $tempLink = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Google", "http://www.google.com", 1)
   $DropDownMenuSearch.Children.AddAsLast($tempLink)
   $tempLink = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Live", "http://www.live.fr", 1)
   $DropDownMenuSearch.Children.AddAsLast($tempLink)
   $tempLink = New-Object Microsoft.SharePoint.Navigation.SPNavigationNode("Yahoo", "http://www.yahoo.fr", 1)
   $DropDownMenuSearch.Children.AddAsLast($tempLink)

   $web.Update()
}


function Clean-Nodes-In-SP-Top-Bar([string]$SiteURL)
{
   [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
   
   $site = new-object Microsoft.SharePoint.SPSite($SiteURL)
   $web = $site.openweb()
   Write-Host "Web URL", $web.URL
   
   $topNav = $web.Navigation.TopNavigationBar
   
   for($i=$topNav[0].Children.Count - 1; $i -ge 0; $i--)
   {
      if(($topNav[0].Children[$i].Title -eq "Blogs") -or ($topNav[0].Children[$i].Title -eq "Search"))
      {
         $topNav[0].Children[$i].Delete()
      }
   }
   $web.Update()
}

Clean-Nodes-In-SP-Top-Bar "http://mySharePointFarm/sites/MySiteColl/"
Add-Nodes-In-SP-Top-Bar "http://mySharePointFarm/sites/MySiteColl/"
 
