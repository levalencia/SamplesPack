<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="JSOMSecurity.aspx.cs" Inherits="JSOMSecurity.Layouts.JSOMSecurity.JOSMSecurity" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    
    <script type="text/javascript" src="/_layouts/15/sp.runtime.debug.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.debug.js"></script>
     <script type="text/javascript" src="/_layouts/15/sp.init.js"></script>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/JSOMSecurity/Scripts/jquery-1.7.1.min.js"></script>
    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="/_layouts/15/JSOMSecurity/Style/App.css" />
    
     
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="/_layouts/15/JSOMSecurity/Scripts/App.js"></script>
    <script type="text/javascript" src="/_layouts/15/JSOMSecurity/Scripts/security.js"></script>
    
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
<div class="basicJSOMContainer">
        
        <div class="resultsDisplayHeaderSingle">
            Results
        </div>
        
    
        <div id="results" class="resultsDisplaySingle" ></div>
         <input type="button" id="securityButton1" value="Check Security" />
         <input type="button" id="securityButton2" value="Get Groups" />
         <input type="button" id="securityButton3" value="Add User" />
         <input type="button" id="securityButton4" value="Remove User" />
         <input type="button" id="securityButton5" value="Add Role" />
         
         
    </div>
    

</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
JSOM Security Application Page
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
JSOM Security Application Page
</asp:Content>
