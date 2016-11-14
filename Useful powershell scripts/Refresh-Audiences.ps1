function Compile-SharePointAudience([string]$PortalURLtoCompile, [string]$AudienceName)
{
    [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
    [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Server") > $null 
    [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Server.Search.Administration") > $null 
    [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Server.Audience") > $null 

    Write-Host "PortalURLtoCompile", $PortalURLtoCompile

    $sitetoCompile = new-object Microsoft.SharePoint.SPSite($PortalURLtoCompile)
    $searchContext = [Microsoft.Office.Server.Search.Administration.SearchContext]::GetContext($sitetoCompile)

    [Array]$args = $searchContext.Name, "1", "1", $AudienceName
        
    [int]$runjob = [Microsoft.Office.Server.Audience.AudienceJob]::RunAudienceJob($args)
    $sitetoCompile.Dispose()

    return $runjob
}

function Refresh-Audiences([string]$MyPortalURL)
{
    Write-Host "MyPortalURL", $MyPortalURL

    [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
    [System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Server.Audience") > $null 

    $site = new-object Microsoft.SharePoint.SPSite($MyPortalURL)
    $web = $site.openweb()
    $srvContext = [Microsoft.Office.Server.ServerContext]::GetContext($site)

    [Microsoft.Office.Server.Audience.Audience]$myAudience = $null
    [Microsoft.Office.Server.Audience.AudienceManager]$audManager = new-object Microsoft.Office.Server.Audience.AudienceManager($srvContext)
    [Microsoft.Office.Server.Audience.AudienceCollection]$audCollection = $audManager.Audiences
    foreach($myAudience in $audCollection)
    {
        Write-Host "Audience Name:", $myAudience.AudienceName, "- Last Compile:", $myAudience.LastCompilation
        Compile-SharePointAudience $MyPortalURL $myAudience.AudienceName
    }
    
    Write-Host " -------------------------------- "
    $web.Dispose()
    $site.Dispose()    
}

Refresh-Audiences “http://MyPortalWebApplication”
