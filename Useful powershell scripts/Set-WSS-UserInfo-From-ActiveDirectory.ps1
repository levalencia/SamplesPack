[bool]$Verbose = $false
[int]$GLOBAL:TotalUsersUpdated = 0

function TestExistingValue([string]$ValueToTest, [string]$ParamName)
{
	[string]$result = "n/a"
	if ($ValueToTest.length -gt 0)
	{
		$result = $ValueToTest.Trim()
	}
	return $ParamName + ": " + $result + "<BR>"
}

function Get-Users-From-ActiveDirectory([string]$domaincnx, [string]$Userlogin)
{
	[object]$TempUser = $null
	#Filter on User which only exists
	$strFilter = "(&(objectCategory=user)(objectClass=user)(samAccountName="+ $Userlogin +"))"
	$objDomain = New-Object System.DirectoryServices.DirectoryEntry($domaincnx)

	$objSearcher = New-Object System.DirectoryServices.DirectorySearcher
	$objSearcher.SearchRoot = $objDomain
	$objSearcher.PageSize = 10000
	$objSearcher.Filter = $strFilter
	$objSearcher.SearchScope = "Subtree"

	$colProplist = "name","samaccountname","objectsid","displayname","mail","company","physicaldeliveryofficename","postofficebox","streetaddress","telephonenumber","postalcode","l","c","title","department","facsimiletelephonenumber"
	foreach ($i in $colPropList)
	{
		$objSearcher.PropertiesToLoad.Add($i)|out-null
	}

	$colResults = $objSearcher.FindAll()

	if($Verbose)
	{
		Write-Output "Domain:", $domaincnx
		Write-Output "Check AD for", $Userlogin
	}
	
	if($colResults.Count -gt 0)
	{
		Write-host "Total Users found in AD", $colResults.Count
		foreach($user in $colResults)
		{
			if($verbose)
			{
				Write-host "User found in AD", $user.Properties.name
			}
			$TempUser = $user
		}
	}
	return $TempUser
}

function Set-UserInfoDetails-Collection([string]$SiteCollectionURL, [string]$mydomaincnx)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	$site = new-object Microsoft.SharePoint.SPSite($SiteCollectionURL)
	$web = $site.openweb()

	#Debugging - show SiteCollectionURL
	Write-Output "SiteCollectionURL - $SiteCollectionURL"

	$siteCollUsers = $web.SiteUsers

	foreach($MyUser in $siteCollUsers)
	{
		if(($MyUser.LoginName.ToLower() -ne "sharepoint\system") -and ($MyUser.LoginName.ToLower() -ne "nt authority\authenticated users") -and ($MyUser.LoginName.ToLower() -ne "nt authority\local service"))
		{
			if($Verbose)
			{
				Write-Host "ID: ", $MyUser.Id
				Write-Host "SID: ", $MyUser.Sid
				Write-Host "  Login: ", $MyUser.LoginName
				Write-Host "  Name: ", $MyUser.Name
				Write-Host "  CollectionURL: ", $SiteCollectionURL
			}

			$userInfoDetails = $MyUser.ParentWeb.SiteUserInfoList.GetItemById($MyUser.ID)

			if($Verbose)
			{
				Write-Host ""
				Write-Host "Item ID: ", $userInfoDetails.ID
				Write-Host "Item DisplayName: ", $userInfoDetails.DisplayName 
				Write-Host "Item Name: ", $userInfoDetails.Name
			}

			$UserName = $MyUser.LoginName.ToLower()
			$Tablename = $UserName.split("\")

			[object]$myUserAD = Get-Users-From-ActiveDirectory $mydomaincnx $Tablename[1]
		
			Write-Host "myUserAD:", $Tablename[1], "result:", $myUserAD.Properties.name
			if($Verbose)
			{
				Write-Host "--------------------------------- "
				Write-host "sAMAccountName:", $myUserAD.Properties.samaccountname
				Write-host "User Name:", $myUserAD.Properties.name
				Write-host "objectSID:", $myUserAD.Properties.objectsid
        		Write-host "objectGUID:", $myUserAD.Properties.objectguid
				Write-host "Display name:", $myUserAD.Properties.displayname
				Write-host "Mail:", $myUserAD.Properties.mail
				Write-host "Company:", $myUserAD.Properties.company
				Write-host "physicalDeliveryOfficeName:", $myUserAD.Properties.physicaldeliveryofficename
				Write-host "postOfficeBox:", $myUserAD.Properties.postofficebox
				Write-host "streetAddress:", $myUserAD.Properties.streetaddress
				Write-host "telephoneNumber:", $myUserAD.Properties.telephonenumber
				Write-host "facsimiletelephonenumber:", $myUserAD.Properties.facsimiletelephonenumber
				Write-host "PostalCode:", $myUserAD.Properties.postalcode
				Write-host "l:", $myUserAD.Properties.l
		 		Write-host "c:", $myUserAD.Properties.c
		 			
				Write-Host "--------------------------------- "
			}

		 	if($myUserAD -ne $null)
			{
	 			[string]$AboutMe = TestExistingValue $myUserAD.Properties.telephonenumber "Phone"
				$AboutMe += TestExistingValue $myUserAD.Properties.facsimiletelephonenumber "Fax"
				$AboutMe += "<BR>"
				$AboutMe += TestExistingValue $myUserAD.Properties.company "Company"
				$AboutMe += TestExistingValue $myUserAD.Properties.physicaldeliveryofficename "Office"
				$AboutMe += TestExistingValue $myUserAD.Properties.postofficebox "PO Box"
				$AboutMe += TestExistingValue $myUserAD.Properties.streetaddress "Street"
				$AboutMe += TestExistingValue $myUserAD.Properties.postalcode "Postal Code"
				$AboutMe += TestExistingValue $myUserAD.Properties.l "City"
				$AboutMe += TestExistingValue $myUserAD.Properties.c "Country"
				$AboutMe += "<HR>FYI: Data coming from Active Directory, please contact your nearest IT Administrator for update"
				
				[string]$UserNtName = $myUserAD.Properties.samaccountname
				[string]$UserPreferedName = $myUserAD.Properties.displayname
				[string]$UserJob = $myUserAD.Properties.title
				[string]$UserDpt = $myUserAD.Properties.department
				[string]$UserSIP = $myUserAD.Properties.mail
				[string]$UserEmail = $myUserAD.Properties.mail

				if($Verbose){Write-Host "AD Result: ", $UserNtName, $UserPreferedName, $UserJob, $UserDpt, $UserSIP, $AboutMe, $UserEmail}

				# Set the basic UserInfo Data
                $MyUser.Name = [string]$myUserAD.Properties.name
				$MyUser.Email = $UserEmail
					
				# Set the detailed UserInfo Data
				$userInfoDetails["Name"] = $UserNtName
				$userInfoDetails["Title"] = $UserPreferedName
				$userInfoDetails["JobTitle"] = $UserJob
				$userInfoDetails["SipAddress"] = $UserSIP
				$userInfoDetails["Picture"] = "" #You can load it if you have the data in your AD
				$userInfoDetails["Notes"] = $AboutMe
				$userInfoDetails["EMail"] = $UserEmail
				$userInfoDetails["Department"] = $UserDpt

				$userInfoDetails.Update()
				$MyUser.Update()
				if($Verbose)
				{
					Write-Host "Modification OK"
				}
				$GLOBAL:TotalUsersUpdated += 1
			}
		}
		if($Verbose)
		{
			Write-Host " ------------------------------------------------- "
		}
	}
	$web.Dispose()
	$site.Dispose()

	write-host $GLOBAL:TotalUsersUpdated, "Total Users updated"
}

function Set-UserInfoDetails([string]$WebAppURL, [string]$DomainCNX)
{
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null

	$Thesite = new-object Microsoft.SharePoint.SPSite($WebAppURL)
	$oApp = $Thesite.WebApplication

	foreach ($Sites in $oApp.Sites)
	{
		$mySubweb = $Sites.RootWeb
		[string]$TempRelativeURL = $mySubweb.Url
		Set-UserInfoDetails-Collection $TempRelativeURL $DomainCNX
    }
	$Thesite.Dispose()
}

function StartProcess()
{
	# Create the stopwatch
	[System.Diagnostics.Stopwatch] $sw;
	$sw = New-Object System.Diagnostics.StopWatch
	$sw.Start()
	cls

	Set-UserInfoDetails "http://mySharePointWebApplication" "LDAP://DC=MyControler,DC=MyDomain,DC=com"

	$sw.Stop()
	# Write the compact output to the screen
	write-host $GLOBAL:TotalUsersUpdated " Users updated in Time: ", $sw.Elapsed.ToString()
	
}

cls
StartProcess
