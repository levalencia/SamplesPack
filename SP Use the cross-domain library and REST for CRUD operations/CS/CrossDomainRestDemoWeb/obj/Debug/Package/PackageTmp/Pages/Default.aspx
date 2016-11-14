﻿<%@ Page Language="C#" MasterPageFile="~/Pages/RemoteWeb.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CrossDomainRestDemoWeb.Pages.Default" %>

<asp:Content ContentPlaceHolderID="PlaceholderAdditionalPageHead" runat="server">
  <script src="../Scripts/default.js"></script>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="PlaceholderMain" runat="server">

  <div id="toolbar">
    <input type="button" id="cmdAddNewCustomer" value="Add New Customer" class="ms-ButtonHeightWidth" />
  </div>

  <div id="results" ></div>

  <div id="addCustomerDialog" style="display:none;" >
      <table id="customerEditTable">
        <tr>
          <td>First Name:</td>
          <td><input id="txtFirstName" /></td>
        </tr>
        <tr>
          <td>Last Name:</td>
          <td><input id="txtLastName" /></td>
        </tr>
        <tr>
          <td>Work Phone:</td>
          <td><input id="txtWorkPhone" /></td>
        </tr>
      </table>
  </div>

</asp:Content>
