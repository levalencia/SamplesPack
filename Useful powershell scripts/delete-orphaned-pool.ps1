################################################################
## Script de suppression de pool d'application                ##
## 03/2009 - Christophe RIT - Microsoft                       ##
################################################################

[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint")

## L'instruction Params sera utile dès PShell v2
## PARAM($admin, $poolname, $logfile)

$logfile  = $args[1]
$poolname = $args[0]


## Fonction principale du script
function main()
{
	if ($poolname)
	{
		$apadm = ([Microsoft.SharePoint.Administration.SPWebService]::AdministrationService.ApplicationPools | where {$_.Displayname -like $poolname})
		$apctn = ([Microsoft.SharePoint.Administration.SPWebService]::ContentService.ApplicationPools | where {$_.Displayname -like $poolname})
		if ($apadm)
		{
			if ($apctn)
			{
				Write-Host -foregroundcolor red "Erreur : Pool d'application trouvé dans les sites administratifs et contenu"
	
			}
			else
			{
				if ($apadm.count)
				{

					Write-Host -foregroundcolor red "Erreur : Plusieurs pool d'application correspondent à la demande, merci de ne pas utiliser de symbole d'inclusion générique"
				}
				else
				{
					$myservice = ([Microsoft.SharePoint.Administration.SPWebService]::AdministrationService)
					$ap = $apadm
				}
			}
		}
		else
		{
			if ($apctn)
			{
				if ($apcnt.count)
				{

					Write-Host -foregroundcolor red "Erreur : Plusieurs pool d'application correspondent à la demande, merci de ne pas utiliser de symbole d'inclusion générique"
				}
				else
				{
					$myservice = ([Microsoft.SharePoint.Administration.SPWebService]::ContentService)
					$ap = $apctn
					
				}
			}
			else
			{
					Write-Host -foregroundcolor red "Erreur : Aucun pool d'application ne correspond à la demande"

			}
		}
		if ($myservice)
		{
			trap [Exception]
			{
				$exc = $_.Exception.Message	
				Write-Host -foregroundcolor red "Erreur : Impossible de supprimer le pool $ap. Il est probablement en cours d'utilisation sur IIS."
				continue
			}
			$myservice.ApplicationPools.Remove($ap.id)
			$myservice.Update($true)
			if ($exc -eq $void) { Write-Host -foregroundcolor green "Pool d'application $ap.DisplayName supprimer avec succès de $myservice" }
		}
		

	}
	else
	{
			Write-Host -foregroundcolor red "Merci de préciser le nom du pool d'application recherché"
	}

}
## Si un fichier de log a t fourni, dmarrage du transcript PowerShell
if ($logfile )
{
	start-transcript -path $logfile -append
}

## Lancement de la mthode principale
Main

## Si un fichier de log a t fourni, arrt du transcript PowerShell
if ($logfile)
{
	stop-transcript
}


