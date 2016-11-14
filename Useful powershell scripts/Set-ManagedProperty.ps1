#################################### Set-ManagedProperty.PS1 ######################################
#                                                                                                 #
#    Script name:                 Set managed property(-ies)                                      #
#    Author:                      Sergey Zelenov (szelenov@microsoft.com), Microsoft PFE UK       #
#                                                                                                 #
#    Synopsis:                    Creates a set of managed search properties in a MOSS search     #
#                                 configuration and maps them to crawled properties as            #
#                                 specified                                                       #
#                                                                                                 #
#    Output:                      None (writes status messages to interactive console only)       #
#                                                                                                 #
#    Input                                                                                        #
#    parameters:                                                                                  #
#                                                                                                 #
#                  -url	          Type:          System.Uri                                       #
#                                 Value:         Url of target SharePoint Web Application (any    #
#                                                web application associated with the target SSP)  #
#                                 Mandatory:     Yes                                              #
#                                 Default value: None                                             #
#                                                                                                 #
#                  -props         Type:          System.String[]                                  #
#                                 Value:         Array of strings each representing a managed     #
#                                                property/crawled property mapping. For record    #
#                                                value format example please see default value in #
#                                                the script code below                            #
#                                 Mandatory:     No (only used if no input received from          #
#                                                pipeline)                                        #
#                                 Default value: String containing values required by Podcasting  #
#                                                Kit fot SharePoint (http://pks.codeplex.com)     #
#                                                                                                 #
#                  -file          Type:          System.String                                    #
#                                 Value:         Path to a text file containing input values. For #
#                                                record value format example please see default   #
#                                                value in the script code below                   #
#                                 Mandatory:     No (only used if no input received from          #
#                                                pipeline)                                        #
#                                 Default value: None                                             #
#                                                                                                 #
#    .NET Assemblies loaded:      Microsoft.SharePoint, Version=12.0.0.0 , Culture=Neutral,       #
#                                 PublicKeyToken=71e9bce111e9429c                                 #
#                                                                                                 #
####################################### Microsoft © 2009 ##########################################
param ([uri]$url, $file, $props = @"
AuthorID:Decimal:ows_AuthorID:
Confidentiality:Text:ows_Confidentiality:
CsId:Text:ows_CsId:
Downloads:Decimal:ows_Total_x0020_Downloads:
Format:Text:ows_Format:
ItemID:Integer:ows_ID:
Language:Text:ows_PodcastLanguage:
ListContentType:Text:ows_ContentType:True
PodcastAuthor:Text:ows_PodcastAuthor:
PodcastCoAuthors:Text:ows_PodcastCoAuthors:
PodcastDuration:Text:ows_PodcastDuration:
PodcastPublishDate:DateTime:ows_PodcastPublishDate:
PodcastSize:Text:ows_PodcastSize:
PodcastThumbnail:Text:ows_PodcastThumbnail:
Rating:Text:ows_Rating:
Tags:Text:ows_Tags:
CoAuthorIds:Text:ows_CoAuthorIds:
"@
, [switch]$debug)

# The script uses the begin-processing/process-object/end-processing clause structure of PowerShell in order to accomodate
# input either from the pipeline or from parameters

begin # This clause is executed before the first input object comes through the pipeline
{
    # Load the required SharePoint assemblies containing the classes used in the script
    # The Out-Null cmdlet instructs the interpreter to not output anything to the interactive shell
    # Otherwise information about each assembly being loaded would be displayed
    [Reflection.Assembly]::Load("Microsoft.SharePoint,Version=12.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c") | Out-Null
    [System.Reflection.Assembly]::Load("Microsoft.Office.Server.Search, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c") | Out-Null
    
    if ($debug){$DebugPreference = "Continue"}
    
    # Initialize the variable to store the input
    # Using ArrayList class instead of a usual array only for its ability to dynamically expand, i.e. add members by simple addition (+)
    # This is not a native type in PowerShell, so needs to be initialized using New-Object cmdlet
    $io = New-Object System.Collections.ArrayList;
}

process # This clause is executed for each input object coming through the pipeline
{
    # Add each object that comes through the pipeline to the input array list
    if ($_) {$io += $_}
}

end # This clause is executed after all input is received
{
    # Check if any input was received from the pipeline; if not try and get it from parameters
    if ($io.Count -eq 0)
    {
        if ($props)
        {
           $io = $props.Split("`n");
        }
        elseif ($file)
        {
           $io = Get-Content -Path $file;
        }

        # If neither -props nor -file were specified, stop execution
        else {break}
    }

    # Bind to the site collection specirfied in the -url parameter
    $site = New-Object -typeName Microsoft.SharePoint.SPSite -ArgumentList $url;

    # Obtain the search context using the site collection object, and then using this context to bind to the property metadata management system class
    $sspSchema = New-Object -typeName Microsoft.Office.Server.Search.Administration.Schema -argumentList $([Microsoft.Office.Server.Search.Administration.SearchContext]::GetContext($site));

    # Process the input one record at a time
    foreach ($record in $io)
    {
        # Split the record string into separate values and store them under appropriate names in a newly created hashtable
        $prhash = @{name=$record.Split(":")[0];type=$record.Split(":")[1];cpname=$record.Split(":")[2];inscopes=[bool]($record.Split(":")[3])};

        # Use the Schema object to bind to the target crawled property
        $cprop = $sspSchema.AllCategories | ForEach-Object {$_.GetAllCrawledProperties()} | Where-Object {$_.Name -eq $prhash.cpname};
        
        # If the crawled property could not be identified by the name supplied, display an error message
        if (-not $cprop) 
        {
           Write-Host -Object "Crawled property " -NoNewline -BackgroundColor Black -ForegroundColor Red;
           Write-Host -Object $prhash.cpname -NoNewline -BackgroundColor Black -ForegroundColor Yellow;
           Write-Host -Object $(" could not be found in search application " + $sspSchema.SearchApplication.Name) -BackgroundColor Black -ForegroundColor Red;
           Write-Host;
        }

        # If the crawled property was successfully found, try and process the record
        else
        {
           Write-Host -Object "Checking managed property " -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Green;
           Write-Host -Object $prhash.name -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
           Write-Host -Object "..." -BackgroundColor DarkMagenta -ForegroundColor Green;

           # Obtain the property set and type of the crawled property and store them in the same hashtable that stores the input information
           $prhash.cppropset, $prhash.cpvtype = $cprop.Propset, $cprop.VariantType;

           # If a managed property with the same name already exists, display an information message
           if ($sspSchema.AllManagedProperties.Contains($prhash.name))
           {
              Write-Host -Object "Managed property " -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Green;
              Write-Host -Object $prhash.name -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
              Write-Host -Object $(" already exists in search application " + $sspSchema.SearchApplication.Name) -BackgroundColor DarkMagenta -ForegroundColor Green;

              # Bind to the existing managed property for later mapping
              $mprop = $sspSchema.AllManagedProperties[$prhash.name];
           }
            
           # Create a new managed property
           else
           {
              Write-Host -Object "Creating managed property " -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Green;
              Write-Host -Object $prhash.name -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
              Write-Host -Object "..." -BackgroundColor DarkMagenta -ForegroundColor Green;

              $mprop = $sspSchema.AllManagedProperties.Create($prhash.name,[Microsoft.Office.Server.Search.Administration.ManagedDataType]::($prhash.type));

              # Check if property was actually created
              if ($mprop)
              {
                 Write-Host -Object "Managed property " -NoNewline -ForegroundColor Green -BackgroundColor DarkMagenta;
                 Write-Host -Object $mprop.Name -NoNewline -ForegroundColor Yellow -BackgroundColor DarkMagenta;
                 Write-Host -Object " created successfully" -ForegroundColor Green -BackgroundColor DarkMagenta;

                 # Set the "Use in scopes" attributes using the value from input
                 $mprop.EnabledForScoping = $prhash.inscopes;

                 # Set the flag to be used in error handling
                 $pcreated = $true;
              }
			}
            
            # Check whether everything done so far was successful and proceed if positive
            if ($?)
            {
               Write-Host -Object "Checking property mappings for property " -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Green;
               Write-Host -Object $prhash.name -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
               Write-Host -Object "..." -BackgroundColor DarkMagenta -ForegroundColor Green;

               # Get the collection of mappings for the newly created or discovered managed property
               $mapcol = $mprop.GetMappings();

               # Initialize a new Mapping object using values from the property hashtable
               $mapping = New-Object -TypeName Microsoft.Office.Server.Search.Administration.Mapping `
                  -ArgumentList $prhash.cppropset, $prhash.cpname, $prhash.cpvtype, $mprop.PID;

               # Check whether the managed property is already mapped to the target crawled property    
               if ($mapcol.Contains($mapping))
               {
                  Write-Host -Object "Crawled property " -NoNewline -ForegroundColor Green -BackgroundColor DarkMagenta;
                  Write-Host -Object $prhash.cpname -NoNewline -ForegroundColor Yellow -BackgroundColor DarkMagenta;
                  Write-Host -Object " is already mapped to managed property " -NoNewline -ForegroundColor Green -BackgroundColor DarkMagenta;
                  Write-Host -Object $mprop.Name -ForegroundColor Yellow -BackgroundColor DarkMagenta;
                  Write-Host;
               }

               # Map the managed property to the target crawled property
               else
               {
                  Write-Host -Object "Mapping managed property " -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Green;
                  Write-Host -Object $mprop.name -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
                  Write-Host -Object " to crawled property " -NoNewLine -BackgroundColor DarkMagenta -ForegroundColor Green;
                  Write-Host -Object $prhash.cpname -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
                  Write-Host -Object "..." -BackgroundColor DarkMagenta -ForegroundColor Green;

                  # Define the error handling routine that will intercept any exception thrown by any stement in this else{} scriptblock
                  trap 
                  {
                      # Display the error message to the user
                      Write-Host -Object $("Error: " + $_.Exception.Message) -ForegroundColor Red -BackgroundColor Black;

                      # If a new managed property was created, try and delete it in order to roll back to the original search configuration
                      if ($pcreated)
                      {
                         Write-Host -Object "Deleting managed property " -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Green;
                         Write-Host -Object $mprop.name -NoNewline -BackgroundColor DarkMagenta -ForegroundColor Yellow;
                         Write-Host -Object "..." -BackgroundColor DarkMagenta -ForegroundColor Green;
                         Write-Host;
                         $mprop.Delete();
                         $pcreated = $false;
                      }

                      # Continue execution (will try to process all remaining input records)
                      continue;
                  }

                  # Add the new mapping to the mappings collection
                  $mapcol.Add($mapping);

                  # Assign the updated collection to the managed property
                  $mprop.SetMappings($mapcol);

                  # If no errors were raised, display a success message
                  if ($?)
                  {
                     Write-Host -Object "Managed property " -NoNewline -ForegroundColor Green -BackgroundColor DarkMagenta;
                     Write-Host -Object $mprop.name -NoNewline -ForegroundColor Yellow -BackgroundColor DarkMagenta;
                     Write-Host -Object " mapped to crawled property " -NoNewline -ForegroundColor Green -BackgroundColor DarkMagenta;
                     Write-Host -Object $prhash.cpname -NoNewline -ForegroundColor Yellow -BackgroundColor DarkMagenta;
                     Write-Host -Object " successfully" -ForegroundColor Green -BackgroundColor DarkMagenta;
                     Write-Host;
                  }
              }
           }
            
           # Nullilfy the managed property variable ready for the next record
           $mprop = $null;
        }
    }
}