<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-3.2.0.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>

    <script type="text/javascript">
        $(document).ready(startProcessing);
        function startProcessing() {
            ko.applyBindings(new GradeViewModel());
        }
        function GradeViewModel() {
            this.student = ko.observable('Steve Wright');
            this.course = ko.observable('Creative Writing');
            this.term = ko.observable('Spring 2013');
            this.hours = ko.observable(4);
            this.grade = ko.observable('B-');
            this.gpaPoints = ko.observable(3.0);
            this.className =
            ko.computed(
            function () { return this.course() + " (" + this.term() + ")"; }
            , this);

            this.validateData = function () {
                if (this.student().length == 0) alert("Student name is blank.");
                if (this.course().length == 0) alert("Course name is blank.");
                if (this.term().length == 0) alert("Academic term is blank.");
                if (this.grade().length == 0) alert("Grade is blank.");
                if ((isNaN(this.hours())) || (parseInt(this.hours()) <= 0))
                    alert("Credit hours is not a positive number.");
                if ((isNaN(this.gpaPoints())) || (parseInt(this.gpaPoints()) <= 0))
                    alert("GPA points is not a positive number.");
            }
            this.requireNumeric = function (mv, event) {
                if (isNaN($(event.target).val())) {
                    alert("This field must be a number");
                    $(event.target)
                    .val(0) // Set the value to "0"
                    .trigger("change"); // First the CHANGE event to update Knockout.
                }
            }
        };
    </script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <h1>Data Binding with Knockout</h1>
    
    <div>
        <h2>Read/Only</h2>
        <table>
            <tr>
                <td>Student Name:</td>
                <td><span data-bind="text: student"></span></td>
            </tr>
            <tr>
                <td>Course Name:</td>
                <td><span data-bind="text: course"></span></td>
            </tr>
            <tr>
                <td>Academic Term:</td>
                <td><span data-bind="text: term"></span></td>
            </tr>
            <tr>
                <td>Credit Hours:</td>
                <td><span data-bind="text: hours"></span></td>
            </tr>
            <tr>
                <td>Grade:</td>
                <td><span data-bind="text: grade"></span></td>
            </tr>
            <tr>
                <td>GPA Points Earned:</td>
                <td><span data-bind="text: gpaPoints"></span></td>
            </tr>
            <tr>
                <td>Class Name:</td>
                <td><span data-bind="text: className"></span></td>
            </tr>
        </table>
    </div>
    <div>
        <h2>Editable</h2>
        <table>
            <tr>
                <td>Student Name:</td>
                <td>
                    <input data-bind="value: student" /></td>
            </tr>
            <tr>
                <td>Course Name:</td>
                <td>
                    <input data-bind="value: course" /></td>
            </tr>
            <tr>
                <td>Academic Term:</td>
                <td>
                    <input data-bind="value: term" /></td>
            </tr>
            <tr>
                <td>Credit Hours:</td>
                 <td>
                    <input data-bind="value: hours, event: { change: requireNumeric }" />
                </td>
            </tr>
            <tr>
                <td>Grade:</td>
                <td>
                    <input data-bind="value: grade" /></td>
            </tr>
            <tr>
                <td>GPA Points Earned:</td>
                <td>
                    <input data-bind="value: gpaPoints, event: { change: requireNumeric }" />
                </td>
            </tr>
        </table>
    </div>

    <button data-bind="click: validateData">Validate Data</button>

</asp:Content>
