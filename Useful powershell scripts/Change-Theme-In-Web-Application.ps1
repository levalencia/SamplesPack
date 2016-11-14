# Function:         Update-Theme
# Description:       Update the Theme
function Update-Theme([string]$webURL, [string]$TempThemeName, [string]$TempLogoUrl, [string]$TempLogoDescription)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	$mysite = new-object Microsoft.SharePoint.SPSite($webURL)
	$myweb = $mysite.openweb()
	Write-Host "URL", $webURL
	Write-Host "web", $myweb.Name
	Write-Host "Theme", $myweb.Theme
	
	$myweb.ApplyTheme($TempThemeName)
	$myweb.SiteLogoUrl = $TempLogoUrl
	$myweb.SiteLogoDescription = $TempLogoDescription
	$myweb.Update()
	
	foreach ($subweb in $myweb.GetSubwebsForCurrentUser())
	{
		Update-Theme $subweb.Url $TempThemeName $TempLogoUrl $TempLogoDescription
    }
	$myweb.Dispose()
	$mysite.Dispose()
}

# Function:          Change-Themes-for-All-Site-Collections
# Description:       
function Change-Themes-for-All-Site-Collections([string]$WebAppURL, [string]$Theme, [string]$Logo, [string]$Description)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null

	$Thesite = new-object Microsoft.SharePoint.SPSite($WebAppURL)
	$oApp = $Thesite.WebApplication

	foreach ($Sites in $oApp.Sites)
	{
		$mySubweb = $Sites.RootWeb
#		Write-Host "URL", $mySubweb.Url
		Update-Theme $mySubweb.Url $Theme $Logo $Description

		$mySubweb.Dispose()
    }
	$Thesite.Dispose()
}
cls
Change-Themes-for-All-Site-Collections "http://myWebApplication1" "MyTheme" "/_layouts/images/mylogo.gif" "Team Site Logo"
Change-Themes-for-All-Site-Collections "http://myWebApplication2" "MyTheme" "/_layouts/images/mylogo.gif" "Team Site Logo"
Change-Themes-for-All-Site-Collections "http://myWebApplication3" "MyTheme" "/_layouts/images/mylogo.gif" "Team Site Logo"
