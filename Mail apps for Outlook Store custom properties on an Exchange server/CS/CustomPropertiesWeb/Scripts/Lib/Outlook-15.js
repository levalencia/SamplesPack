// Exchange Version 15.00 (Build 0434.000) 
// ---------------------------------------------------------------------
// Definition of public enums.
// ---------------------------------------------------------------------
Type.registerNamespace('Microsoft.Office.WebExtension.OutlookEnums');
Microsoft.Office.WebExtension.OutlookEnums.EntityType = { 
	MeetingSuggestion: "meetingSuggestion",	
    TaskSuggestion: "taskSuggestion", 
	Address: "address", 
	EmailAddress: "emailAddress",
	Url: "url",
	PhoneNumber: "phoneNumber", 
	Contact: "contact" 
};
Microsoft.Office.WebExtension.OutlookEnums.ItemType = { 
	Message: 'message', 
	Appointment: 'appointment'
};
Microsoft.Office.WebExtension.OutlookEnums.ResponseType = { 
    None: "none",
    Organizer: "organizer",
    Tentative: "tentative",
    Accepted: "accepted",
    Declined: "declined"
};
Microsoft.Office.WebExtension.OutlookEnums.RecipientType = {
    Other: "other",
    DistributionList: "distributionList",
    User: "user",
    ExternalUser: "externalUser",
};
// End of public enums
Type.registerNamespace('OSF.DDA');

OSF.DDA.Outlook = function OSF_DDA_Outlook(officeAppContext, targetWindow, outlookAppOm, appReadyCallback) {
    this.$$d__getInitialDataResponseHandler$p$1 = Function.createDelegate(this, this._getInitialDataResponseHandler$p$1);
    OSF.DDA.Outlook.initializeBase(this, [ officeAppContext ]);
    OSF.DDA.Outlook._instance$p = this;
    this._officeAppContext$p$1 = officeAppContext;
    this._outlookAppOm$p$1 = outlookAppOm;
    this._appReadyCallback$p$1 = appReadyCallback;
    OSF.DDA.Outlook._invokeHostMethod$i(1, 'GetInitialData', null, this.$$d__getInitialDataResponseHandler$p$1);
}
OSF.DDA.Outlook._invokeHostMethod$i = function OSF_DDA_Outlook$_invokeHostMethod$i(dispid, name, data, responseCallback) {
    if (64 === OSF.DDA.Outlook._instance$p._officeAppContext$p$1.get_appName()) {
        OSF._OfficeAppFactory.getClientEndPoint().invoke(name, responseCallback, data);
    }
    else if (dispid) {
        var executeParameters = OSF.DDA.Outlook._convertToOutlookParameters$p(dispid, data);
        window.external.Execute(dispid, executeParameters, function(nativeData, resultCode) {
            var serializedData = nativeData.getItem(0);
            var deserializedData = Sys.Serialization.JavaScriptSerializer.deserialize(serializedData);
            if (responseCallback) {
                responseCallback(resultCode, deserializedData);
            }
        });
    }
    else if (responseCallback) {
        responseCallback(-2, null);
    }
}
OSF.DDA.Outlook._createAsyncResult$i = function OSF_DDA_Outlook$_createAsyncResult$i(value, errorCode, errorDescription, userContext) {
    var initArgs = {};
    initArgs[OSF.DDA.AsyncResultEnum.Properties.Value] = value;
    initArgs[OSF.DDA.AsyncResultEnum.Properties.Application] = OSF.DDA.Outlook._instance$p;
    initArgs[OSF.DDA.AsyncResultEnum.Properties.Context] = userContext;
    var errorArgs = null;
    if (0 !== errorCode) {
        errorArgs = {};
        errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name] = errorCode;
        errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message] = errorDescription;
    }
    return new OSF.DDA.AsyncResult(initArgs, errorArgs);
}
OSF.DDA.Outlook._convertToOutlookParameters$p = function OSF_DDA_Outlook$_convertToOutlookParameters$p(dispid, data) {
    var executeParameters = null;
    switch (dispid) {
        case 1:
        case 2:
        case 3:
            break;
        case 4:
            var jsonProperty = Sys.Serialization.JavaScriptSerializer.serialize(data['customProperties']);
            executeParameters = [ jsonProperty ];
            break;
        case 5:
            executeParameters = [ data['body'] ];
            break;
        case 8:
        case 9:
            executeParameters = [ data['itemId'] ];
            break;
        case 7:
            executeParameters = [ OSF.DDA.Outlook._convertRecipientArrayParameterForOutlook$p(data['requiredAttendees']), OSF.DDA.Outlook._convertRecipientArrayParameterForOutlook$p(data['optionalAttendees']), (data['start']) ? (data['start']).getTime() : null, (data['end']) ? (data['end']).getTime() : null, data['location'], OSF.DDA.Outlook._convertRecipientArrayParameterForOutlook$p(data['resources']), data['subject'], data['body'] ];
            break;
        case 11:
        case 10:
            executeParameters = [ data['htmlBody'] ];
            break;
    }
    return executeParameters;
}
OSF.DDA.Outlook._convertRecipientArrayParameterForOutlook$p = function OSF_DDA_Outlook$_convertRecipientArrayParameterForOutlook$p(array) {
    return (array) ? array.join(';') : null;
}
OSF.DDA.Outlook.prototype = {
    _officeAppContext$p$1: null,
    _outlookAppOm$p$1: null,
    _appReadyCallback$p$1: null,
    
    _getInitialDataResponseHandler$p$1: function OSF_DDA_Outlook$_getInitialDataResponseHandler$p$1(resultCode, data) {
        if (resultCode) {
            return;
        }
        this._outlookAppOm$p$1.initialize(data);
        (this._outlookAppOm$p$1).displayName = 'mailbox';
        this._appReadyCallback$p$1();
    }
}




OSF.DDA.OutlookAppOm = function OSF_DDA_OutlookAppOm() {
    this.$$d__getUserProfile$p$0 = Function.createDelegate(this, this._getUserProfile$p$0);
    this.$$d__getItem$p$0 = Function.createDelegate(this, this._getItem$p$0);
}
OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i = function OSF_DDA_OutlookAppOm$_throwOnPropertyAccessForRestrictedPermission$i(currentPermissionLevel) {
    if (!currentPermissionLevel) {
        throw Error.create('Elevated permission is required to access protected members of the JavaScript object model.');
    }
}
OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i = function OSF_DDA_OutlookAppOm$_throwOnMethodCallForInsufficientPermission$i(currentPermissionLevel, requiredPermissionLevel, methodName) {
    if (currentPermissionLevel < requiredPermissionLevel) {
        throw Error.create(String.format('Elevated permission is required to call the method \'{0}\'', methodName));
    }
}
OSF.DDA.OutlookAppOm._throwOnArgumentType$p = function OSF_DDA_OutlookAppOm$_throwOnArgumentType$p(value, expectedType, argumentName) {
    if (Object.getType(value) !== expectedType) {
        throw Error.argumentType(argumentName);
    }
}
OSF.DDA.OutlookAppOm._throwOnOutOfRange$p = function OSF_DDA_OutlookAppOm$_throwOnOutOfRange$p(value, minValue, maxValue, argumentName) {
    if (value < minValue || value > maxValue) {
        throw Error.argumentOutOfRange(argumentName);
    }
}
OSF.DDA.OutlookAppOm._validateOptionalStringParameter$p = function OSF_DDA_OutlookAppOm$_validateOptionalStringParameter$p(value, minLength, maxLength, name) {
    if ($h.ScriptHelpers.isNullOrUndefined(value)) {
        return;
    }
    OSF.DDA.OutlookAppOm._throwOnArgumentType$p(value, String, name);
    var stringValue = value;
    OSF.DDA.OutlookAppOm._throwOnOutOfRange$p(stringValue.length, minLength, maxLength, name);
}
OSF.DDA.OutlookAppOm._validateAndNormalizeRecipientEmails$p = function OSF_DDA_OutlookAppOm$_validateAndNormalizeRecipientEmails$p(emailset, name) {
    if ($h.ScriptHelpers.isNullOrUndefined(emailset)) {
        return null;
    }
    OSF.DDA.OutlookAppOm._throwOnArgumentType$p(emailset, Array, name);
    var originalAttendees = emailset;
    var updatedAttendees = null;
    var normalizationNeeded = false;
    OSF.DDA.OutlookAppOm._throwOnOutOfRange$p(originalAttendees.length, 0, OSF.DDA.OutlookAppOm._maxRecipients$p, String.format('{0}.length', name));
    for (var i = 0; i < originalAttendees.length; i++) {
        if ($h.EmailAddressDetails.isInstanceOfType(originalAttendees[i])) {
            normalizationNeeded = true;
            break;
        }
    }
    if (normalizationNeeded) {
        updatedAttendees = [];
    }
    for (var i = 0; i < originalAttendees.length; i++) {
        if (normalizationNeeded) {
            updatedAttendees[i] = ($h.EmailAddressDetails.isInstanceOfType(originalAttendees[i])) ? (originalAttendees[i]).emailAddress : originalAttendees[i];
            OSF.DDA.OutlookAppOm._throwOnArgumentType$p(updatedAttendees[i], String, String.format('{0}[{1}]', name, i));
        }
        else {
            OSF.DDA.OutlookAppOm._throwOnArgumentType$p(originalAttendees[i], String, String.format('{0}[{1}]', name, i));
        }
    }
    return updatedAttendees;
}
OSF.DDA.OutlookAppOm.prototype = {
    _initialData$p$0: null,
    _item$p$0: null,
    _userProfile$p$0: null,
    
    makeEwsRequestAsync: function OSF_DDA_OutlookAppOm$makeEwsRequestAsync(data, callback, userContext) {
        if ($h.ScriptHelpers.isNullOrUndefined(data)) {
            throw Error.argumentNull('data');
        }
        if (data.length > OSF.DDA.OutlookAppOm._maxEwsRequestSize$p) {
            throw Error.argument('data', 'Request exceeds 1 MB size limit. Please modify your EWS request.');
        }
        OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i(this._initialData$p$0.get__permissionLevel$i$0(), 2, 'makeEwsRequestAsync');
        var ewsRequest = new $h.EwsRequest(userContext);
        var $$t_4 = this;
        ewsRequest.onreadystatechange = function() {
            if (4 === ewsRequest.get__requestState$i$1()) {
                callback(ewsRequest._asyncResult$p$0);
            }
        };
        ewsRequest.send(data);
    },
    
    recordDataPoint: function OSF_DDA_OutlookAppOm$recordDataPoint(data) {
        if ($h.ScriptHelpers.isNullOrUndefined(data)) {
            throw Error.argumentNull('data');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(0, 'RecordDataPoint', data, null);
    },
    
    recordTrace: function OSF_DDA_OutlookAppOm$recordTrace(data) {
        if ($h.ScriptHelpers.isNullOrUndefined(data)) {
            throw Error.argumentNull('data');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(0, 'RecordTrace', data, null);
    },
    
    trackCtq: function OSF_DDA_OutlookAppOm$trackCtq(data) {
        if ($h.ScriptHelpers.isNullOrUndefined(data)) {
            throw Error.argumentNull('data');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(0, 'TrackCtq', data, null);
    },
    
    getUserIdentityTokenAsync: function OSF_DDA_OutlookAppOm$getUserIdentityTokenAsync(callback, userContext) {
        OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i(this._initialData$p$0.get__permissionLevel$i$0(), 1, 'getUserIdentityTokenAsync');
        if ($h.ScriptHelpers.isNullOrUndefined(callback)) {
            throw Error.argumentNull('callback');
        }
        var $$t_6 = this;
        OSF.DDA.Outlook._invokeHostMethod$i(2, 'GetUserIdentityToken', null, function(resultCode, response) {
            if (resultCode) {
                OSF.DDA.Outlook._createAsyncResult$i(null, 1, 'Internal protocol error: ' + resultCode, userContext);
            }
            else {
                var responseDictionary = response;
                var asyncResult;
                if (responseDictionary['wasSuccessful']) {
                    asyncResult = OSF.DDA.Outlook._createAsyncResult$i(responseDictionary['token'], 0, null, userContext);
                }
                else {
                    asyncResult = OSF.DDA.Outlook._createAsyncResult$i(null, 1, responseDictionary['errorMessage'], userContext);
                }
                callback(asyncResult);
            }
        });
    },
    
    displayMessageForm: function OSF_DDA_OutlookAppOm$displayMessageForm(itemId) {
        if ($h.ScriptHelpers.isNullOrUndefined(itemId)) {
            throw Error.argumentNull('itemId');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(8, 'DisplayExistingMessageForm', { itemId: itemId }, null);
    },
    
    displayAppointmentForm: function OSF_DDA_OutlookAppOm$displayAppointmentForm(itemId) {
        if ($h.ScriptHelpers.isNullOrUndefined(itemId)) {
            throw Error.argumentNull('itemId');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(9, 'DisplayExistingAppointmentForm', { itemId: itemId }, null);
    },
    
    displayNewAppointmentForm: function OSF_DDA_OutlookAppOm$displayNewAppointmentForm(parameters) {
        var normalizedRequiredAttendees = OSF.DDA.OutlookAppOm._validateAndNormalizeRecipientEmails$p(parameters['requiredAttendees'], 'requiredAttendees');
        var normalizedOptionalAttendees = OSF.DDA.OutlookAppOm._validateAndNormalizeRecipientEmails$p(parameters['optionalAttendees'], 'optionalAttendees');
        OSF.DDA.OutlookAppOm._validateOptionalStringParameter$p(parameters['location'], 0, OSF.DDA.OutlookAppOm._maxLocationLength$p, 'location');
        OSF.DDA.OutlookAppOm._validateOptionalStringParameter$p(parameters['body'], 0, OSF.DDA.OutlookAppOm._maxBodyLength$p, 'body');
        OSF.DDA.OutlookAppOm._validateOptionalStringParameter$p(parameters['subject'], 0, OSF.DDA.OutlookAppOm._maxSubjectLength$p, 'subject');
        if (!$h.ScriptHelpers.isNullOrUndefined(parameters['start'])) {
            OSF.DDA.OutlookAppOm._throwOnArgumentType$p(parameters['start'], Date, 'start');
            var startDateTime = parameters['start'];
            if (!$h.ScriptHelpers.isNullOrUndefined(parameters['end'])) {
                OSF.DDA.OutlookAppOm._throwOnArgumentType$p(parameters['end'], Date, 'end');
                var endDateTime = parameters['end'];
                if (endDateTime < startDateTime) {
                    throw Error.argumentOutOfRange('end', endDateTime, 'End date occurs before start date');
                }
            }
        }
        var updatedParameters = null;
        if (normalizedRequiredAttendees || normalizedOptionalAttendees) {
            updatedParameters = {};
            var $$dict_6 = parameters;
            for (var $$key_7 in $$dict_6) {
                var entry = { key: $$key_7, value: $$dict_6[$$key_7] };
                updatedParameters[entry.key] = entry.value;
            }
            if (normalizedRequiredAttendees) {
                updatedParameters['requiredAttendees'] = normalizedRequiredAttendees;
            }
            if (normalizedOptionalAttendees) {
                updatedParameters['optionalAttendees'] = normalizedOptionalAttendees;
            }
        }
        OSF.DDA.Outlook._invokeHostMethod$i(7, 'DisplayNewAppointmentForm', updatedParameters || parameters, null);
    },
    
    displayReplyForm: function OSF_DDA_OutlookAppOm$displayReplyForm(htmlBody) {
        if (!$h.ScriptHelpers.isNullOrUndefined(htmlBody)) {
            OSF.DDA.OutlookAppOm._throwOnOutOfRange$p(htmlBody.length, 0, OSF.DDA.OutlookAppOm._maxBodyLength$p, 'htmlBody');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(10, 'DisplayReplyForm', { htmlBody: htmlBody }, null);
    },
    
    displayReplyAllForm: function OSF_DDA_OutlookAppOm$displayReplyAllForm(htmlBody) {
        if (!$h.ScriptHelpers.isNullOrUndefined(htmlBody)) {
            OSF.DDA.OutlookAppOm._throwOnOutOfRange$p(htmlBody.length, 0, OSF.DDA.OutlookAppOm._maxBodyLength$p, 'htmlBody');
        }
        OSF.DDA.Outlook._invokeHostMethod$i(11, 'DisplayReplyAllForm', { htmlBody: htmlBody }, null);
    },
    
    initialize: function OSF_DDA_OutlookAppOm$initialize(initialData) {
        var ItemTypeKey = 'itemType';
        this._initialData$p$0 = new $h.InitialData(initialData);
        if (1 === initialData[ItemTypeKey]) {
            this._item$p$0 = new $h.Message(this._initialData$p$0);
        }
        else if (3 === initialData[ItemTypeKey]) {
            this._item$p$0 = new $h.MeetingRequest(this._initialData$p$0);
        }
        else if (2 === initialData[ItemTypeKey]) {
            this._item$p$0 = new $h.Appointment(this._initialData$p$0);
        }
        this._userProfile$p$0 = new $h.UserProfile(this._initialData$p$0);
        $h.InitialData._defineReadOnlyProperty$i(this, 'item', this.$$d__getItem$p$0);
        $h.InitialData._defineReadOnlyProperty$i(this, 'userProfile', this.$$d__getUserProfile$p$0);
    },
    
    _getItem$p$0: function OSF_DDA_OutlookAppOm$_getItem$p$0() {
        return this._item$p$0;
    },
    
    _getUserProfile$p$0: function OSF_DDA_OutlookAppOm$_getUserProfile$p$0() {
        OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i(this._initialData$p$0.get__permissionLevel$i$0());
        return this._userProfile$p$0;
    }
}


Type.registerNamespace('$h');

$h.Appointment = function $h_Appointment(dataDictionary) {
    this.$$d__getOrganizer$p$1 = Function.createDelegate(this, this._getOrganizer$p$1);
    this.$$d__getNormalizedSubject$p$1 = Function.createDelegate(this, this._getNormalizedSubject$p$1);
    this.$$d__getSubject$p$1 = Function.createDelegate(this, this._getSubject$p$1);
    this.$$d__getResources$p$1 = Function.createDelegate(this, this._getResources$p$1);
    this.$$d__getRequiredAttendees$p$1 = Function.createDelegate(this, this._getRequiredAttendees$p$1);
    this.$$d__getOptionalAttendees$p$1 = Function.createDelegate(this, this._getOptionalAttendees$p$1);
    this.$$d__getLocation$p$1 = Function.createDelegate(this, this._getLocation$p$1);
    this.$$d__getEnd$p$1 = Function.createDelegate(this, this._getEnd$p$1);
    this.$$d__getStart$p$1 = Function.createDelegate(this, this._getStart$p$1);
    $h.Appointment.initializeBase(this, [ dataDictionary ]);
    $h.InitialData._defineReadOnlyProperty$i(this, 'start', this.$$d__getStart$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'end', this.$$d__getEnd$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'location', this.$$d__getLocation$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'optionalAttendees', this.$$d__getOptionalAttendees$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'requiredAttendees', this.$$d__getRequiredAttendees$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'resources', this.$$d__getResources$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'subject', this.$$d__getSubject$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'normalizedSubject', this.$$d__getNormalizedSubject$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'organizer', this.$$d__getOrganizer$p$1);
}
$h.Appointment.prototype = {
    
    getEntities: function $h_Appointment$getEntities() {
        return this._data$p$0._getEntities$i$0();
    },
    
    getEntitiesByType: function $h_Appointment$getEntitiesByType(entityType) {
        return this._data$p$0._getEntitiesByType$i$0(entityType);
    },
    
    getRegExMatches: function $h_Appointment$getRegExMatches() {
        OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i(this._data$p$0.get__permissionLevel$i$0(), 1, 'getRegExMatches');
        return this._data$p$0._getRegExMatches$i$0();
    },
    
    getFilteredEntitiesByName: function $h_Appointment$getFilteredEntitiesByName(name) {
        return this._data$p$0._getFilteredEntitiesByName$i$0(name);
    },
    
    getRegExMatchesByName: function $h_Appointment$getRegExMatchesByName(name) {
        OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i(this._data$p$0.get__permissionLevel$i$0(), 1, 'getRegExMatchesByName');
        return this._data$p$0._getRegExMatchesByName$i$0(name);
    },
    
    getItemType: function $h_Appointment$getItemType() {
        return Microsoft.Office.WebExtension.OutlookEnums.ItemType.Appointment;
    },
    
    _getStart$p$1: function $h_Appointment$_getStart$p$1() {
        return this._data$p$0.get__start$i$0();
    },
    
    _getEnd$p$1: function $h_Appointment$_getEnd$p$1() {
        return this._data$p$0.get__end$i$0();
    },
    
    _getLocation$p$1: function $h_Appointment$_getLocation$p$1() {
        return this._data$p$0.get__location$i$0();
    },
    
    _getOptionalAttendees$p$1: function $h_Appointment$_getOptionalAttendees$p$1() {
        return this._data$p$0.get__cc$i$0();
    },
    
    _getRequiredAttendees$p$1: function $h_Appointment$_getRequiredAttendees$p$1() {
        return this._data$p$0.get__to$i$0();
    },
    
    _getResources$p$1: function $h_Appointment$_getResources$p$1() {
        return this._data$p$0.get__resources$i$0();
    },
    
    _getSubject$p$1: function $h_Appointment$_getSubject$p$1() {
        return this._data$p$0.get__subject$i$0();
    },
    
    _getNormalizedSubject$p$1: function $h_Appointment$_getNormalizedSubject$p$1() {
        return this._data$p$0.get__normalizedSubject$i$0();
    },
    
    _getOrganizer$p$1: function $h_Appointment$_getOrganizer$p$1() {
        return this._data$p$0.get__organizer$i$0();
    }
}


$h.Contact = function $h_Contact(data) {
    this.$$d__getContactString$p$0 = Function.createDelegate(this, this._getContactString$p$0);
    this.$$d__getAddresses$p$0 = Function.createDelegate(this, this._getAddresses$p$0);
    this.$$d__getUrls$p$0 = Function.createDelegate(this, this._getUrls$p$0);
    this.$$d__getEmailAddresses$p$0 = Function.createDelegate(this, this._getEmailAddresses$p$0);
    this.$$d__getPhoneNumbers$p$0 = Function.createDelegate(this, this._getPhoneNumbers$p$0);
    this.$$d__getBusinessName$p$0 = Function.createDelegate(this, this._getBusinessName$p$0);
    this.$$d__getPersonName$p$0 = Function.createDelegate(this, this._getPersonName$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'personName', this.$$d__getPersonName$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'businessName', this.$$d__getBusinessName$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'phoneNumbers', this.$$d__getPhoneNumbers$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'emailAddresses', this.$$d__getEmailAddresses$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'urls', this.$$d__getUrls$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'addresses', this.$$d__getAddresses$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'contactString', this.$$d__getContactString$p$0);
}
$h.Contact.prototype = {
    _data$p$0: null,
    _phoneNumbers$p$0: null,
    
    _getPersonName$p$0: function $h_Contact$_getPersonName$p$0() {
        return this._data$p$0['PersonName'];
    },
    
    _getBusinessName$p$0: function $h_Contact$_getBusinessName$p$0() {
        return this._data$p$0['BusinessName'];
    },
    
    _getAddresses$p$0: function $h_Contact$_getAddresses$p$0() {
        return $h.Entities._getExtractedStringProperty$i(this._data$p$0, 'Addresses');
    },
    
    _getEmailAddresses$p$0: function $h_Contact$_getEmailAddresses$p$0() {
        return $h.Entities._getExtractedStringProperty$i(this._data$p$0, 'EmailAddresses');
    },
    
    _getUrls$p$0: function $h_Contact$_getUrls$p$0() {
        return $h.Entities._getExtractedStringProperty$i(this._data$p$0, 'Urls');
    },
    
    _getPhoneNumbers$p$0: function $h_Contact$_getPhoneNumbers$p$0() {
        if (!this._phoneNumbers$p$0) {
            var $$t_1 = this;
            this._phoneNumbers$p$0 = $h.Entities._getExtractedObjects$i($h.PhoneNumber, this._data$p$0, 'PhoneNumbers', function(data) {
                return new $h.PhoneNumber(data);
            });
        }
        return this._phoneNumbers$p$0;
    },
    
    _getContactString$p$0: function $h_Contact$_getContactString$p$0() {
        return this._data$p$0['ContactString'];
    }
}


$h.CustomProperties = function $h_CustomProperties(data) {
    if ($h.ScriptHelpers.isNullOrUndefined(data)) {
        throw Error.argumentNull('data');
    }
    this._data$p$0 = data;
}
$h.CustomProperties.prototype = {
    _data$p$0: null,
    
    get: function $h_CustomProperties$get(name) {
        return this._data$p$0[name];
    },
    
    set: function $h_CustomProperties$set(name, value) {
        this._data$p$0[name] = value;
    },
    
    remove: function $h_CustomProperties$remove(name) {
        delete this._data$p$0[name];
    },
    
    saveAsync: function $h_CustomProperties$saveAsync(callback, userContext) {
        var MaxCustomPropertiesLength = 2500;
        if (Sys.Serialization.JavaScriptSerializer.serialize(this._data$p$0).length > MaxCustomPropertiesLength) {
            throw Error.argument();
        }
        var saveCustomProperties = new $h._saveDictionaryRequest(callback, userContext);
        saveCustomProperties._sendRequest$i$0(4, 'SaveCustomProperties', { customProperties: this._data$p$0 });
    }
}


$h.EmailAddressDetails = function $h_EmailAddressDetails(data) {
    this.$$d__getRecipientType$p$0 = Function.createDelegate(this, this._getRecipientType$p$0);
    this.$$d__getAppointmentResponse$p$0 = Function.createDelegate(this, this._getAppointmentResponse$p$0);
    this.$$d__getDisplayName$p$0 = Function.createDelegate(this, this._getDisplayName$p$0);
    this.$$d__getEmailAddress$p$0 = Function.createDelegate(this, this._getEmailAddress$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'emailAddress', this.$$d__getEmailAddress$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'displayName', this.$$d__getDisplayName$p$0);
    if ($h.ScriptHelpers.dictionaryContainsKey(data, 'appointmentResponse')) {
        $h.InitialData._defineReadOnlyProperty$i(this, 'appointmentResponse', this.$$d__getAppointmentResponse$p$0);
    }
    if ($h.ScriptHelpers.dictionaryContainsKey(data, 'recipientType')) {
        $h.InitialData._defineReadOnlyProperty$i(this, 'recipientType', this.$$d__getRecipientType$p$0);
    }
}
$h.EmailAddressDetails._createFromEmailUserDictionary$i = function $h_EmailAddressDetails$_createFromEmailUserDictionary$i(data) {
    var emailAddressDetailsDictionary = {};
    var displayName = data['Name'];
    var emailAddress = data['UserId'];
    emailAddressDetailsDictionary['name'] = displayName || $h.EmailAddressDetails._emptyString$p;
    emailAddressDetailsDictionary['address'] = emailAddress || $h.EmailAddressDetails._emptyString$p;
    return new $h.EmailAddressDetails(emailAddressDetailsDictionary);
}
$h.EmailAddressDetails.prototype = {
    _data$p$0: null,
    
    _getEmailAddress$p$0: function $h_EmailAddressDetails$_getEmailAddress$p$0() {
        return this._data$p$0['address'];
    },
    
    _getDisplayName$p$0: function $h_EmailAddressDetails$_getDisplayName$p$0() {
        return this._data$p$0['name'];
    },
    
    _getAppointmentResponse$p$0: function $h_EmailAddressDetails$_getAppointmentResponse$p$0() {
        var response = this._data$p$0['appointmentResponse'];
        return (response < $h.EmailAddressDetails._responseTypeMap$p.length) ? $h.EmailAddressDetails._responseTypeMap$p[response] : Microsoft.Office.WebExtension.OutlookEnums.ResponseType.None;
    },
    
    _getRecipientType$p$0: function $h_EmailAddressDetails$_getRecipientType$p$0() {
        var response = this._data$p$0['recipientType'];
        return (response < $h.EmailAddressDetails._recipientTypeMap$p.length) ? $h.EmailAddressDetails._recipientTypeMap$p[response] : Microsoft.Office.WebExtension.OutlookEnums.RecipientType.Other;
    }
}


$h.Entities = function $h_Entities(data, filteredEntitiesData, permissionLevel) {
    this.$$d__getContacts$p$0 = Function.createDelegate(this, this._getContacts$p$0);
    this.$$d__getPhoneNumbers$p$0 = Function.createDelegate(this, this._getPhoneNumbers$p$0);
    this.$$d__getUrls$p$0 = Function.createDelegate(this, this._getUrls$p$0);
    this.$$d__getEmailAddresses$p$0 = Function.createDelegate(this, this._getEmailAddresses$p$0);
    this.$$d__getMeetingSuggestions$p$0 = Function.createDelegate(this, this._getMeetingSuggestions$p$0);
    this.$$d__getTaskSuggestions$p$0 = Function.createDelegate(this, this._getTaskSuggestions$p$0);
    this.$$d__getAddresses$p$0 = Function.createDelegate(this, this._getAddresses$p$0);
    this._data$p$0 = data || {};
    this._filteredData$p$0 = filteredEntitiesData || {};
    $h.InitialData._defineReadOnlyProperty$i(this, 'addresses', this.$$d__getAddresses$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'taskSuggestions', this.$$d__getTaskSuggestions$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'meetingSuggestions', this.$$d__getMeetingSuggestions$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'emailAddresses', this.$$d__getEmailAddresses$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'urls', this.$$d__getUrls$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'phoneNumbers', this.$$d__getPhoneNumbers$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'contacts', this.$$d__getContacts$p$0);
    this._permissionLevel$p$0 = permissionLevel;
}
$h.Entities._getExtractedObjects$i = function $h_Entities$_getExtractedObjects$i(T, data, name, creator) {
    var results = null;
    var extractedObjects = data[name];
    if (!extractedObjects) {
        return new Array(0);
    }
    results = new Array(extractedObjects.length);
    var count = 0;
    for (var $$arr_7 = extractedObjects, $$len_8 = $$arr_7.length, $$idx_9 = 0; $$idx_9 < $$len_8; ++$$idx_9) {
        var extractedObject = $$arr_7[$$idx_9];
        results[count++] = creator(extractedObject);
    }
    return results;
}
$h.Entities._getExtractedStringProperty$i = function $h_Entities$_getExtractedStringProperty$i(data, name) {
    var extractedProperties = data[name];
    if (!extractedProperties) {
        extractedProperties = new Array(0);
    }
    return extractedProperties;
}
$h.Entities._createContact$p = function $h_Entities$_createContact$p(data) {
    return new $h.Contact(data);
}
$h.Entities._createMeetingSuggestion$p = function $h_Entities$_createMeetingSuggestion$p(data) {
    return new $h.MeetingSuggestion(data);
}
$h.Entities._createTaskSuggestion$p = function $h_Entities$_createTaskSuggestion$p(data) {
    return new $h.TaskSuggestion(data);
}
$h.Entities._createPhoneNumber$p = function $h_Entities$_createPhoneNumber$p(data) {
    return new $h.PhoneNumber(data);
}
$h.Entities.prototype = {
    _data$p$0: null,
    _filteredData$p$0: null,
    _filteredEntitiesCache$p$0: null,
    _permissionLevel$p$0: 0,
    _taskSuggestions$p$0: null,
    _meetingSuggestions$p$0: null,
    _phoneNumbers$p$0: null,
    _contacts$p$0: null,
    
    _getByType$i$0: function $h_Entities$_getByType$i$0(entityType) {
        if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.MeetingSuggestion) {
            return this._getMeetingSuggestions$p$0();
        }
        else if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.TaskSuggestion) {
            return this._getTaskSuggestions$p$0();
        }
        else if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.Address) {
            return this._getAddresses$p$0();
        }
        else if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.PhoneNumber) {
            return this._getPhoneNumbers$p$0();
        }
        else if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.EmailAddress) {
            return this._getEmailAddresses$p$0();
        }
        else if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.Url) {
            return this._getUrls$p$0();
        }
        else if (entityType === Microsoft.Office.WebExtension.OutlookEnums.EntityType.Contact) {
            return this._getContacts$p$0();
        }
        return null;
    },
    
    _getFilteredEntitiesByName$i$0: function $h_Entities$_getFilteredEntitiesByName$i$0(name) {
        if (!this._filteredEntitiesCache$p$0) {
            this._filteredEntitiesCache$p$0 = {};
        }
        if (!$h.ScriptHelpers.dictionaryContainsKey(this._filteredEntitiesCache$p$0, name)) {
            var found = false;
            for (var i = 0; i < $h.Entities._allEntityKeys$p.length; i++) {
                var entityTypeKey = $h.Entities._allEntityKeys$p[i];
                var perEntityTypeDictionary = this._filteredData$p$0[entityTypeKey];
                if (!perEntityTypeDictionary) {
                    continue;
                }
                if ($h.ScriptHelpers.dictionaryContainsKey(perEntityTypeDictionary, name)) {
                    switch (entityTypeKey) {
                        case 'Addresses':
                        case 'EmailAddresses':
                        case 'Urls':
                            this._filteredEntitiesCache$p$0[name] = $h.Entities._getExtractedStringProperty$i(perEntityTypeDictionary, name);
                            break;
                        case 'PhoneNumbers':
                            this._filteredEntitiesCache$p$0[name] = $h.Entities._getExtractedObjects$i($h.PhoneNumber, perEntityTypeDictionary, name, $h.Entities._createPhoneNumber$p);
                            break;
                        case 'TaskSuggestions':
                            this._filteredEntitiesCache$p$0[name] = $h.Entities._getExtractedObjects$i($h.TaskSuggestion, perEntityTypeDictionary, name, $h.Entities._createTaskSuggestion$p);
                            break;
                        case 'MeetingSuggestions':
                            this._filteredEntitiesCache$p$0[name] = $h.Entities._getExtractedObjects$i($h.MeetingSuggestion, perEntityTypeDictionary, name, $h.Entities._createMeetingSuggestion$p);
                            break;
                        case 'Contacts':
                            this._filteredEntitiesCache$p$0[name] = $h.Entities._getExtractedObjects$i($h.Contact, perEntityTypeDictionary, name, $h.Entities._createContact$p);
                            break;
                    }
                    found = true;
                    break;
                }
            }
            if (!found) {
                this._filteredEntitiesCache$p$0[name] = null;
            }
        }
        return this._filteredEntitiesCache$p$0[name];
    },
    
    _getAddresses$p$0: function $h_Entities$_getAddresses$p$0() {
        return $h.Entities._getExtractedStringProperty$i(this._data$p$0, 'Addresses');
    },
    
    _getEmailAddresses$p$0: function $h_Entities$_getEmailAddresses$p$0() {
        OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i(this._permissionLevel$p$0);
        return $h.Entities._getExtractedStringProperty$i(this._data$p$0, 'EmailAddresses');
    },
    
    _getUrls$p$0: function $h_Entities$_getUrls$p$0() {
        return $h.Entities._getExtractedStringProperty$i(this._data$p$0, 'Urls');
    },
    
    _getPhoneNumbers$p$0: function $h_Entities$_getPhoneNumbers$p$0() {
        if (!this._phoneNumbers$p$0) {
            this._phoneNumbers$p$0 = $h.Entities._getExtractedObjects$i($h.PhoneNumber, this._data$p$0, 'PhoneNumbers', $h.Entities._createPhoneNumber$p);
        }
        return this._phoneNumbers$p$0;
    },
    
    _getTaskSuggestions$p$0: function $h_Entities$_getTaskSuggestions$p$0() {
        OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i(this._permissionLevel$p$0);
        if (!this._taskSuggestions$p$0) {
            this._taskSuggestions$p$0 = $h.Entities._getExtractedObjects$i($h.TaskSuggestion, this._data$p$0, 'TaskSuggestions', $h.Entities._createTaskSuggestion$p);
        }
        return this._taskSuggestions$p$0;
    },
    
    _getMeetingSuggestions$p$0: function $h_Entities$_getMeetingSuggestions$p$0() {
        OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i(this._permissionLevel$p$0);
        if (!this._meetingSuggestions$p$0) {
            this._meetingSuggestions$p$0 = $h.Entities._getExtractedObjects$i($h.MeetingSuggestion, this._data$p$0, 'MeetingSuggestions', $h.Entities._createMeetingSuggestion$p);
        }
        return this._meetingSuggestions$p$0;
    },
    
    _getContacts$p$0: function $h_Entities$_getContacts$p$0() {
        OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i(this._permissionLevel$p$0);
        if (!this._contacts$p$0) {
            this._contacts$p$0 = $h.Entities._getExtractedObjects$i($h.Contact, this._data$p$0, 'Contacts', $h.Entities._createContact$p);
        }
        return this._contacts$p$0;
    }
}




$h.Item = function $h_Item(data) {
    this.$$d__createCustomProperties$i$0 = Function.createDelegate(this, this._createCustomProperties$i$0);
    this.$$d__getItemClass$p$0 = Function.createDelegate(this, this._getItemClass$p$0);
    this.$$d__getItemId$p$0 = Function.createDelegate(this, this._getItemId$p$0);
    this.$$d__getDateTimeModified$p$0 = Function.createDelegate(this, this._getDateTimeModified$p$0);
    this.$$d__getDateTimeCreated$p$0 = Function.createDelegate(this, this._getDateTimeCreated$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'dateTimeCreated', this.$$d__getDateTimeCreated$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'dateTimeModified', this.$$d__getDateTimeModified$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'itemId', this.$$d__getItemId$p$0);
    var $$t_1 = this;
    $h.InitialData._defineReadOnlyProperty$i(this, 'itemType', function() {
        return $$t_1.getItemType();
    });
    $h.InitialData._defineReadOnlyProperty$i(this, 'itemClass', this.$$d__getItemClass$p$0);
}
$h.Item.prototype = {
    _data$p$0: null,
    
    loadCustomPropertiesAsync: function $h_Item$loadCustomPropertiesAsync(callback, userContext) {
        if ($h.ScriptHelpers.isNullOrUndefined(callback)) {
            throw Error.argumentNull('callback');
        }
        var loadCustomProperties = new $h._loadDictionaryRequest(this.$$d__createCustomProperties$i$0, 'customProperties', callback, userContext);
        loadCustomProperties._sendRequest$i$0(3, 'LoadCustomProperties', {});
    },
    
    _createCustomProperties$i$0: function $h_Item$_createCustomProperties$i$0(data) {
        return new $h.CustomProperties(data);
    },
    
    _getItemId$p$0: function $h_Item$_getItemId$p$0() {
        return this._data$p$0.get__itemId$i$0();
    },
    
    _getItemClass$p$0: function $h_Item$_getItemClass$p$0() {
        return this._data$p$0.get__itemClass$i$0();
    },
    
    _getDateTimeCreated$p$0: function $h_Item$_getDateTimeCreated$p$0() {
        return this._data$p$0.get__dateTimeCreated$i$0();
    },
    
    _getDateTimeModified$p$0: function $h_Item$_getDateTimeModified$p$0() {
        return this._data$p$0.get__dateTimeModified$i$0();
    }
}




$h.MeetingRequest = function $h_MeetingRequest(data) {
    this.$$d__getRequiredAttendees$p$2 = Function.createDelegate(this, this._getRequiredAttendees$p$2);
    this.$$d__getOptionalAttendees$p$2 = Function.createDelegate(this, this._getOptionalAttendees$p$2);
    this.$$d__getLocation$p$2 = Function.createDelegate(this, this._getLocation$p$2);
    this.$$d__getEnd$p$2 = Function.createDelegate(this, this._getEnd$p$2);
    this.$$d__getStart$p$2 = Function.createDelegate(this, this._getStart$p$2);
    $h.MeetingRequest.initializeBase(this, [ data ]);
    $h.InitialData._defineReadOnlyProperty$i(this, 'start', this.$$d__getStart$p$2);
    $h.InitialData._defineReadOnlyProperty$i(this, 'end', this.$$d__getEnd$p$2);
    $h.InitialData._defineReadOnlyProperty$i(this, 'location', this.$$d__getLocation$p$2);
    $h.InitialData._defineReadOnlyProperty$i(this, 'optionalAttendees', this.$$d__getOptionalAttendees$p$2);
    $h.InitialData._defineReadOnlyProperty$i(this, 'requiredAttendees', this.$$d__getRequiredAttendees$p$2);
}
$h.MeetingRequest.prototype = {
    
    _getStart$p$2: function $h_MeetingRequest$_getStart$p$2() {
        return this._data$p$0.get__start$i$0();
    },
    
    _getEnd$p$2: function $h_MeetingRequest$_getEnd$p$2() {
        return this._data$p$0.get__end$i$0();
    },
    
    _getLocation$p$2: function $h_MeetingRequest$_getLocation$p$2() {
        return this._data$p$0.get__location$i$0();
    },
    
    _getOptionalAttendees$p$2: function $h_MeetingRequest$_getOptionalAttendees$p$2() {
        return this._data$p$0.get__cc$i$0();
    },
    
    _getRequiredAttendees$p$2: function $h_MeetingRequest$_getRequiredAttendees$p$2() {
        return this._data$p$0.get__to$i$0();
    }
}


$h.MeetingSuggestion = function $h_MeetingSuggestion(data) {
    this.$$d__getEndTime$p$0 = Function.createDelegate(this, this._getEndTime$p$0);
    this.$$d__getStartTime$p$0 = Function.createDelegate(this, this._getStartTime$p$0);
    this.$$d__getSubject$p$0 = Function.createDelegate(this, this._getSubject$p$0);
    this.$$d__getLocation$p$0 = Function.createDelegate(this, this._getLocation$p$0);
    this.$$d__getAttendees$p$0 = Function.createDelegate(this, this._getAttendees$p$0);
    this.$$d__getMeetingString$p$0 = Function.createDelegate(this, this._getMeetingString$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'meetingString', this.$$d__getMeetingString$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'attendees', this.$$d__getAttendees$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'location', this.$$d__getLocation$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'subject', this.$$d__getSubject$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'start', this.$$d__getStartTime$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'end', this.$$d__getEndTime$p$0);
}
$h.MeetingSuggestion.prototype = {
    _data$p$0: null,
    _attendees$p$0: null,
    
    _getMeetingString$p$0: function $h_MeetingSuggestion$_getMeetingString$p$0() {
        return this._data$p$0['MeetingString'];
    },
    
    _getLocation$p$0: function $h_MeetingSuggestion$_getLocation$p$0() {
        return this._data$p$0['Location'];
    },
    
    _getSubject$p$0: function $h_MeetingSuggestion$_getSubject$p$0() {
        return this._data$p$0['Subject'];
    },
    
    _getStartTime$p$0: function $h_MeetingSuggestion$_getStartTime$p$0() {
        return this._data$p$0['StartTime'];
    },
    
    _getEndTime$p$0: function $h_MeetingSuggestion$_getEndTime$p$0() {
        return this._data$p$0['EndTime'];
    },
    
    _getAttendees$p$0: function $h_MeetingSuggestion$_getAttendees$p$0() {
        if (!this._attendees$p$0) {
            var $$t_1 = this;
            this._attendees$p$0 = $h.Entities._getExtractedObjects$i($h.EmailAddressDetails, this._data$p$0, 'Attendees', function(data) {
                return $h.EmailAddressDetails._createFromEmailUserDictionary$i(data);
            });
        }
        return this._attendees$p$0;
    }
}


$h.Message = function $h_Message(dataDictionary) {
    this.$$d__getConversationId$p$1 = Function.createDelegate(this, this._getConversationId$p$1);
    this.$$d__getInternetMessageId$p$1 = Function.createDelegate(this, this._getInternetMessageId$p$1);
    this.$$d__getCc$p$1 = Function.createDelegate(this, this._getCc$p$1);
    this.$$d__getTo$p$1 = Function.createDelegate(this, this._getTo$p$1);
    this.$$d__getFrom$p$1 = Function.createDelegate(this, this._getFrom$p$1);
    this.$$d__getSender$p$1 = Function.createDelegate(this, this._getSender$p$1);
    this.$$d__getNormalizedSubject$p$1 = Function.createDelegate(this, this._getNormalizedSubject$p$1);
    this.$$d__getSubject$p$1 = Function.createDelegate(this, this._getSubject$p$1);
    $h.Message.initializeBase(this, [ dataDictionary ]);
    $h.InitialData._defineReadOnlyProperty$i(this, 'subject', this.$$d__getSubject$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'normalizedSubject', this.$$d__getNormalizedSubject$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'sender', this.$$d__getSender$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'from', this.$$d__getFrom$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'to', this.$$d__getTo$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'cc', this.$$d__getCc$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'internetMessageId', this.$$d__getInternetMessageId$p$1);
    $h.InitialData._defineReadOnlyProperty$i(this, 'conversationId', this.$$d__getConversationId$p$1);
}
$h.Message.prototype = {
    
    getEntities: function $h_Message$getEntities() {
        return this._data$p$0._getEntities$i$0();
    },
    
    getEntitiesByType: function $h_Message$getEntitiesByType(entityType) {
        return this._data$p$0._getEntitiesByType$i$0(entityType);
    },
    
    getFilteredEntitiesByName: function $h_Message$getFilteredEntitiesByName(name) {
        return this._data$p$0._getFilteredEntitiesByName$i$0(name);
    },
    
    getRegExMatches: function $h_Message$getRegExMatches() {
        OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i(this._data$p$0.get__permissionLevel$i$0(), 1, 'getRegExMatches');
        return this._data$p$0._getRegExMatches$i$0();
    },
    
    getRegExMatchesByName: function $h_Message$getRegExMatchesByName(name) {
        OSF.DDA.OutlookAppOm._throwOnMethodCallForInsufficientPermission$i(this._data$p$0.get__permissionLevel$i$0(), 1, 'getRegExMatchesByName');
        return this._data$p$0._getRegExMatchesByName$i$0(name);
    },
    
    getItemType: function $h_Message$getItemType() {
        return Microsoft.Office.WebExtension.OutlookEnums.ItemType.Message;
    },
    
    _getSubject$p$1: function $h_Message$_getSubject$p$1() {
        return this._data$p$0.get__subject$i$0();
    },
    
    _getNormalizedSubject$p$1: function $h_Message$_getNormalizedSubject$p$1() {
        return this._data$p$0.get__normalizedSubject$i$0();
    },
    
    _getSender$p$1: function $h_Message$_getSender$p$1() {
        return this._data$p$0.get__sender$i$0();
    },
    
    _getFrom$p$1: function $h_Message$_getFrom$p$1() {
        return this._data$p$0.get__from$i$0();
    },
    
    _getTo$p$1: function $h_Message$_getTo$p$1() {
        return this._data$p$0.get__to$i$0();
    },
    
    _getCc$p$1: function $h_Message$_getCc$p$1() {
        return this._data$p$0.get__cc$i$0();
    },
    
    _getInternetMessageId$p$1: function $h_Message$_getInternetMessageId$p$1() {
        return this._data$p$0.get__internetMessageId$i$0();
    },
    
    _getConversationId$p$1: function $h_Message$_getConversationId$p$1() {
        return this._data$p$0.get__conversationId$i$0();
    }
}


$h.PhoneNumber = function $h_PhoneNumber(data) {
    this.$$d__getPhoneType$p$0 = Function.createDelegate(this, this._getPhoneType$p$0);
    this.$$d__getOriginalPhoneString$p$0 = Function.createDelegate(this, this._getOriginalPhoneString$p$0);
    this.$$d__getPhoneString$p$0 = Function.createDelegate(this, this._getPhoneString$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'phoneString', this.$$d__getPhoneString$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'originalPhoneString', this.$$d__getOriginalPhoneString$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'type', this.$$d__getPhoneType$p$0);
}
$h.PhoneNumber.prototype = {
    _data$p$0: null,
    
    _getPhoneString$p$0: function $h_PhoneNumber$_getPhoneString$p$0() {
        return this._data$p$0['PhoneString'];
    },
    
    _getOriginalPhoneString$p$0: function $h_PhoneNumber$_getOriginalPhoneString$p$0() {
        return this._data$p$0['OriginalPhoneString'];
    },
    
    _getPhoneType$p$0: function $h_PhoneNumber$_getPhoneType$p$0() {
        return this._data$p$0['Type'];
    }
}


$h.TaskSuggestion = function $h_TaskSuggestion(data) {
    this.$$d__getAssignees$p$0 = Function.createDelegate(this, this._getAssignees$p$0);
    this.$$d__getTaskString$p$0 = Function.createDelegate(this, this._getTaskString$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'taskString', this.$$d__getTaskString$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'assignees', this.$$d__getAssignees$p$0);
}
$h.TaskSuggestion.prototype = {
    _data$p$0: null,
    _assignees$p$0: null,
    
    _getTaskString$p$0: function $h_TaskSuggestion$_getTaskString$p$0() {
        return this._data$p$0['TaskString'];
    },
    
    _getAssignees$p$0: function $h_TaskSuggestion$_getAssignees$p$0() {
        if (!this._assignees$p$0) {
            var $$t_1 = this;
            this._assignees$p$0 = $h.Entities._getExtractedObjects$i($h.EmailAddressDetails, this._data$p$0, 'Assignees', function(data) {
                return $h.EmailAddressDetails._createFromEmailUserDictionary$i(data);
            });
        }
        return this._assignees$p$0;
    }
}


$h.UserProfile = function $h_UserProfile(data) {
    this.$$d__getTimeZone$p$0 = Function.createDelegate(this, this._getTimeZone$p$0);
    this.$$d__getEmailAddress$p$0 = Function.createDelegate(this, this._getEmailAddress$p$0);
    this.$$d__getDisplayName$p$0 = Function.createDelegate(this, this._getDisplayName$p$0);
    this._data$p$0 = data;
    $h.InitialData._defineReadOnlyProperty$i(this, 'displayName', this.$$d__getDisplayName$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'emailAddress', this.$$d__getEmailAddress$p$0);
    $h.InitialData._defineReadOnlyProperty$i(this, 'timeZone', this.$$d__getTimeZone$p$0);
}
$h.UserProfile.prototype = {
    _data$p$0: null,
    
    _getDisplayName$p$0: function $h_UserProfile$_getDisplayName$p$0() {
        return this._data$p$0.get__userDisplayName$i$0();
    },
    
    _getEmailAddress$p$0: function $h_UserProfile$_getEmailAddress$p$0() {
        return this._data$p$0.get__userEmailAddress$i$0();
    },
    
    _getTimeZone$p$0: function $h_UserProfile$_getTimeZone$p$0() {
        return this._data$p$0.get__userTimeZone$i$0();
    }
}


$h.RequestState = function() {}
$h.RequestState.prototype = {
    unsent: 0, 
    opened: 1, 
    headersReceived: 2, 
    loading: 3, 
    done: 4
}
$h.RequestState.registerEnum('$h.RequestState', false);


$h.EwsRequest = function $h_EwsRequest(userContext) {
    this.readyState = 1;
    $h.EwsRequest.initializeBase(this, [ userContext ]);
}
$h.EwsRequest.prototype = {
    status: 0,
    statusText: null,
    onreadystatechange: null,
    responseText: null,
    
    get__statusCode$i$1: function $h_EwsRequest$get__statusCode$i$1() {
        return this.status;
    },
    set__statusCode$i$1: function $h_EwsRequest$set__statusCode$i$1(value) {
        this.status = value;
        return value;
    },
    
    get__statusDescription$i$1: function $h_EwsRequest$get__statusDescription$i$1() {
        return this.statusText;
    },
    set__statusDescription$i$1: function $h_EwsRequest$set__statusDescription$i$1(value) {
        this.statusText = value;
        return value;
    },
    
    get__requestState$i$1: function $h_EwsRequest$get__requestState$i$1() {
        return this.readyState;
    },
    set__requestState$i$1: function $h_EwsRequest$set__requestState$i$1(value) {
        this.readyState = value;
        return value;
    },
    
    get__hasOnReadyStateChangeCallback$i$1: function $h_EwsRequest$get__hasOnReadyStateChangeCallback$i$1() {
        return !$h.ScriptHelpers.isNullOrUndefined(this.onreadystatechange);
    },
    
    get__response$i$1: function $h_EwsRequest$get__response$i$1() {
        return this.responseText;
    },
    set__response$i$1: function $h_EwsRequest$set__response$i$1(value) {
        this.responseText = value;
        return value;
    },
    
    send: function $h_EwsRequest$send(data) {
        this._checkSendConditions$i$1();
        if ($h.ScriptHelpers.isNullOrUndefined(data)) {
            this._throwInvalidStateException$i$1();
        }
        this._sendRequest$i$0(5, 'EwsRequest', { body: data });
    },
    
    _callOnReadyStateChangeCallback$i$1: function $h_EwsRequest$_callOnReadyStateChangeCallback$i$1() {
        if (!$h.ScriptHelpers.isNullOrUndefined(this.onreadystatechange)) {
            this.onreadystatechange();
        }
    },
    
    _parseExtraResponseData$i$1: function $h_EwsRequest$_parseExtraResponseData$i$1(response) {
    },
    
    _executeExtraFailedResponseSteps$i$1: function $h_EwsRequest$_executeExtraFailedResponseSteps$i$1() {
    }
}


$h.InitialData = function $h_InitialData(data) {
    this._data$p$0 = data;
}
$h.InitialData._defineReadOnlyProperty$i = function $h_InitialData$_defineReadOnlyProperty$i(o, methodName, getter) {
    var propertyDescriptor = { get: getter, configurable: false };
    Object.defineProperty(o, methodName, propertyDescriptor);
}
$h.InitialData.prototype = {
    _toRecipients$p$0: null,
    _ccRecipients$p$0: null,
    _resources$p$0: null,
    _entities$p$0: null,
    _data$p$0: null,
    
    get__permissionLevel$i$0: function $h_InitialData$get__permissionLevel$i$0() {
        var permissionLevel = this._data$p$0['permissionLevel'];
        return (!$h.ScriptHelpers.isUndefined(permissionLevel)) ? permissionLevel : 0;
    },
    
    get__itemId$i$0: function $h_InitialData$get__itemId$i$0() {
        return this._data$p$0['id'];
    },
    
    get__itemClass$i$0: function $h_InitialData$get__itemClass$i$0() {
        return this._data$p$0['itemClass'];
    },
    
    get__dateTimeCreated$i$0: function $h_InitialData$get__dateTimeCreated$i$0() {
        return this._data$p$0['dateTimeCreated'];
    },
    
    get__dateTimeModified$i$0: function $h_InitialData$get__dateTimeModified$i$0() {
        return this._data$p$0['dateTimeModified'];
    },
    
    get__subject$i$0: function $h_InitialData$get__subject$i$0() {
        return this._data$p$0['subject'];
    },
    
    get__normalizedSubject$i$0: function $h_InitialData$get__normalizedSubject$i$0() {
        return this._data$p$0['normalizedSubject'];
    },
    
    get__internetMessageId$i$0: function $h_InitialData$get__internetMessageId$i$0() {
        return this._data$p$0['internetMessageId'];
    },
    
    get__conversationId$i$0: function $h_InitialData$get__conversationId$i$0() {
        return this._data$p$0['conversationId'];
    },
    
    get__sender$i$0: function $h_InitialData$get__sender$i$0() {
        this._throwOnRestrictedPermissionLevel$p$0();
        var sender = this._data$p$0['sender'];
        return ($h.ScriptHelpers.isNullOrUndefined(sender)) ? null : new $h.EmailAddressDetails(sender);
    },
    
    get__from$i$0: function $h_InitialData$get__from$i$0() {
        this._throwOnRestrictedPermissionLevel$p$0();
        var from = this._data$p$0['from'];
        return ($h.ScriptHelpers.isNullOrUndefined(from)) ? null : new $h.EmailAddressDetails(from);
    },
    
    get__to$i$0: function $h_InitialData$get__to$i$0() {
        this._throwOnRestrictedPermissionLevel$p$0();
        if (null === this._toRecipients$p$0) {
            this._toRecipients$p$0 = this._createEmailAddressDetails$p$0('to');
        }
        return this._toRecipients$p$0;
    },
    
    get__cc$i$0: function $h_InitialData$get__cc$i$0() {
        this._throwOnRestrictedPermissionLevel$p$0();
        if (null === this._ccRecipients$p$0) {
            this._ccRecipients$p$0 = this._createEmailAddressDetails$p$0('cc');
        }
        return this._ccRecipients$p$0;
    },
    
    get__start$i$0: function $h_InitialData$get__start$i$0() {
        return this._data$p$0['start'];
    },
    
    get__end$i$0: function $h_InitialData$get__end$i$0() {
        return this._data$p$0['end'];
    },
    
    get__location$i$0: function $h_InitialData$get__location$i$0() {
        return this._data$p$0['location'];
    },
    
    get__resources$i$0: function $h_InitialData$get__resources$i$0() {
        this._throwOnRestrictedPermissionLevel$p$0();
        if (null === this._resources$p$0) {
            this._resources$p$0 = this._createEmailAddressDetails$p$0('resources');
        }
        return this._resources$p$0;
    },
    
    get__organizer$i$0: function $h_InitialData$get__organizer$i$0() {
        this._throwOnRestrictedPermissionLevel$p$0();
        var organizer = this._data$p$0['organizer'];
        return ($h.ScriptHelpers.isNullOrUndefined(organizer)) ? null : new $h.EmailAddressDetails(organizer);
    },
    
    get__userDisplayName$i$0: function $h_InitialData$get__userDisplayName$i$0() {
        return this._data$p$0['userDisplayName'];
    },
    
    get__userEmailAddress$i$0: function $h_InitialData$get__userEmailAddress$i$0() {
        return this._data$p$0['userEmailAddress'];
    },
    
    get__userTimeZone$i$0: function $h_InitialData$get__userTimeZone$i$0() {
        return this._data$p$0['userTimeZone'];
    },
    
    _getEntities$i$0: function $h_InitialData$_getEntities$i$0() {
        if (!this._entities$p$0) {
            this._entities$p$0 = new $h.Entities(this._data$p$0['entities'], this._data$p$0['filteredEntities'], this.get__permissionLevel$i$0());
        }
        return this._entities$p$0;
    },
    
    _getEntitiesByType$i$0: function $h_InitialData$_getEntitiesByType$i$0(entityType) {
        var entites = this._getEntities$i$0();
        return entites._getByType$i$0(entityType);
    },
    
    _getFilteredEntitiesByName$i$0: function $h_InitialData$_getFilteredEntitiesByName$i$0(name) {
        var entities = this._getEntities$i$0();
        return entities._getFilteredEntitiesByName$i$0(name);
    },
    
    _getRegExMatches$i$0: function $h_InitialData$_getRegExMatches$i$0() {
        if (!this._data$p$0['regExMatches']) {
            return null;
        }
        return this._data$p$0['regExMatches'];
    },
    
    _getRegExMatchesByName$i$0: function $h_InitialData$_getRegExMatchesByName$i$0(regexName) {
        var regexMatches = this._getRegExMatches$i$0();
        if (!regexMatches || !regexMatches[regexName]) {
            return null;
        }
        return regexMatches[regexName];
    },
    
    _createEmailAddressDetails$p$0: function $h_InitialData$_createEmailAddressDetails$p$0(key) {
        var to = this._data$p$0[key];
        if ($h.ScriptHelpers.isNullOrUndefined(to)) {
            return [];
        }
        var recipients = [];
        for (var i = 0; i < to.length; i++) {
            if (!$h.ScriptHelpers.isNullOrUndefined(to[i])) {
                recipients[i] = new $h.EmailAddressDetails(to[i]);
            }
        }
        return recipients;
    },
    
    _throwOnRestrictedPermissionLevel$p$0: function $h_InitialData$_throwOnRestrictedPermissionLevel$p$0() {
        OSF.DDA.OutlookAppOm._throwOnPropertyAccessForRestrictedPermission$i(this.get__permissionLevel$i$0());
    }
}


$h._loadDictionaryRequest = function $h__loadDictionaryRequest(createResultObject, dictionaryName, callback, userContext) {
    $h._loadDictionaryRequest.initializeBase(this, [ userContext ]);
    this._createResultObject$p$1 = createResultObject;
    this._dictionaryName$p$1 = dictionaryName;
    this._callback$p$1 = callback;
}
$h._loadDictionaryRequest.prototype = {
    _dictionaryName$p$1: null,
    _createResultObject$p$1: null,
    _callback$p$1: null,
    
    handleResponse: function $h__loadDictionaryRequest$handleResponse(response) {
        if (response['wasSuccessful']) {
            var value = response[this._dictionaryName$p$1];
            var responseData = Sys.Serialization.JavaScriptSerializer.deserialize(value);
            this.createAsyncResult(this._createResultObject$p$1(responseData), 0, null);
        }
        else {
            this.createAsyncResult(null, 1, response['errorMessage']);
        }
        this._callback$p$1(this._asyncResult$p$0);
    }
}


$h.ProxyRequestBase = function $h_ProxyRequestBase(userContext) {
    $h.ProxyRequestBase.initializeBase(this, [ userContext ]);
}
$h.ProxyRequestBase.prototype = {
    
    handleResponse: function $h_ProxyRequestBase$handleResponse(response) {
        if (!(response['wasProxySuccessful'])) {
            this.set__statusCode$i$1(500);
            this.set__statusDescription$i$1('Error');
            var errorMessage = response['errorMessage'];
            this.set__response$i$1(errorMessage);
            this.createAsyncResult(null, 1, errorMessage);
        }
        else {
            this.set__statusCode$i$1(response['statusCode']);
            this.set__statusDescription$i$1(response['statusDescription']);
            this.set__response$i$1(response['body']);
            this.createAsyncResult(this.get__response$i$1(), 0, null);
        }
        this._parseExtraResponseData$i$1(response);
        this._cycleReadyStateFromHeadersReceivedToLoadingToDone$i$1();
    },
    
    _throwInvalidStateException$i$1: function $h_ProxyRequestBase$_throwInvalidStateException$i$1() {
        throw Error.create('DOMException', { code: 11, message: 'INVALID_STATE_ERR' });
    },
    
    _cycleReadyStateFromHeadersReceivedToLoadingToDone$i$1: function $h_ProxyRequestBase$_cycleReadyStateFromHeadersReceivedToLoadingToDone$i$1() {
        var $$t_0 = this;
        this._changeReadyState$i$1(2, function() {
            $$t_0._changeReadyState$i$1(3, function() {
                $$t_0._changeReadyState$i$1(4, null);
            });
        });
    },
    
    _changeReadyState$i$1: function $h_ProxyRequestBase$_changeReadyState$i$1(state, nextStep) {
        this.set__requestState$i$1(state);
        var $$t_2 = this;
        window.setTimeout(function() {
            try {
                $$t_2._callOnReadyStateChangeCallback$i$1();
            }
            finally {
                if (!$h.ScriptHelpers.isNullOrUndefined(nextStep)) {
                    nextStep();
                }
            }
        }, 0);
    },
    
    _checkSendConditions$i$1: function $h_ProxyRequestBase$_checkSendConditions$i$1() {
        if (this.get__requestState$i$1() !== 1) {
            this._throwInvalidStateException$i$1();
        }
        if (this._isSent$p$0) {
            this._throwInvalidStateException$i$1();
        }
    }
}


$h.RequestBase = function $h_RequestBase(userContext) {
    this._userContext$p$0 = userContext;
}
$h.RequestBase.prototype = {
    _isSent$p$0: false,
    _asyncResult$p$0: null,
    _userContext$p$0: null,
    
    _sendRequest$i$0: function $h_RequestBase$_sendRequest$i$0(dispid, methodName, dataToSend) {
        this._isSent$p$0 = true;
        var $$t_5 = this;
        OSF.DDA.Outlook._invokeHostMethod$i(dispid, methodName, dataToSend, function(resultCode, response) {
            if (resultCode) {
                $$t_5.createAsyncResult(null, 1, 'Internal protocol error: ' + resultCode);
            }
            else {
                $$t_5.handleResponse(response);
            }
        });
    },
    
    createAsyncResult: function $h_RequestBase$createAsyncResult(value, errorCode, errorDescription) {
        this._asyncResult$p$0 = OSF.DDA.Outlook._createAsyncResult$i(value, errorCode, errorDescription, this._userContext$p$0);
    }
}


$h._saveDictionaryRequest = function $h__saveDictionaryRequest(callback, userContext) {
    $h._saveDictionaryRequest.initializeBase(this, [ userContext ]);
    if (!$h.ScriptHelpers.isNullOrUndefined(callback)) {
        this._callback$p$1 = callback;
    }
}
$h._saveDictionaryRequest.prototype = {
    _callback$p$1: null,
    
    handleResponse: function $h__saveDictionaryRequest$handleResponse(response) {
        if (response['wasSuccessful']) {
            this.createAsyncResult(null, 0, null);
        }
        else {
            this.createAsyncResult(null, 1, response['errorMessage']);
        }
        if (!$h.ScriptHelpers.isNullOrUndefined(this._callback$p$1)) {
            this._callback$p$1(this._asyncResult$p$0);
        }
    }
}


$h.ScriptHelpers = function $h_ScriptHelpers() {
}
$h.ScriptHelpers.isNull = function $h_ScriptHelpers$isNull(value) {
    return null === value;
}
$h.ScriptHelpers.isNullOrUndefined = function $h_ScriptHelpers$isNullOrUndefined(value) {
    return $h.ScriptHelpers.isNull(value) || $h.ScriptHelpers.isUndefined(value);
}
$h.ScriptHelpers.isUndefined = function $h_ScriptHelpers$isUndefined(value) {
    return value === undefined;
}
$h.ScriptHelpers.dictionaryContainsKey = function $h_ScriptHelpers$dictionaryContainsKey(obj, keyName) {
    return (Object.isInstanceOfType(obj)) ? keyName in obj : false;
}


OSF.DDA.Outlook.registerClass('OSF.DDA.Outlook', OSF.DDA.Application);
OSF.DDA.OutlookAppOm.registerClass('OSF.DDA.OutlookAppOm');
$h.Item.registerClass('$h.Item');
$h.Appointment.registerClass('$h.Appointment', $h.Item);
$h.Contact.registerClass('$h.Contact');
$h.CustomProperties.registerClass('$h.CustomProperties');
$h.EmailAddressDetails.registerClass('$h.EmailAddressDetails');
$h.Entities.registerClass('$h.Entities');
$h.Message.registerClass('$h.Message', $h.Item);
$h.MeetingRequest.registerClass('$h.MeetingRequest', $h.Message);
$h.MeetingSuggestion.registerClass('$h.MeetingSuggestion');
$h.PhoneNumber.registerClass('$h.PhoneNumber');
$h.TaskSuggestion.registerClass('$h.TaskSuggestion');
$h.UserProfile.registerClass('$h.UserProfile');
$h.RequestBase.registerClass('$h.RequestBase');
$h.ProxyRequestBase.registerClass('$h.ProxyRequestBase', $h.RequestBase);
$h.EwsRequest.registerClass('$h.EwsRequest', $h.ProxyRequestBase);
$h.InitialData.registerClass('$h.InitialData');
$h._loadDictionaryRequest.registerClass('$h._loadDictionaryRequest', $h.RequestBase);
$h._saveDictionaryRequest.registerClass('$h._saveDictionaryRequest', $h.RequestBase);
$h.ScriptHelpers.registerClass('$h.ScriptHelpers');
OSF.DDA.Outlook._instance$p = null;
OSF.DDA.OutlookAppOm._maxRecipients$p = 100;
OSF.DDA.OutlookAppOm._maxSubjectLength$p = 255;
OSF.DDA.OutlookAppOm._maxBodyLength$p = 32768;
OSF.DDA.OutlookAppOm._maxLocationLength$p = 255;
OSF.DDA.OutlookAppOm._maxEwsRequestSize$p = 1000000;
$h.EmailAddressDetails._emptyString$p = '';
$h.EmailAddressDetails._responseTypeMap$p = [ Microsoft.Office.WebExtension.OutlookEnums.ResponseType.None, Microsoft.Office.WebExtension.OutlookEnums.ResponseType.Organizer, Microsoft.Office.WebExtension.OutlookEnums.ResponseType.Tentative, Microsoft.Office.WebExtension.OutlookEnums.ResponseType.Accepted, Microsoft.Office.WebExtension.OutlookEnums.ResponseType.Declined ];
$h.EmailAddressDetails._recipientTypeMap$p = [ Microsoft.Office.WebExtension.OutlookEnums.RecipientType.Other, Microsoft.Office.WebExtension.OutlookEnums.RecipientType.DistributionList, Microsoft.Office.WebExtension.OutlookEnums.RecipientType.User, Microsoft.Office.WebExtension.OutlookEnums.RecipientType.ExternalUser ];
$h.Entities._allEntityKeys$p = [ 'Addresses', 'EmailAddresses', 'Urls', 'PhoneNumbers', 'TaskSuggestions', 'MeetingSuggestions', 'Contacts' ];
/* Office rich client common JavaScript OM library */
/* Version: 15.0.3919 */
/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/

OSF.DDA.RichInitializationReason={
	1: Microsoft.Office.WebExtension.InitializationReason.Inserted,
	2: Microsoft.Office.WebExtension.InitializationReason.DocumentOpened
};
OSF.DDA.RichClientSettingsManager={
	read: function OSF_DDA_RichClientSettingsManager$Read(onCalling, onReceiving) {
		var keys=[];
		var values=[];
		if (onCalling) {
			onCalling();
		}
		window.external.GetContext().GetSettings().Read(keys, values);
		if (onReceiving) {
			onReceiving();
		}
		var serializedSettings={};
		for (var index=0; index < keys.length; index++) {
			serializedSettings[keys[index]]=values[index];
		}

		// Outlook specific changes (not coming from original OSF's OsfRichCommon.debug.js)
		// This retrieves the actual settings.
		var outlookSettingValues = serializedSettings['SettingsKey'];
		if (outlookSettingValues) {
			if(JSON)
				serializedSettings = JSON.parse(outlookSettingValues);
			else
				serializedSettings = Sys.Serialization.JavaScriptSerializer.deserialize(outlookSettingValues);
		}
		// end of Outlook specific changes in this method.

		return serializedSettings;
	},
	write: function OSF_DDA_RichClientSettingsManager$Write(serializedSettings, overwriteIfStale, onCalling, onReceiving) {
		var keys=[];
		var values=[];

		// Outlook specific changes (not coming from original OSF's OsfRichCommon.debug.js)
		// This combines the settings into 1 single json string
		var outlookSerializedSettings;
		if(JSON)
			outlookSerializedSettings=JSON.stringify(serializedSettings);
		else
			outlookSerializedSettings=Sys.Serialization.JavaScriptSerializer.serialize(serializedSettings);

		keys.push('SettingsKey');
		values.push(outlookSerializedSettings);
		// end of Outlook specific changes in this method.

		if (onCalling) {
			onCalling();
		}
		window.external.GetContext().GetSettings().Write(keys, values);
		if (onReceiving) {
			onReceiving();
		}
	}
};
OSF.DDA.DispIdHost.getRichClientDelegateMethods=function (actionId) {
	var delegateMethods={};
	delegateMethods[OSF.DDA.DispIdHost.Delegates.ExecuteAsync]=OSF.DDA.SafeArray.Delegate.executeAsync;
	delegateMethods[OSF.DDA.DispIdHost.Delegates.RegisterEventAsync]=OSF.DDA.SafeArray.Delegate.registerEventAsync;
	delegateMethods[OSF.DDA.DispIdHost.Delegates.UnregisterEventAsync]=OSF.DDA.SafeArray.Delegate.unregisterEventAsync;
	function getSettingsExecuteMethod(hostDelegateMethod) {
		return function (args) {
			var status, response;
			try {
				response=hostDelegateMethod(args.hostCallArgs, args.onCalling, args.onReceiving);
				status=OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess;
			} catch (ex) {
				status=OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError;
				response={ name : Strings.OfficeOM.L_InternalError, message : ex };
			}
			if (args.onComplete) {
				args.onComplete(status, response);
			}
		};
	}
	function readSerializedSettings(hostCallArgs, onCalling, onReceiving) {
		return OSF.DDA.RichClientSettingsManager.read(onCalling, onReceiving);
	}
	function writeSerializedSettings(hostCallArgs, onCalling, onReceiving) {
		return OSF.DDA.RichClientSettingsManager.write(
			hostCallArgs[OSF.DDA.SettingsManager.SerializedSettings],
			hostCallArgs[Microsoft.Office.WebExtension.Parameters.OverwriteIfStale],
			onCalling,
			onReceiving
		);
	}
	switch (actionId) {
		case OSF.DDA.AsyncMethodNames.RefreshAsync.id:
			delegateMethods[OSF.DDA.DispIdHost.Delegates.ExecuteAsync]=getSettingsExecuteMethod(readSerializedSettings);
			break;
		case OSF.DDA.AsyncMethodNames.SaveAsync.id:
			delegateMethods[OSF.DDA.DispIdHost.Delegates.ExecuteAsync]=getSettingsExecuteMethod(writeSerializedSettings);
			break;
		default:
			break;
	}
	return delegateMethods;
}
OSF.DDA.CustomXmlParts=function OSF_DDA_CustomXmlParts() {
	this._eventDispatches=[];
	var am=OSF.DDA.AsyncMethodNames;
	OSF.DDA.DispIdHost.addAsyncMethods(this, [
		am.AddDataPartAsync,
		am.GetDataPartByIdAsync,
		am.GetDataPartsByNameSpaceAsync
	]);
};
OSF.DDA.CustomXmlPart=function OSF_DDA_CustomXmlPart(customXmlParts, id, builtIn) {
	Object.defineProperties(this, {
		"builtIn": {
			value: builtIn,
			writeable: false,
			configurable: false
		},
		"id": {
			value: id,
			writeable: false,
			configurable: false
		},
		"namespaceManager": {
			value: new OSF.DDA.CustomXmlPrefixMappings(id),
			writeable: false,
			configurable: false
		}
	});
	var am=OSF.DDA.AsyncMethodNames;
	OSF.DDA.DispIdHost.addAsyncMethods(this, [
		am.DeleteDataPartAsync,
		am.GetPartNodesAsync,
		am.GetPartXmlAsync
	]);
	var customXmlPartEventDispatches=customXmlParts._eventDispatches;
	var dispatch=customXmlPartEventDispatches[id];
	if (!dispatch) {
		var et=Microsoft.Office.WebExtension.EventType;
		dispatch=new OSF.EventDispatch([
			et.DataNodeDeleted,
			et.DataNodeInserted,
			et.DataNodeReplaced
		]);
		customXmlPartEventDispatches[id]=dispatch;
	}
	OSF.DDA.DispIdHost.addEventSupport(this, dispatch);
};
OSF.DDA.CustomXmlPrefixMappings=function OSF_DDA_CustomXmlPrefixMappings(partId) {
	var am=OSF.DDA.AsyncMethodNames;
	OSF.DDA.DispIdHost.addAsyncMethods(
		this,
		[
			am.AddDataPartNamespaceAsync,
			am.GetDataPartNamespaceAsync,
			am.GetDataPartPrefixAsync
		],
		partId
	);
};
OSF.DDA.CustomXmlNode=function OSF_DDA_CustomXmlNode(handle, nodeType, ns, baseName) {
	Object.defineProperties(this, {
		"baseName": {
			value: baseName,
			writeable: false,
			configurable: false
		},
		"namespaceUri": {
			value: ns,
			writeable: false,
			configurable: false
		},
		"nodeType": {
			value: nodeType,
			writeable: false,
			configurable: false
		}
	});
	var am=OSF.DDA.AsyncMethodNames;
	OSF.DDA.DispIdHost.addAsyncMethods(
		this,
		[
			am.GetRelativeNodesAsync,
			am.GetNodeValueAsync,
			am.GetNodeXmlAsync,
			am.SetNodeValueAsync,
			am.SetNodeXmlAsync
		],
		handle
	);
};
OSF.DDA.NodeInsertedEventArgs=function OSF_DDA_NodeInsertedEventArgs(newNode, inUndoRedo) {
	Object.defineProperties(this, {
		"type": {
			value: Microsoft.Office.WebExtension.EventType.DataNodeInserted,
			writeable: false,
			configurable: false
		},
		"newNode": {
			value: newNode,
			writeable: false,
			configurable: false
		},
		"inUndoRedo": {
			value: inUndoRedo,
			writeable: false,
			configurable: false
		}
	});
};
OSF.DDA.NodeReplacedEventArgs=function OSF_DDA_NodeReplacedEventArgs(oldNode, newNode, inUndoRedo) {
	Object.defineProperties(this, {
		"type": {
			value: Microsoft.Office.WebExtension.EventType.DataNodeReplaced,
			writeable: false,
			configurable: false
		},
		"oldNode": {
			value: oldNode,
			writeable: false,
			configurable: false
		},
		"newNode": {
			value: newNode,
			writeable: false,
			configurable: false
		},
		"inUndoRedo": {
			value: inUndoRedo,
			writeable: false,
			configurable: false
		}
	});
};
OSF.DDA.NodeDeletedEventArgs=function OSF_DDA_NodeDeletedEventArgs(oldNode, oldNextSibling, inUndoRedo) {
	Object.defineProperties(this, {
		"type": {
			value: Microsoft.Office.WebExtension.EventType.DataNodeDeleted,
			writeable: false,
			configurable: false
		},
		"oldNode": {
			value: oldNode,
			writeable: false,
			configurable: false
		},
		"oldNextSibling": {
			value: oldNextSibling,
			writeable: false,
			configurable: false
		},
		"inUndoRedo": {
			value: inUndoRedo,
			writeable: false,
			configurable: false
		}
	});
};
OSF.OUtil.getTrailingItem=function OSF_OUtil$getTrailingFunction(list, type) {
	if (list.length > 0) {
		var candidate=list[list.length - 1];
		if (typeof candidate==type)
			return candidate;
	}
	return null;
}
OSF.OUtil.checkParamsAndGetCallback=function OSF_OUtil$checkParamsAndGetCallback(suppliedArguments, expectedArguments) {
	var callback=OSF.OUtil.getTrailingItem(suppliedArguments, "function");
	var options=OSF.OUtil.getTrailingItem(suppliedArguments, "object");
	if (options) {
		if (options[Microsoft.Office.WebExtension.Parameters.Callback]) {
			if (callback) {
				throw OSF.OUtil.formatString(Strings.OfficeOM.L_RedundantCallbackSpecification);
			} else {
				callback=options[Microsoft.Office.WebExtension.Parameters.Callback];
				var callbackType=typeof callback;
				if (callbackType !="function") {
					throw OSF.OUtil.formatString(Strings.OfficeOM.L_CallbackNotAFunction, callbackType);
				}
			}
		}
	}
	expectedArguments.push({ name: "options", type: Object, optional: true });
	var e=Function._validateParams(suppliedArguments, expectedArguments, false );
	if (e) throw e;
	return callback;
}
OSF.DDA.Settings=function OSF_DDA_Settings(settings) {
	settings=settings || {};
	Object.defineProperties(this, {
		"get": {
			value: function OSF_DDA_Settings$get(name) {
				var e=Function._validateParams(arguments, [
					{ name: "name", type: String, mayBeNull: false }
				]);
				if (e) throw e;
				var setting=settings[name];
				return setting || null;
			}
		},
		"set": {
			value: function OSF_DDA_Settings$set(name, value) {
				var e=Function._validateParams(arguments, [
					{ name: "name", type: String, mayBeNull: false },
					{ name: "value", mayBeNull: true }
				]);
				if (e) throw e;
				settings[name]=value;
			}
		},
		"remove": {
			value: function OSF_DDA_Settings$remove(name) {
				var e=Function._validateParams(arguments, [
					{ name: "name", type: String, mayBeNull: false }
				]);
				if (e) throw e;
				delete settings[name];
			}
		},
		"saveAsync": {
			value: function OSF_DDA_Settings$saveAsync(options) {
				var callback=OSF.OUtil.checkParamsAndGetCallback(arguments, []);
				options=options || {};

				var errorArgs;

				try {
					var serializedSettings = OSF.DDA.SettingsManager.serializeSettings(settings);
					OSF.DDA.RichClientSettingsManager.write(serializedSettings);
				}
				catch (ex) {
					errorArgs={};
					errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name]=OSF.DDA.AsyncResultEnum.ErrorCode.Failed;
					errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message]=ex.message;
				}

				if(callback) {
					var initArgs={};
					initArgs[OSF.DDA.AsyncResultEnum.Properties.Context]=options[Microsoft.Office.WebExtension.Parameters.AsyncContext];
					initArgs[OSF.DDA.AsyncResultEnum.Properties.Value]=this;

					var asyncResult=new OSF.DDA.AsyncResult(initArgs, errorArgs);
					callback(asyncResult);
				}
			}
		},
	});
	OSF.OUtil.finalizeProperties(this);
};

