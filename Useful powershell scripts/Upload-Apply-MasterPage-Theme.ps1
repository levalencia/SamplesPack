# Function:          Apply-Master-Page-Theme-Collection
# Description:       Upload the New Master Page and apply it on all sites
function Apply-Master-Page-Theme-Collection([string]$SiteCollectionURL, [string]$FileMasterPage, [string]$ThemeName)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	$site = new-object Microsoft.SharePoint.SPSite($SiteCollectionURL)
	$web = $site.openweb()
	$MasterURL = $SiteCollRelativeURL + "/_catalogs/masterpage/" + $FileMasterPage

#	Write-Host "FileMasterPage", $FileMasterPage
#	Write-Host "MasterURL", $MasterURL

	Apply-Master-Page-And-Theme $web.Url $MasterURL $ThemeName
	
	$web.Dispose()
	$site.Dispose()
}

# Function:          Apply-Master-Page-And-Theme
# Description:       Apply the New Master Page and the chosen theme
function Apply-Master-Page-And-Theme([string]$webURL, [string]$TempFileMasterPage, [string]$TempThemeName)
{
#	Write-Host "FileMasterPage", $TempFileMasterPage
#	Write-Host "Theme", $web.Theme
	
	$web.MasterUrl = $TempFileMasterPage
	$web.Update()

	$web.ApplyTheme($TempThemeName)
	$web.Update()
	
	foreach ($subweb in $web.GetSubwebsForCurrentUser())
	{
		Apply-Master-Page-And-Theme $subweb $TempFileMasterPage $TempThemeName
    }
}

# Function:          Upload-Master-Page
# Description:       Upload the New Master Page
function Upload-Master-Page([string]$SiteCollectionURL, [string]$PathMasterPage, [string]$MasterPageName)
{
#	Write-Host "SiteCollectionURL", $SiteCollectionURL
#	Write-Host "PathMasterPage", $PathMasterPage

	$propbag = @{"ContentType"="Master Page"}
	$docliburl = $SiteCollectionURL + "/_catalogs/masterpage"
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	$site = new-object Microsoft.SharePoint.SPSite($docliburl)
	$web = $site.openweb()
	$folder = $web.getfolder($docliburl)
	$list = $web.lists[$folder.ContainingDocumentLibrary]
	
	$stream = [IO.File]::OpenRead($PathMasterPage)
#	Write-Host "MasterPageName", $MasterPageName

	$folder.files.Add($MasterPageName, $stream, $propbag, $true) > $null
	$stream.close()
	
	$web.Dispose()
	$site.Dispose()
}

# Function:          Apply-Master-Page-And-Theme-All-Site-Collections
# Description:       Upload the New Master Page, apply it and apply the chosen theme
function Apply-Master-Page-And-Theme-All-Site-Collections([string]$WebAppURL, [string]$LocalPathMasterPage, [string]$LocalMasterPageName, [string]$LocalTheme)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null

	$Thesite = new-object Microsoft.SharePoint.SPSite($WebAppURL)
	$oApp = $Thesite.WebApplication

	foreach ($Sites in $oApp.Sites)
	{
		$mySubweb = $Sites.RootWeb
		Write-Host "WebURL", $mySubweb.Url

		Upload-Master-Page $mySubweb.Url $RelativeURL $LocalPathMasterPage $LocalMasterPageName 

		Apply-Master-Page-Theme-Collection $mySubweb.Url  $LocalMasterPageName $LocalTheme
		$mySubweb.Dispose()
    }
	$Thesite.Dispose()
}

Apply-Master-Page-And-Theme-All-Site-Collections "http://myWebApplication" "C:\TEMP\myMasterPage.master" "myMasterPage.master" "ThemeToApply"
