[string]$AliasName = "MySQLServerAlias"
[string]$configPassphrase = "MySharePointPassPhrase!"
$s_configPassphrase = (ConvertTo-SecureString -String $configPassphrase -AsPlainText -force) 

[string]$dbConfig = "My_SP2013_ConfigDB"
[string]$dbCentralAdmin = "My_SP2013_CentralAdmin_ContentDB"
[integer]$caPort = 2013 
[string]$caAuthProvider = "NTLM"

Function WriteLine
{
    Write-Host -ForegroundColor White "--------------------------------------------------------------"
}

# ---------------------------------------------------------------------
Function CreateSPFarmDBAndCentralAdmin
{
	Try
	{
		######################################## 
		# Create the farm 
		WriteLine
		Write-Host -ForegroundColor White " - Creation of the SharePoint farm ..."
		  
		WriteLine
		Write-Output "Creating the configuration database $dbConfig"
		New-SPConfigurationDatabase -DatabaseName $dbConfig -DatabaseServer $AliasName -AdministrationContentDatabaseName $dbCentralAdmin -Passphrase  $s_configPassphrase
		# -FarmCredentials $farmCredential 

		WriteLine
		# Check to make sure the farm exists and is running. if not, end the script 
		WriteLine
		$farm = Get-SPFarm
		if (!$farm -or $farm.Status -ne "Online") { 
			Write-Output "Farm was not created or is not running"
			exit 
		} 

		WriteLine  
		Write-Output "Create the Central Administration site on port $caPort"
		New-SPCentralAdministration -Port $caPort -WindowsAuthProvider $caAuthProvider
		WriteLine
		  
		# Perform the config wizard tasks 
		  
		WriteLine
		Write-Output "Install Help Collections"
		Install-SPHelpCollection -All 
		  
		Write-Output "Initialize security"
		Initialize-SPResourceSecurity 
		  
		Write-Output "Install services"
		Install-SPService 
		  
		Write-Output "Register features"
		Install-SPFeature -AllExistingFeatures -Force
		  
		Write-Output "Install Application Content"
		Install-SPApplicationContent

		WriteLine
		# ---------------------------------------------------------------------
 	}
	catch  [system.exception]
	{
        Write-Host -ForegroundColor Yellow " ->> Create SPFarm DB And Central Admin caught a system exception"
		Write-Host -ForegroundColor Red "Exception Message:", $_.Exception.ToString()
	}
	finally
	{
        WriteLine
	}
}

CreateSPFarmDBAndCentralAdmin

#Start Central Administration 
WriteLine
Write-Output "Starting Central Administration"
& 'C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\15\BIN\psconfigui.exe' -cmd showcentraladmin 
  
Write-Output "Farm build complete."
WriteLine
