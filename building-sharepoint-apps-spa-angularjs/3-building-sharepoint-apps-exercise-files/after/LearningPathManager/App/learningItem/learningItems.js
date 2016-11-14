(function () {
  'use strict';

  // define controller
  var controllerId = "learningItems";
  angular.module('app').controller(controllerId,
    ['$location', 'common', learningItems]);

  // create controller
  function learningItems($location, common) {
    var vm = this;

    // navigate to the specified item
    vm.gotoItem = gotoItem;
    // collection of learning items
    vm.learningItems = dummyLearningItems;

    // init controller
    init();

    // init controller
    function init() {
      common.logger.log("controller loaded", null, controllerId);
      common.activateController([], controllerId);
    }

    // navigate to the specified item
    function gotoItem(learningItem) {
      if (learningItem && learningItem.Id) {
        $location.path('/LearningItems/' + learningItem.Id);
      }
    }

  };

  // sample data
  var dummyLearningItems = [
        {
          "__metadata": {
            "id": "c89cc066-5554-4b2a-af57-83b8f03eb3d3",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(1)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 1,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 - What you need to know",
          "ItemType": "Blog Post",
          "LearningPathId": 1,
          "URL": {
            "__metadata": {
              "type": "SP.FieldUrlValue"
            },
            "Description": "http://www.andrewconnell.com/blog/SP2013-What-you-need-to-know",
            "Url": "http://www.andrewconnell.com/blog/SP2013-What-you-need-to-know"
          },
          "OData__Comments": null,
          "ID": 1,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "c8e6ca37-bc3a-4c6c-ba21-5c2bec9825dd"
        },
        {
          "__metadata": {
            "id": "f56ff062-1ede-40ff-9d76-18916523ad8a",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(2)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 2,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Understanding SharePoint 2013 Apps (aka: Apps 101)",
          "ItemType": "Blog Post",
          "LearningPathId": 1,
          "Url": "http://www.andrewconnell.com/blog/Understanding-SP2013-Apps-aka-Apps-101",
          "OData__Comments": null,
          "ID": 2,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "fa668215-c73e-42d4-b637-e6a2d7f999df"
        },
        {
          "__metadata": {
            "id": "cbdd16ba-cd84-4b2b-ad1d-4f0287b6302b",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(3)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 3,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Developer Ramp-Up - Part 1",
          "ItemType": "Online Course",
          "LearningPathId": 1,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/cpt-sp2013-dev-ramp-part1",
          "OData__Comments": "SAMPLE DATA - In this course students will get up to speed on SharePoint 2013 both from a SKU/license perspective as well as from a capability and architectural perspective. The different deployment models will also be covered in depth (on-premise / hosted [Office 365] / hybrid) and an overview on the different development and extensibility options.",
          "ID": 3,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "7f68b794-1425-47b3-98ea-fc5da0c721b4"
        },
        {
          "__metadata": {
            "id": "f9f94f51-92c5-464e-963c-68251c8ddaac",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(4)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 4,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Developer Ramp-Up - Part 2",
          "ItemType": "Online Course",
          "LearningPathId": 1,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/cpt-sp2013-dev-ramp-part2",
          "OData__Comments": "SAMPLE DATA - SharePoint extensibility has traditionally been done using solution packages (*.wsp’s). The two types of solutions, farm and sandbox, are covered in depth in this module. Students will learn when they are available depending on the deployments, what you can and can’t do with them as scenarios when they are applicable. Next, SharePoint 2013 introduces a new way to extend SharePoint sites: the SharePoint App Model. This module will cover everything students need to know about the SharePoint App Model including how to deploy them to the Marketplace to monetize your projects.",
          "ID": 4,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "7d1c861c-31b0-4562-9041-e02eba5fd430"
        },
        {
          "__metadata": {
            "id": "849e2d86-2a85-40bf-8751-7c0efdc3c6d6",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(5)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 5,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Developer Ramp-Up - Part 3",
          "ItemType": "Online Course",
          "LearningPathId": 1,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/cpt-sp2013-dev-ramp-part3",
          "OData__Comments": "SAMPLE DATA - In this course you will learn how to create custom application pages as well as content pages and the details around customizing pages. In addition this course will also dive into the aspects of customizing the SharePoint user interface for custom branding experiences as well as customizing and extending the SharePoint Ribbon and how to create custom list views using JavaScript. Additional on-premises only capabilties are covered such as custom field types and field controls.",
          "ID": 5,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "255588f9-f363-4dd6-88a5-b34a57acea25"
        },
        {
          "__metadata": {
            "id": "c1c34b73-c108-4a48-bff7-38deb998d8a5",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(6)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 6,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Developer Ramp-Up - Part 4",
          "ItemType": "Online Course",
          "LearningPathId": 1,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/cpt-sp2013-dev-ramp-part4",
          "OData__Comments": "SAMPLE DATA - In this course students will learn the basics of security and permissions in SharePoint 2013, specifically AuthN, AuthZ and claims based security. In addition students will also learn how to program with the security API and how to secure SharePoint Apps using app identity, and the new support for OAuth and server-to-server (S2S) authentication/security.",
          "ID": 6,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "099cd785-5a4f-4443-8ce3-2a89f66628d8"
        },
        {
          "__metadata": {
            "id": "db7ae401-b557-4f78-adf6-7080b5f61d87",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(7)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 7,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Developer Ramp-Up - Part 5",
          "ItemType": "Online Course",
          "LearningPathId": 1,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/cpt-sp2013-dev-ramp-part5",
          "OData__Comments": "SAMPLE DATA - In this course you will learn how to create lists and document libraries using the SharePoint development tools in Visual Studio 2012. Students will also learn about the various events in SharePoint 2013 including the new remote event receiver capability. This course covers everything students need to know about building solutions that run on the server and use the SharePoint Server-Side API. You will also learn how to setup LINQ for SharePoint and query lists as well as use the more traditional methods of working with SharePoint data using CAML, SPQuery and SPSiteDataQuery. In this course students will learn how to leverage each of the three client object models (CSOM) implementations in SharePoint projects. In addition students will also learn how to use the new WCF Data Services (OData/REST) and Web Services to access SharePoint data from off the server. Finally this course will cover other client-side development topics such as working with notifications, status messages, toast messages and dialogs.",
          "ID": 7,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "d6b4886e-b01a-4ca2-be58-1fc7e5e79024"
        },
        {
          "__metadata": {
            "id": "874277ad-bc28-4e84-aa31-53f92f5430d5",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(8)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 8,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Developer Ramp-Up - Part 6",
          "ItemType": "Online Course",
          "LearningPathId": 1,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/cpt-sp2013-dev-ramp-part6",
          "OData__Comments": "SAMPLE DATA - SharePoint 2013 dramatically changes the workflow architecture in the latest release. Workflow is now handled by Azure Workflow Services, both in on-premise and hosted deployments. In this course students will learn how to create custom workflows using SharePoint Designer 2013 and Visual Studio 2012 as well as some of the new capabilities introduced in SharePoint 2013 workflows: dynamic values, stages and remote web service calls. In this course students will learn how to consume and interact with external data sources as well as how to create a custom .NET Assembly Connector. In addition students will also learn how to create BCS-enabled SharePoint Apps and some of the new support for remote callouts as well as how to work with BCS via the client-side object model. Previous versions of SharePoint included various search implementations between SharePoint search and FAST search. In SharePoint 2013 Microsoft merged their search implementations into a single, unified search architecture with a powerful and robust search API that is accessible both in server-side and client-side solutions. In this course students will learn about the search architecture as well as how to leverage it in custom solutions.",
          "ID": 8,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "7ccd57c8-fa9c-4eaa-8bee-b8c647ce2587"
        },
        {
          "__metadata": {
            "id": "1432bf9d-dac8-4e51-91c9-b68286e5a550",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(9)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 9,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "How to: Create a basic SharePoint-hosted app",
          "ItemType": "Documentation",
          "LearningPathId": 2,
          "Url": "http://msdn.microsoft.com/en-us/library/sharepoint/fp142379(v=office.15).aspx",
          "OData__Comments": null,
          "ID": 9,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "769b49fd-2064-45a6-a0bc-963fda3751b1"
        },
        {
          "__metadata": {
            "id": "44a80684-b211-41a7-b2e2-e27063de876e",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(10)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 10,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Understanding SharePoint 2013: Part 6 - SharePoint Apps Basics",
          "ItemType": "Online Course",
          "LearningPathId": 2,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/understanding-sharepoint2013-office365-apps",
          "OData__Comments": "SAMPLE DATA - Apps are perhaps the biggest change between SharePoint 2010 and 2013. But how ready is the App Model? Is it even worth spending the time learning it, and if you do learn it, what is the best, clearest way of making it stick inside our minds with 100-percent clarity on what works? More importantly, what doesn't work? This course \"uncloudifies\" this cloud-ready technology.",
          "ID": 10,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "52ec17c1-e15e-49f8-8a23-f46e549f2c60"
        },
        {
          "__metadata": {
            "id": "b86aea38-227d-4591-b4d2-9822578a312a",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(11)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 11,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Development: Client Object Model and REST API",
          "ItemType": "Online Course",
          "LearningPathId": 3,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/sharepoint-2013-client-object-model-rest",
          "OData__Comments": "SAMPLE DATA - In the last several years Web development has seen a noticeable shift from server-side to client-side development. It’s taken a while but we’re starting to see this shift in the SharePoint development space as well. To support developers who want to do more on the client-side and to make it possible to build interesting applications using the SharePoint 2013 App Model, Microsoft has made significant enhancements to both the Client Object Model (CSOM) and the REST API. This course covers the fundamental use of these APIs, discusses how they have evolved in SharePoint 2013, and highlights many of the their new features.",
          "ID": 11,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "a78f6ef2-654e-42cb-8668-abcd73313942"
        },
        {
          "__metadata": {
            "id": "7da2637d-0f2c-481c-896b-4cac16c40de7",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(12)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 12,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Developing SharePoint 2013 Solutions with JavaScript",
          "ItemType": "Online Course",
          "LearningPathId": 3,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/developing-sharepoint-2013-javascript",
          "OData__Comments": "SAMPLE DATA - SharePoint 2013 has promoted JavaScript to a first-class language with which all SharePoint developers must be familiar. User expectations and the \"state of the web\" have made it critically important for all SharePoint developers to be able to write solid, reliable, performant JavaScript. This course takes you from 0 to 60 in your SharePoint JavaScript development, starting from a basic review of core concepts to detailed coverage of everything you need to know to include JavaScript as part of your SharePoint solutions. This includes coverage of the enhanced REST interface, the JavaScript Object Model, key third-party libraries as well as how to take advantage of out-of-the-box capabilities provided by SharePoint. Along the way, modern JavaScript capabilities are put to use in both the presentation materials as well as the demonstrations. Those new to JavaScript as well as experienced developers will find the material in this course helps them understand and get better at developing SharePoint 2013 Solutions with JavaScript.",
          "ID": 12,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "920ad0bb-1e63-4643-aec5-3c214a1bf3b7"
        },
        {
          "__metadata": {
            "id": "1249b1ad-6a9b-40a7-98f9-0892f939b516",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(13)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 13,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Workflow - Fundamentals",
          "ItemType": "Online Course",
          "LearningPathId": 4,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/sharepoint2013-workflow-fundamentals",
          "OData__Comments": "SAMPLE DATA - Workflow changed quite a bit in the SharePoint 2013 release from previous versions of SharePoint. The new workflow platform is implemented with a new product called Workflow Manager 1.0. In this course you will learn all the fundamentals for creating custom workflows in SharePoint 2013 using Workflow Manager 1.0. This includes using tools designed for the power user such as Visio 2013 and SharePoint Designer 2013 as well as the primary tool for the developer: Visual Studio 2012.",
          "ID": 13,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "7f5e9dee-8ec5-41ca-89ab-dc34b0a51140"
        },
        {
          "__metadata": {
            "id": "ca8a12b4-e581-4a17-9363-5363734c8b83",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(14)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 14,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Workflow - Advanced Topics",
          "ItemType": "Online Course",
          "LearningPathId": 4,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/sharepoint2013-workflow-advanced-topics",
          "OData__Comments": "SAMPLE DATA - Workflow changed quite a bit in the SharePoint 2013 release from previous versions of SharePoint. The new workflow platform is implemented with a new product called Workflow Manager 1.0. This course builds off what you learned in the \"SharePoint 2013 Workflow - Fundamentals\" course. In this course, you will learn how SharePoint 2013, Workflow Manager 1.0 and Service Bus 1.0 interact to create a robust, reliable and scalable workflow platform, how to do advanced debugging of workflows you are creating, as well as how to perform common tasks in today's business world. This includes learning how to create custom forms, leverage the new Workflow Services client APIs and how to create custom actions and activities for Visual Studio and SharePoint Designer authored workflows.",
          "ID": 14,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "86336b73-e5e9-44e3-bd97-ac5ca0d80723"
        },
        {
          "__metadata": {
            "id": "bc0f46ae-909c-450c-8835-48b66bb58a4e",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(15)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 15,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "SharePoint 2013 Workflow - Web Services",
          "ItemType": "Online Course",
          "LearningPathId": 4,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/sharepoint-2013-workflow-web-services",
          "OData__Comments": "SAMPLE DATA - Workflow changed quite a bit in the SharePoint 2013 release from previous versions of SharePoint. The new workflow platform is implemented with a new product called Workflow Manager 1.0. This course builds off what you learned in the SharePoint 2013 Workflow - Fundamentals and the SharePoint 2013 Workflow - Advanced Topics courses. In this course you will learn how to work with web services in your SharePoint 2013 workflows to meet today's business requirements. You will learn how to read and write to anonymous web services and how to authenticate and interact with the SharePoint 2013 REST API from both SharePoint Designer and Visual Studio when the provided activities don't provide the necessary tools to complete the task. Finally you will also learn how to communicate with secured web services including third party OAuth secured services and how to deploy, and interact, with your own custom secured web services.",
          "ID": 15,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "24ad4b0e-1877-4a7b-813b-8198048e2bcf"
        },
        {
          "__metadata": {
            "id": "806afb51-df13-429b-943c-f6d2311298b6",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(16)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 16,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Andrew Connell's Blog Posts on SharePoint 2013 Workflow",
          "ItemType": "Blog Post",
          "LearningPathId": 4,
          "Url": "http://www.andrewconnell.com/Tags/Workflow",
          "OData__Comments": "SAMPLE DATA - Various blog posts related to SharePoint 2013 workflow development.",
          "ID": 16,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "f281962e-10fc-4be5-a713-4721927eaa10"
        },
        {
          "__metadata": {
            "id": "f1118e95-5ca2-4ed1-af07-fd6e5916765c",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(17)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 17,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "AngularJS",
          "ItemType": "Documentation",
          "LearningPathId": 6,
          "Url": "http://angularjs.org/",
          "OData__Comments": "SAMPLE DATA -  AngularJS is what HTML would have been, had it been designed for building web-apps. Declarative templates with data-binding, MVW, MVVM, MVC, dependency injection and great testability story all implemented with pure client-side JavaScript!",
          "ID": 17,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "b5b30cf3-5ee0-4ac4-b801-fb594e1b68e4"
        },
        {
          "__metadata": {
            "id": "b53fb92e-99ff-4653-bf69-becefcf5461f",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(19)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 19,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Application Building Patterns with AngularJS",
          "ItemType": "Online Course",
          "LearningPathId": 6,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/show-me-angular",
          "OData__Comments": "SAMPLE DATA - Our focus is building an application. This means we're going to be less conceptual (as you might find with typical training approaches) and more pragmatic: what we need to know and do to get the job done.",
          "ID": 19,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "0878f5de-50a9-45ff-99b1-e36db4002109"
        },
        {
          "__metadata": {
            "id": "79b9c6f1-c124-4b9b-aff8-a8ce090ca591",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(20)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 20,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Angular Best Practices",
          "ItemType": "Online Course",
          "LearningPathId": 6,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/angular-best-practices",
          "OData__Comments": "SAMPLE DATA - In this course you will take your AngularJS development to the next level by taking a deeper look at developing web applications with Angular. Building on the topics taught in the Angular Fundamentals course, you will take a deeper dive into the components of Angular: Controllers, Services, Filters, Directives, and Views. You will learn techniques that will help you in building applications bigger than tiny sample apps, such as organizing your code, breaking down a page into components, and communicating with the server. You will learn many patterns for more effective development such as patterns for cross-component communication, and patterns for creating an actual model layer. By the end of this course you should feel comfortable embarking upon a medium to large size application in AngularJS.",
          "ID": 20,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "b1413cbb-e41a-409c-b6e3-9c751acde972"
        },
        {
          "__metadata": {
            "id": "207c0049-34b8-4173-bdf5-ecfdcca73957",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(21)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 21,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "AngularJS Fundamentals",
          "ItemType": "Online Course",
          "LearningPathId": 6,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/angularjs-fundamentals",
          "OData__Comments": "SAMPLE DATA - This course will teach you the AngularJS fundamentals required to create testable, MVC-style single page applications with AngularJS.",
          "ID": 21,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "d4302c50-91ac-4ec1-9492-c01543fde3dd"
        },
        {
          "__metadata": {
            "id": "5115c81a-f695-48f4-b422-e569a23bbeab",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(22)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 22,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Single Page Apps Jumpstart",
          "ItemType": "Online Course",
          "LearningPathId": 5,
          "Url": "http://www.pluralsight.com/training/Courses/TableOfContents/single-page-apps-jumpstart",
          "OData__Comments": "SAMPLE DATA - Build a Single Page Application (SPA), in JavaScript and HTML, with a rich user experience and runs on almost any device! Start from File | New project and build a fully functional SPA with multiple pages, insert, update, delete, validation, and more. We'll explore and build with the ASP.NET Hot Towel SPA template as well as powerful JavaScript libraries such as Durandal, Breeze, Knockout, toastr, Twitter Bootstrap, and jQuery.",
          "ID": 22,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "f1159982-a28d-4718-bf4c-9d00fa8eb102"
        },
        {
          "__metadata": {
            "id": "7e8e5c74-5522-4554-89fc-f7f1e95c2eac",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(23)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 23,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Single Page Apps with HTML5, Web API, Knockout and jQuery",
          "ItemType": "Online Course",
          "LearningPathId": 5,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/spa",
          "OData__Comments": "SAMPLE DATA - Single Page Applications (SPA's) focus on delivering rich user experiences with significant client-side interactions using JavaScript, HTML5, and CSS. In this course I'll explore how to build end to end SPA solutions using data binding and MVVM on the client, data services for abstracted calls, navigation and routing, responsive design for mobility, and local storage. On the server, we will explore layered patterns, ASP.NET Web API for RESTful services returning JSON, and Entity Framework Code First for data access.",
          "ID": 23,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "55a198b1-e81b-441a-8cf8-879ad6bf25b8"
        },
        {
          "__metadata": {
            "id": "6efffab3-f884-41e0-bec9-b4b80b78f5d2",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(24)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 24,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Building Apps with Angular and Breeze - Part 1",
          "ItemType": "Online Course",
          "LearningPathId": 5,
          "Url": "http://pluralsight.com/training/Courses/TableOfContents/build-apps-angular-breeze",
          "OData__Comments": "SAMPLE DATA - Build a Single Page Application (SPA) from scratch using JavaScript, Angular, and Breeze. Learn how to combine the Angular presentation framework, rich data features of Breeze, and raw features of JavaScript, CSS, and HTML5 to create robust modern web applications.",
          "ID": 24,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "0ba0d714-3d5b-48d4-9ab0-826b966838ea"
        },
        {
          "__metadata": {
            "id": "cbf9bd1d-6288-4ab7-ad81-3746133f3532",
            "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)",
            "etag": "\"1\"",
            "type": "SP.Data.LearningItemsListItem"
          },
          "FirstUniqueAncestorSecurableObject": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/FirstUniqueAncestorSecurableObject"
            }
          },
          "RoleAssignments": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/RoleAssignments"
            }
          },
          "AttachmentFiles": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/AttachmentFiles"
            }
          },
          "ContentType": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/ContentType"
            }
          },
          "FieldValuesAsHtml": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/FieldValuesAsHtml"
            }
          },
          "FieldValuesAsText": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/FieldValuesAsText"
            }
          },
          "FieldValuesForEdit": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/FieldValuesForEdit"
            }
          },
          "File": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/File"
            }
          },
          "Folder": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/Folder"
            }
          },
          "ParentList": {
            "__deferred": {
              "uri": "http://foo.local/lpm/_api/Web/Lists(guid'576f5d5d-239c-4e9e-ada9-c040f4852dfb')/Items(25)/ParentList"
            }
          },
          "FileSystemObjectType": 0,
          "Id": 25,
          "ContentTypeId": "0x010050E655E3C22D4916A106B11B7CE1712C004A385A20AF36E54B9E5A469E17D285D4",
          "Title": "Building Apps with Angular and Breeze - Part 2",
          "ItemType": "Online Course",
          "LearningPathId": 5,
          "Url": "http://pluralsight.com/training/Courses/Description/build-apps-angular-breeze-part2",
          "OData__Comments": "SAMPLE DATA - Build a SPA from scratch using JavaScript, Angular, and Breeze. Learn how to combine the Angular presentation framework, rich data features of Breeze, and raw features of JavaScript, CSS, and HTML5 to create robust modern web applications.",
          "ID": 25,
          "Modified": "2014-02-02T12:02:50Z",
          "Created": "2014-02-02T12:02:50Z",
          "AuthorId": 1073741823,
          "EditorId": 1073741823,
          "OData__UIVersionString": "1.0",
          "Attachments": false,
          "GUID": "2e42bca4-e1fc-413b-9109-ce49c12c1fbd"
        }
  ];

})();