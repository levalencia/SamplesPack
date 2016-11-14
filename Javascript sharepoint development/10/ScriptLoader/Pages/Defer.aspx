<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.debug.js"></script>

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

   
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <ul>
        <li><a href='ScriptTag.aspx'>Script Tag</a></li>
        <li><a href='Defer.aspx'>Defer</a></li>
        <li><a href='ExecuteFunc.aspx'>ExecuteFunc</a></li>
        <li><a href='FlagVar.aspx'>FlagVar</a></li>
    </ul>
    <div>
        <p id="message" />
    </div>
    
    <script src="//wingtipserver/sites/s43/Scripts/JQuery/1.8.3/jquery-1.8.3.min.js"></script>
    <!--Load a custom library with DEFER.  Use ExecuteOrDelayUntilScriptLoaded to ensure the 
        library has downloaded before we call the function in the library
    -->
     <script defer src="//wingtipserver/sites/s43/scripts/custom/Library2.js" ></script>
    <script>
        var s43 = s43 || {};
        //this is a wrapper function.  ExecuteOrDelayUntilScriptLoaded needs a existing 
        //callback function in order to work
        s43.func2Caller = function() {
            s43.libraryFunction2();
        }
        ExecuteOrDelayUntilScriptLoaded(s43.func2Caller, "s43.Library2");
        </script>

    
   
</asp:Content>
