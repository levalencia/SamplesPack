PARAM(
	[Parameter(Mandatory=$true, HelpMessage="Enter the uri for the domain (e.g. www.contoso.com).")][string]$Domain,
	[Parameter(Mandatory=$true, HelpMessage="Enter the full path where the certificates will be created.")][string]$OutputDir,
	[Parameter(Mandatory=$true, HelpMessage="Enter the password for the certificate.")][string]$Password
)

if (-not $outputDir.EndsWith('\'))
{
	$outputDir += "\"
}

$makecert = "C:\Program Files\Microsoft Office Servers\15.0\Tools\makecert.exe"
$certmgr = "C:\Program Files\Microsoft Office Servers\15.0\Tools\certmgr.exe"

New-Item $outputDir -ItemType Directory -Force -Confirm:$false | Out-Null

$pubCert = $outputDir + $domain + ".cer"
$privateCert = $outputDir + $domain + ".pfx"

$output = & $makecert -r -pe -n "CN=$domain" -b 01/01/2013 -e 01/01/2023 -eku 1.3.6.1.5.5.7.3.1 -ss my -sr localMachine -sky exchange -sy 12 -sp "Microsoft RSA SChannel Cryptographic Provider" $pubCert

$output = & $certmgr /add $pubCert /s /r localMachine root

$publicCertificate = Get-PfxCertificate -FilePath $pubCert
$publicCertificateThumbprint = $publicCertificate.Thumbprint

Get-ChildItem cert:\\localmachine\my | Where-Object {$_.Thumbprint -eq $publicCertificateThumbprint} | ForEach-Object {
$privateCertificateByteArray = $_.Export("PFX", $password)
[System.IO.File]::WriteAllBytes($privateCert, $privateCertificateByteArray)
}
