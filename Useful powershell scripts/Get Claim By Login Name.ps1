$m = [Microsoft.SharePoint.Administration.Claims.SPClaimProviderManager]::Local
Add-PSSnapin Microsoft.SharePoint.PowerShell -ea silentlycontinue 
Function Get-SPClaim {
    param ([string]$user)
    $claim = New-SPClaimsPrincipal -identity $user -IdentityType "WindowsSamAccountName"
    return $m.EncodeClaim($claim)
}

#ChangeUser.ps1 OldUser NewUser
$PersonField = "ContactsOnPage";
$siteUrl = "https://be-slice.be.ema.pwcinternal.com";
	
$userToRemove = get-SPClaim($args[0]); 
$newUser = get-SPClaim($args[1]);
$removeUserArg = $args[2];

if ($userToRemove -ne $null -And $newUser -ne $null)
{
	$site = Get-SPSite $siteUrl;
	$totalWebs = $site.AllWebs.Count

	$Now = Get-Date
	write-host "Begin: $Now";

	foreach ($web in $site.AllWebs)
	{
		$progress = [int]($counter / $totalWebs * 100);
		$counter++;
		Write-Progress -Activity "Change User On All Sites" -status "User changed on $counter of $totalWebs site." -perc $progress;

		# User to remove
		$removeUser = $web.AllUsers[$userToRemove];
		# User to add
		$addUser = $web.AllUsers[$newUser];
		
		# Change Contacts On Page
		$list = $web.Lists["Pages"];
		if ($list.Items -ne $null)
		{
			foreach ($page in $list.Items) 
			{
				if ($page[$PersonField] -ne $null)
				{	
					$values = [Microsoft.SharePoint.SPFieldUserValueCollection]$page[$PersonField];
					
					foreach ($value in $values)
					{
						if ($value.LookupId -eq $removeUser.ID)
						{
							$check = $values.Remove($value);
							
							# User to add
							$addUserValue = new-object Microsoft.SharePoint.SPFieldUserValue($web, $addUser.ID, $addUser.Name);
							$values.Add($addUserValue);
							
							
							# Update field value
							$page[$PersonField] = $values;
							$page.SystemUpdate();
							
							break;
						}
					}
				}
			}
		}
		
		# Change User In Group
		foreach ($group in $web.AssociatedGroups)
		{
			foreach ($user in $group.Users)
			{
				if ($user.ID -eq $removeUser.ID)
				{
					$group.Users.Remove($user.LoginName);
					
					if ($removeUserArg -eq "-replace")
					{
						$group.Users.Add($addUser.LoginName, $addUser.Email, $addUser.Name, $addUser.Notes);
					}
				}
			}
		}
		
		$web.Dispose();
	}
	$site.Dispose();

	$Now = Get-Date
	write-host "Finished: $Now";
}
else 
{
	write-host "You need to execute the script with the following parameters: ChangeUser.ps1 OldUser NewUser." -foregroundcolor red;
}