[string]$WOPIServerAddress = "WOPIServerName.Full.QualifiedName.com"

Function WriteLine
{
    Write-Host -ForegroundColor White "--------------------------------------------------------------"
}

Function ActivateWOPIService
{
	Try
	{
		# Activation of WOPI
		WriteLine
		Write-Host -ForegroundColor White " - Activation of WOPI solution ..."
		New-SPWOPIBinding -ServerName $WOPIServerAddress -AllowHTTP
		Set-SPWOPIZone -zone "internal-http"
		(Get-SPSecurityTokenServiceConfig).AllowOAuthOverHttp
		$config = (Get-SPSecurityTokenServiceConfig)
		$config.AllowOAuthOverHttp = $true
		$config.Update()
		(Get-SPSecurityTokenServiceConfig).AllowOAuthOverHttp
	}
	catch  [system.exception]
	{
        Write-Host -ForegroundColor Yellow " ->> Activate WOPI Service caught a system exception"
		Write-Host -ForegroundColor Red "Exception Message:", $_.Exception.ToString()
	}
	finally
	{
        WriteLine
	}
}

ActivateWOPIService
