function Get-Best-Bets([string]$SiteCollectionURL)
{
	# Create the stopwatch
	[System.Diagnostics.Stopwatch] $sw;
	$sw = New-Object System.Diagnostics.StopWatch
	$sw.Start()

	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Server.Search") > $null

	$Thesite = new-object Microsoft.SharePoint.SPSite($SiteCollectionURL)

	$searchContext =  [Microsoft.Office.Server.Search.Administration.SearchContext]::GetContext($Thesite)
	$myURI = new-object system.URI($SiteCollectionURL)

	$keywords =  new-object Microsoft.Office.Server.Search.Administration.Keywords($searchContext,$myURI)
	
	foreach($Keyword in $keywords.AllKeywords)
	{
		write-host "---------------------------------------------------"
		write-host "KeyWord Term: ", $Keyword.Term
		foreach($MySynonym in $Keyword.Synonyms)
		{
			write-host "Synonym Term: ", $MySynonym.Term
		}
		foreach($MyBestBet in $Keyword.BestBets)
		{
			write-host "BestBet Title: ", $MyBestBet.Title
			write-host "BestBet Url: ", $MyBestBet.Url
			write-host "BestBet Description: ", $MyBestBet.Description
		}

		write-host "KeyWord Definition: ", $Keyword.Definition
		write-host "KeyWord Contact: ", $Keyword.Contact
		write-host "KeyWord Start Date: ", $Keyword.StartDate
		write-host "KeyWord End Date: ", $Keyword.EndDate
		write-host "KeyWord Review Date: ", $Keyword.ReviewDate

		write-host "---------------------------------------------------"
		
	}
	
	
	$Thesite.Dispose()
	$sw.Stop()

	# Write the compact output to the screen
	write-host "Time: ", $sw.Elapsed.ToString()

}

function Clean-KeyWord([object]$kwCollection, [string]$kwTerm)
{
	$teskwtexist = 0 
	foreach($Keyword in $kwCollection.AllKeywords)
	{
		if($Keyword.Term -eq $kwTerm)
		{
			$teskwtexist = 1
		}
	}
	if($teskwtexist -eq 1)
	{
		write-host "Delete: ", $kwCollection.AllKeywords.Item($kwTerm).Term
		$kwCollection.AllKeywords.Item($kwTerm).Delete()
	}
}

function Set-All-Best-Bets([string]$SiteCollectionURL)
{

	# Create the stopwatch
	[System.Diagnostics.Stopwatch] $sw;
	$sw = New-Object System.Diagnostics.StopWatch
	$sw.Start()
	$Mydate = "01/01/2008"
	$MyContact = "Fabrice Romelard"

	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.SharePoint") > $null
	[System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Server.Search") > $null

	$Thesite = new-object Microsoft.SharePoint.SPSite($SiteCollectionURL)

	$searchContext =  [Microsoft.Office.Server.Search.Administration.SearchContext]::GetContext($Thesite)
	$myURI = new-object system.URI($SiteCollectionURL)

	$keywords =  new-object Microsoft.Office.Server.Search.Administration.Keywords($searchContext,$myURI)

# ------------------------------------------------------------------------------------------------
# ---- WORDS ------
# ------------------------------------------------------------------------------------------------

	# BEST BETS - WORD1
	Clean-KeyWord $keywords "WORD1"
	$keyword1 = $keywords.AllKeywords.Create("WORD1", $Mydate)
	$Keyword1.Definition = "My Word 1"
	$Keyword1.Contact = $MyContact
	$BBUri1 = new-object system.Uri("http://myWebApplication/sites/mysite1/")
	$bestBet1 = $keyword1.BestBets.Create("My site1 titel", "My site1 titel", $BBUri1)
	$synonym1 = $keyword1.Synonyms.Create("MyWord1")
	$synonym1 = $keyword1.Synonyms.Create("My Word 1 complete")
	$synonym1 = $keyword1.Synonyms.Create("My Word 1 detailed")
	$keyword1.Update()

	# BEST BETS - WORD2
	Clean-KeyWord $keywords "WORD2"
	$keyword1 = $keywords.AllKeywords.Create("WORD2", $Mydate)
	$Keyword1.Definition = "My Words 2"
	$Keyword1.Contact = $MyContact
	$BBUri1 = new-object system.Uri("http://myWebApplication/sites/mysite2/")
	$bestBet1 = $keyword1.BestBets.Create("My site1 tite2", "My site1 tite2", $BBUri1)
	$BBUri1 = new-object system.Uri("http://myWebApplication/sites/mysite3/")
	$bestBet1 = $keyword1.BestBets.Create("My site1 tite3", "My site1 tite3", $BBUri1)
	$synonym1 = $keyword1.Synonyms.Create("SYNONYM1")
	$synonym1 = $keyword1.Synonyms.Create("SYNONYM2")
	$synonym1 = $keyword1.Synonyms.Create("SYNONYM3")
	$synonym1 = $keyword1.Synonyms.Create("SYNONYM4")
	$synonym1 = $keyword1.Synonyms.Create("MyWord2")
	$synonym1 = $keyword1.Synonyms.Create("My Word 2 complete")
	$synonym1 = $keyword1.Synonyms.Create("My Word 2 detailed")
	$keyword1.Update()

	# YOU CAN ADD EACH BEST BET YOU WANT IN YOUR SEARCH RESULTS AS YOU CAN SEE BEFORE


	$Thesite.Dispose()
	$sw.Stop()

	# Write the compact output to the screen
	write-host "Time: ", $sw.Elapsed.ToString()

}

cls
#Set-All-Best-Bets "http://myWebApplication1/sites/mysitecollection/"
Get-Best-Bets "http://myWebApplication1/sites/mysitecollection/"

#Set-All-Best-Bets  "http://myWebApplication2"
Get-Best-Bets "http://myWebApplication2"
