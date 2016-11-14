<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script> 
    <script type="text/javascript" src="/_layouts/15/sp.debug.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.init.js"></script>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="../Scripts/ListManager.js"></script>
    <script type="text/javascript" src="../Scripts/ListItemManager.js"></script>

    <!-- Add your CSS styles to the following file -->
     <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/crud.js"></script>
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolderMain" runat="server">

  <div class="basicJSRESTContainer">
        
        <div class="resultsDisplayHeaderSingle">
            Results
        </div>
        
    
          <div id="results" class="resultsDisplaySingle" ></div>
          <input type="button" id="crudButton1" Value="Read Lists" />
          <input type="button" id="crudButton2" Value="Read List Items" />
          <input type="button" id="crudButton2a" Value="Read List Items - paged" />
          <input type="button" id="crudButton2b" Value="Read List Items - incorrectly paged" />
          <input type="button" id="crudButton11" Value="Filter children (Expand)" />
      <input type="button" id="crudButton10" Value="Get List Fields (Expand)" />
      <br />    
          <input type="button" id="crudButton3" Value="Create List" />
          <input type="button" id="crudButton4" Value="Create List Item" />
      <br />
          <input type="button" id="crudButton5" Value="Update List Item" />
          <input type="button" id="crudButton6" Value="Delete List Item" />
          <input type="button" id="crudButton7" Value="Delete List" />
      <br />
          <input type="button" id="crudButton8" Value="Create Item in New List" />
          <input type="button" id="crudButton9" Value="Add Text Field" /> 
          
          

          
         
    </div>
    

</asp:Content>
