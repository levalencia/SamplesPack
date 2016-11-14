function Get-AllSurveyItemOwners([string]$SurveyURL, [string]$SurveyName)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint.Administration") > $null

	$site = new-object Microsoft.SharePoint.SPSite($SurveyURL)
	Write-Host "SiteURL:", $SurveyURL

	$DBName = [Microsoft.SharePoint.Administration.SPContentDatabase].GetProperty("Name") 

	$MyContentDatabase = $site.ContentDatabase
	
	Write-Host " ------------------------------ "
	[string]$CurrentDBName = $DBName.GetValue($MyContentDatabase, $null)
	Write-Host " ---> ContentDB:", $CurrentDBName
	
	$web = $site.OpenWeb()

	Write-Host " ------------------------------ "
	$SurveyList = $web.Lists[$SurveyName];
	[string]$CurrentListID = $SurveyList.Id
	Write-Host " ---> Survey ListID:", $SurveyList.Id
	Write-Host " ------------------------------ "
	
	$web.Dispose()
	$site.Dispose()

	$SQLToLaunch = "USE [$CurrentDBName]"
	$SQLToLaunch += " SELECT usrinf.tp_Login AS UsrLogin, usrinf.tp_Email AS UsrEmail, AllData.tp_Modified AS LastModified, "
	$SQLToLaunch += " AllData.tp_ID AS IDItem FROM dbo.AllUserData AllData "
	$SQLToLaunch += " INNER JOIN dbo.UserInfo usrinf ON AllData.tp_Author = usrinf.tp_ID AND AllData.tp_SiteID = usrinf.tp_SiteID "
	$SQLToLaunch += " WHERE (NOT tp_CheckoutUserId IS NULL) AND (tp_ListId = '$CurrentListID')"

	Write-Host " ------------------------------------------------------------------ "
	Write-Host "	SQL Code:"
	Write-Host $SQLToLaunch
	Write-Host " ------------------------------------------------------------------ "
}

cls
Get-AllSurveyItemOwners "http://MySharePointWebApp/sites/MySiteColl/MyWeb/Lists/MySurveyList/" "My Survey List Name"


