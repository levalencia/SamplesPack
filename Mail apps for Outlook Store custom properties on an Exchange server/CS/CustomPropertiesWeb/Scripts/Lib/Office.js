/* Office JavaScript OM library */
/* Version: 15.0.3919 */
/*
	Copyright (c) Microsoft Corporation.  All rights reserved.
*/

(function(window) {
var OSF=OSF || {};
OSF.OUtil=(function () {
	var _uniqueId=-1;
	var _xdmInfoKey='&_xdm_Info=';
	var _xdmSessionKeyPrefix='_xdm_';
	var _fragmentSeparator='#';
	var _loadedScripts={};
	function _random() {
		return Math.floor(100000001 * Math.random()).toString();
	};
	return {
		extend: function OSF_OUtil$extend(child, parent) {
			var F=function () { };
			F.prototype=parent.prototype;
			child.prototype=new F();
			child.prototype.constructor=child;
			child.uber=parent.prototype;
			if (parent.prototype.constructor===Object.prototype.constructor) {
				parent.prototype.constructor=parent;
			}
		},
		setNamespace: function OSF_OUtil$setNamespace(name, parent) {
			if (parent && name && !parent[name]) {
				parent[name]={};
			}
		},
		unsetNamespace: function OSF_OUtil$unsetNamespace(name, parent) {
			if (parent && name && parent[name]) {
				delete parent[name];
			}
		},
		loadScript: function OSF_OUtil$loadScript(url, callback) {
			if (url && callback) {
				var doc=window.document;
				var _loadedScriptEntry=_loadedScripts[url];
				if (!_loadedScriptEntry) {
					var script=doc.createElement("script");
					script.type="text/javascript";
					_loadedScriptEntry={ loaded: false, pendingCallbacks: [callback] };
					_loadedScripts[url]=_loadedScriptEntry;
					var onLoadCallback=function () {
						_loadedScriptEntry.loaded=true;
						var pendingCallbackCount=_loadedScriptEntry.pendingCallbacks.length;
						for (var i=0; i < pendingCallbackCount; i++) {
							var currentCallback=_loadedScriptEntry.pendingCallbacks.shift();
							currentCallback();
						}
					};
					if (script.readyState) {
						script.onreadystatechange=function () {
							if (script.readyState=="loaded" || script.readyState=="complete") {
								script.onreadystatechange=null;
								onLoadCallback();
							}
						};
					} else {
						script.onload=onLoadCallback;
					}
					script.src=url;
					doc.getElementsByTagName("head")[0].appendChild(script);
				} else if (_loadedScriptEntry.loaded) {
					callback();
				} else {
					_loadedScriptEntry.pendingCallbacks.push(callback);
				}
			}
		},
		loadCSS: function OSF_OUtil$loadCSS(url) {
			if (url) {
				var doc=window.document;
				var link=doc.createElement("link");
				link.type="text/css";
				link.rel="stylesheet";
				link.href=url;
				doc.getElementsByTagName("head")[0].appendChild(link);
			}
		},
		parseEnum: function OSF_OUtil$parseEnum(str, enumObject) {
			var parsed=enumObject[str.trim()];
			if (typeof (parsed)=='undefined') {
				Sys.Debug.trace("invalid enumeration string:"+str);
				throw Error.argument("str");
			}
			return parsed;
		},
		getUniqueId: function OSF_OUtil$getUniqueId() {
			_uniqueId=_uniqueId+1;
			return _uniqueId.toString();
		},
		formatString: function OSF_OUtil$formatString() {
			var args=arguments;
			var source=args[0];
			return source.replace(/{(\d+)}/gm, function (match, number) {
				var index=parseInt(number, 10)+1;
				return args[index]===undefined ? '{'+number+'}' : args[index];
			});
		},
		generateConversationId: function OSF_OUtil$generateConversationId() {
			return [_random(), _random(), (new Date()).getTime().toString()].join('_');
		},
		getFrameNameAndConversationId: function OSF_OUtil$getFrameNameAndConversationId(cacheKey, frame) {
			var frameName=_xdmSessionKeyPrefix+cacheKey+this.generateConversationId();
			frame.setAttribute("name", frameName);
			return this.generateConversationId();
		},
		addXdmInfoAsHash: function OSF_OUtil$addXdmInfoAsHash(url, xdmInfoValue) {
			url=url.trim() || '';
			var urlParts=url.split(_fragmentSeparator);
			var urlWithoutFragment=urlParts.shift();
			var fragment=urlParts.join(_fragmentSeparator);
			return [urlWithoutFragment, _fragmentSeparator, fragment, _xdmInfoKey, xdmInfoValue].join('');
		},
		parseXdmInfo: function OSF_OUtil$parseXdmInfo() {
			var fragment=window.location.hash;
			var fragmentParts=fragment.split(_xdmInfoKey);
			var xdmInfoValue=fragmentParts.length > 1 ? fragmentParts[fragmentParts.length - 1] : null;
			if(window.sessionStorage) {
				var sessionKeyStart=window.name.indexOf(_xdmSessionKeyPrefix);
				if (sessionKeyStart > -1) {
					var sessionKeyEnd=window.name.indexOf(";", sessionKeyStart);
					if (sessionKeyEnd==-1) {
						sessionKeyEnd=window.name.length;
					}
					var sessionKey=window.name.substring(sessionKeyStart, sessionKeyEnd);
					if (xdmInfoValue) {
						window.sessionStorage.setItem(sessionKey, xdmInfoValue);
					} else {
						xdmInfoValue=window.sessionStorage.getItem(sessionKey)
					}
				}
			}
			return xdmInfoValue;
		},
		getConversationId: function OSF_OUtil$getConversationId() {
			var searchString=window.location.search;
			var conversationId=null;
			if (searchString) {
				var index=searchString.indexOf("&");
				conversationId=index > 0 ? searchString.substring(1, index) : searchString.substr(1);
			}
			return conversationId;
		},
		validateParamObject: function OSF_OUtil$validateParamObject(params, expectedProperties, callback) {
			var e=Function._validateParams(arguments, [
				{ name: "params", type: Object, mayBeNull: false },
				{ name: "expectedProperties", type: Object, mayBeNull: false },
				{ name: "callback", type: Function, mayBeNull: true }
			]);
			if (e) throw e;
			for (var p in expectedProperties) {
				e=Function._validateParameter(params[p], expectedProperties[p], p);
				if (e) throw e;
			}
		},
		writeProfilerMark: function OSF_OUtil$writeProfilerMark(text) {
			if (window.msWriteProfilerMark) window.msWriteProfilerMark(text);
		},
		defineMutableProperty: function OSF_OUtil$defineMutableProperty(obj, prop, descriptor) {
			descriptor=descriptor || {};
			descriptor.writable=descriptor.writable || true;
			descriptor.configurable=descriptor.configurable || true;
			descriptor.enumerable=descriptor.enumerable || true;
			Object.defineProperty(obj, prop, descriptor);
			return obj;
		},
		defineMutableProperties: function OSF_OUtil$defineMutableProperties(obj, descriptors) {
			descriptors=descriptors || {};
			for (var prop in descriptors) {
				OSF.OUtil.defineMutableProperty(obj, prop, descriptors[prop]);
			}
			return obj;
		},
		finalizeProperties: function OSF_OUtil$finalizeProperties(obj, descriptor) {
			descriptor=descriptor || {};
			var props=Object.getOwnPropertyNames(obj);
			for (var prop in props) {
				var desc=Object.getOwnPropertyDescriptor(obj, props[prop]);
				desc.writable=descriptor.writable || false;
				desc.configurable=descriptor.configurable || false;
				desc.enumerable=descriptor.enumerable || true;
			}
			return obj;
		},
		mapList: function OSF_OUtil$MapList(list, mapFunction) {
			var ret=[];
			if (list) {
				for (var item in list) {
					ret.push(mapFunction(list[item]));
				}
			}
			return ret;
		},
		listContainsKey: function OSF_OUtil$listContainsKey(list, key) {
			for (var item in list) {
				if (key==item) {
					return true;
				}
			}
			return false;
		},
		listContainsValue: function OSF_OUtil$listContainsElement(list, value) {
			for (var item in list) {
				if (value==list[item]) {
					return true;
				}
			}
			return false;
		},
		augmentList: function OSF_OUtil$augmentList(list, addenda) {
			var add=list.push ? function (key, value) { list.push(value) } : function (key, value) { list[key]=value };
			for (var key in addenda) {
				add(key, addenda[key]);
			}
		},
		isArray: function OSF_OUtil$isArray(obj) {
			return Object.prototype.toString.apply(obj)==="[object Array]";
		},
		addEventListener: function OSF_OUtil$addEventListener(element, eventName, listener) {
			if (element.attachEvent) {
				element.attachEvent("on"+eventName, listener);
			} else if (element.addEventListener) {
				element.addEventListener(eventName, listener, false);
			} else {
				element["on"+eventName]=listener;
			}
		},
		removeEventListener: function OSF_OUtil$removeEventListener(element, eventName, listener) {
			if (element.detachEvent) {
				element.detachEvent("on"+eventName, listener);
			} else if (element.removeEventListener) {
				element.removeEventListener(eventName, listener, false);
			} else {
				element["on"+eventName]=null;
			}
		},
		encodeBase64: function OSF_Outil$encodeBase64(input) {
			var codex="ABCDEFGHIJKLMNOP"+						"QRSTUVWXYZabcdef"+						"ghijklmnopqrstuv"+						"wxyz0123456789+/"+						"=";
			var output=[];
			var temp=[];
			var index=0;
			var a, b, c;
			var length=input.length;
			do {
				a=input[index++];
				b=input[index++];
				c=input[index++];
				temp[0]=a >> 2;
				temp[1]=((a & 3) << 4) | (b >> 4);
				temp[2]=((b & 15) << 2) | (c >> 6);
				temp[3]=c & 63;
				if (isNaN(b)) {
					temp[2]=temp[3]=64;
				} else if (isNaN(c)) {
					temp[3]=64;
				}
				for (var t=0; t < 4; t++) {
					output.push(codex.charAt(temp[t]));
				}
			} while (index < length);
			return output.join("");
		}
	};
})();
window.OSF=OSF;
OSF.OUtil.setNamespace("OSF", window);
OSF.HostCallPerfMarker={
	IssueCall: "Agave.HostCall.IssueCall",
	ReceiveResponse: "Agave.HostCall.ReceiveResponse",
	RuntimeExceptionRaised: "Agave.HostCall.RuntimeExecptionRaised"
};
OSF.OfficeAppContext=function OSF_OfficeAppContext(id, appName, appVersion, appUILocale, dataLocale, docUrl, clientMode, settings, reason, osfControlType, eToken) {
	this._id=id;
	this._appName=appName;
	this._appVersion=appVersion;
	this._appUILocale=appUILocale;
	this._dataLocale=dataLocale;
	this._docUrl=docUrl;
	this._clientMode=clientMode;
	this._settings=settings;
	this._reason=reason;
	this._osfControlType=osfControlType;
	this._eToken=eToken;
	this.get_id=function get_id() { return this._id; };
	this.get_appName=function get_appName() { return this._appName; };
	this.get_appVersion=function get_appVersion() { return this._appVersion; };
	this.get_appUILocale=function get_appUILocale() { return this._appUILocale; };
	this.get_dataLocale=function get_dataLocale() { return this._dataLocale; };
	this.get_docUrl=function get_docUrl() { return this._docUrl; };
	this.get_clientMode=function get_clientMode() { return this._clientMode; };
	this.get_bindings=function get_bindings() { return this._bindings; };
	this.get_settings=function get_settings() { return this._settings; };
	this.get_reason=function get_reason() { return this._reason; };
	this.get_osfControlType=function get_osfControlType() { return this._osfControlType; };
	this.get_eToken=function get_eToken() { return this._eToken; };
};
OSF.AppName={
	Unsupported: 0,
	Excel: 1,
	Word: 2,
	PowerPoint: 4,
	Outlook: 8,
	ExcelWebApp: 16,
	WordWebApp: 32,
	OutlookWebApp: 64,
	Project: 128
};
OSF.OsfControlType={
	DocumentLevel: 0,
	ContainerLevel: 1
};
OSF.ClientMode={
	ReadOnly: 0,
	ReadWrite: 1
};
OSF.OUtil.setNamespace("Microsoft", window);
OSF.OUtil.setNamespace("Office", Microsoft);
OSF.OUtil.setNamespace("Client", Microsoft.Office);
OSF.OUtil.setNamespace("WebExtension", Microsoft.Office);
OSF.NamespaceManager=(function OSF_NamespaceManager() {
	var _userOffice;
	var _useShortcut=false;
	return {
		enableShortcut: function OSF_NamespaceManager$enableShortcut() {
			if (!_useShortcut) {
				if (window.Office) {
					_userOffice=window.Office;
				} else {
					OSF.OUtil.setNamespace("Office", window);
				}
				window.Office=Microsoft.Office.WebExtension;
				_useShortcut=true;
			}
		},
		disableShortcut: function OSF_NamespaceManager$disableShortcut() {
			if (_useShortcut) {
				if (_userOffice) {
					window.Office=_userOffice;
				} else {
					OSF.OUtil.unsetNamespace("Office", window);
				}
				_useShortcut=false;
			}
		}
	};
})();
OSF.NamespaceManager.enableShortcut();
Microsoft.Office.WebExtension.InitializationReason={
	Inserted: "inserted",
	DocumentOpened: "documentOpened"
};
Microsoft.Office.WebExtension.ApplicationMode={
	WebEditor: "webEditor",
	WebViewer: "webViewer",
	Client: "client"
};
Microsoft.Office.WebExtension.DocumentMode={
	ReadOnly: "readOnly",
	ReadWrite: "readWrite"
}
Microsoft.Office.WebExtension.CoercionType={
	Text: "text",
	Matrix: "matrix",
	Table: "table"
};
Microsoft.Office.WebExtension.ValueFormat={
	Unformatted: "unformatted",
	Formatted: "formatted"
};
Microsoft.Office.WebExtension.FilterType={
	All: "all",
	OnlyVisible: "onlyVisible"
};
Microsoft.Office.WebExtension.BindingType={
	Text: "text",
	Matrix: "matrix",
	Table: "table"
};
Microsoft.Office.WebExtension.EventType={
	DocumentSelectionChanged: "documentSelectionChanged",
	BindingSelectionChanged: "bindingSelectionChanged",
	BindingDataChanged: "bindingDataChanged",
	SettingsChanged: "settingsChanged",
	DataNodeDeleted: "nodeDeleted",
	DataNodeInserted: "nodeInserted",
	DataNodeReplaced: "nodeReplaced"
};
Microsoft.Office.WebExtension.AsyncResultStatus={
	Succeeded: "succeeded",
	Failed: "failed"
};
Microsoft.Office.WebExtension.Parameters={
	BindingType: "bindingType",
	CoercionType: "coercionType",
	ValueFormat: "valueFormat",
	FilterType: "filterType",
	Id: "id",
	PromptText: "promptText",
	ItemName: "itemName",
	FailOnCollision: "failOnCollision",
	StartRow: "startRow",
	StartColumn: "startColumn",
	RowCount: "rowCount",
	ColumnCount: "columnCount",
	Callback: "callback",
	AsyncContext: "asyncContext",
	Data: "data",
	Rows: "rows",
	OverwriteIfStale: "overwriteIfStale",
	EventType: "eventType",
	Handler: "handler",
	Xml: "xml",
	Namespace: "namespace",
	Prefix: "prefix",
	XPath: "xPath",
	TaskId: "taskId",
	FieldId: "fieldId",
	FieldValue: "fieldValue",
	Serverurl: "serverUrl",
	ListName: "listName",
	ResourceId: "resourceId",
	ViewType: "viewType",
	ViewName: "viewName",
	GetRawValue: "getRawValue"
};
Microsoft.Office.WebExtension.DefaultParameterValues={
}
OSF.OUtil.setNamespace("DDA", OSF);
OSF.DDA.DocumentMode={
	ReadOnly: 1,
	ReadWrite: 0
};
OSF.OUtil.setNamespace("DispIdHost", OSF.DDA);
OSF.DDA.DispIdHost.Methods={
	InvokeMethod: "invokeMethod",
	AddEventHandler: "addEventHandler",
	RemoveEventHandler: "removeEventHandler"
}
OSF.DDA.DispIdHost.Delegates={
	ExecuteAsync: "executeAsync",
	RegisterEventAsync: "registerEventAsync",
	UnregisterEventAsync: "unregisterEventAsync",
	ParameterMap: "parameterMap"
};
OSF.OUtil.setNamespace("AsyncResultEnum", OSF.DDA);
OSF.DDA.AsyncResultEnum.Properties={
	Context: "Context",
	Value: "Value",
	Status: "Status",
	Error: "Error"
};
OSF.DDA.AsyncResultEnum.ErrorProperties={
	Name: "Name",
	Message: "Message"
};
OSF.DDA.PropertyDescriptors={
	AsyncResultStatus: "AsyncResultStatus",
	Subset: "subset",
	BindingProperties: "BindingProperties",
	TableDataProperties: "TableDataProperties",
	DataPartProperties: "DataPartProperties",
	DataNodeProperties: "DataNodeProperties"
};
OSF.DDA.EventDescriptors={
	BindingSelectionChangedEvent: "BindingSelectionChangedEvent",
	DataNodeInsertedEvent: "DataNodeInsertedEvent",
	DataNodeReplacedEvent: "DataNodeReplacedEvent",
	DataNodeDeletedEvent: "DataNodeDeletedEvent"
};
OSF.DDA.ListDescriptors={
	BindingList: "BindingList",
	DataPartList: "DataPartList",
	DataNodeList: "DataNodeList"
};
OSF.DDA.BindingProperties={
	Id: "BindingId",
	Type: Microsoft.Office.WebExtension.Parameters.BindingType,
	RowCount: "BindingRowCount",
	ColumnCount: "BindingColumnCount",
	HasHeaders: "HasHeaders"
}
OSF.DDA.TableDataProperties={
	TableRows: "TableRows",
	TableHeaders: "TableHeaders"
};
OSF.DDA.DataPartProperties={
	Id: "DataPartId",
	BuiltIn: "DataPartBuiltIn"
};
OSF.DDA.DataNodeProperties={
	Handle: "DataNodeHandle",
	BaseName: "DataNodeBaseName",
	NamespaceUri: "DataNodeNamespaceUri",
	NodeType: "DataNodeType"
};
OSF.DDA.DataNodeEventProperties={
	OldNode: "OldNode",
	NewNode: "NewNode",
	NextSiblingNode: "NextSiblingNode",
	InUndoRedo: "InUndoRedo"
};
OSF.DDA.AsyncResultEnum.ErrorCode={
	Success: 0,
	Failed: 1
};
OSF.DDA.getXdmEventName=function OSF_DDA$GetXdmEventName(bindingId, eventType) {
	if (eventType==Microsoft.Office.WebExtension.EventType.BindingSelectionChanged || eventType==Microsoft.Office.WebExtension.EventType.BindingDataChanged) {
		return bindingId+"_"+eventType;
	} else {
		return eventType;
	}
};
OSF.DDA.ErrorCodeManager=(function () {
	var _errorMappings={};
	return {
		getErrorArgs: function OSF_DDA_ErrorCodeManager$getErrorArgs(errorCode) {
			return _errorMappings[errorCode] || _errorMappings[this.errorCodes.ooeInternalError];
		},
		initErrorMessages: function OSF_DDA_ErrorCodeManager$initErrorMessages(errorMappings) {
			if(errorMappings) {
				var nameMessage;
				for(var errorCode in errorMappings) {
					nameMessage=errorMappings[errorCode];
					_errorMappings[errorCode]={ name : nameMessage.name, message : nameMessage.message };
				}
			}
		},
		errorCodes : {
			ooeSuccess : 0,
			ooeCoercionTypeNotSupported : 1000,
			ooeGetSelectionNotMatchDataType : 1001,
			ooeCoercionTypeNotMatchBinding : 1002,
			ooeInvalidGetRowColumnCounts : 1003,
			ooeSelectionNotSupportCoercionType : 1004,
			ooeInvalidGetStartRowColumn : 1005,
			ooeUnsupportedDataObject : 2000,
			ooeCannotWriteToSelection : 2001,
			ooeDataNotMatchSelection : 2002,
			ooeOverwriteWorksheetData : 2003,
			ooeDataNotMatchBindingSize : 2004,
			ooeInvalidSetStartRowColumn : 2005,
			ooeInvalidDataFormat : 2006,
			ooeDataNotMatchCoercionType : 2007,
			ooeDataNotMatchBindingType : 2008,
			ooeSelectionCannotBound : 3000,
			ooeBindingNotExist : 3002,
			ooeBindingToMultipleSelection : 3003,
			ooeInvalidSelectionForBindingType : 3004,
			ooeUnknownBindingType : 3009,
			ooeSettingNameNotExist : 4000,
			ooeSettingsCannotSave : 4001,
			ooeSettingsAreStale : 4002,
			ooeOperationNotSupported : 5000,
			ooeInternalError : 5001,
			ooeDocumentReadOnly : 5002,
			ooeEventHandlerNotExist : 5003,
			ooeInvalidApiCallInContext : 5004,
			ooeCustomXmlError : 5100,
			ooeNoCapability : 6000
		}
	}
})();
var count=64;
OSF.DDA.MethodDispId={
	dispidMethodMin: count,
	dispidGetSelectedDataMethod: count++,
	dispidSetSelectedDataMethod: count++,
	dispidAddBindingFromSelectionMethod: count++,
	dispidAddBindingFromPromptMethod: count++,
	dispidGetBindingMethod: count++,
	dispidReleaseBindingMethod: count++,
	dispidGetBindingDataMethod: count++,
	dispidSetBindingDataMethod: count++,
	dispidAddRowsMethod: count++,
	dispidClearAllRowsMethod: count++,
	dispidGetAllBindingsMethod: count++,
	dispidLoadSettingsMethod: count++,
	dispidSaveSettingsMethod: count++,
	dispidGetWholeDocumentMethod: count++,
	dispidAddBindingFromNamedItemMethod: count++,
	dispidAddColumnsMethod: count++,
	dispidAddDataPartMethod: count=128,
	dispidGetDataPartByIdMethod:++count,
	dispidGetDataPartsByNamespaceMethod:++count,
	dispidGetDataPartXmlMethod:++count,
	dispidGetDataPartNodesMethod:++count,
	dispidDeleteDataPartMethod:++count,
	dispidGetDataNodeValueMethod:++count,
	dispidGetDataNodeXmlMethod:++count,
	dispidGetDataNodesMethod:++count,
	dispidSetDataNodeValueMethod:++count,
	dispidSetDataNodeXmlMethod:++count,
	dispidAddDataNamespaceMethod:++count,
	dispidGetDataUriByPrefixMethod:++count,
	dispidGetDataPrefixByUriMethod:++count,
	dispidMethodMax: count++,
	dispidGetSelectedTaskMethod: count=110,
	dispidGetSelectedResourceMethod:++count,
	dispidGetTaskMethod:++count,
	dispidGetResourceFieldMethod:++count,
	dispidGetWSSUrlMethod:++count,
	dispidGetTaskFieldMethod:++count,
	dispidGetProjectFieldMethod:++count,
	dispidGetSelectedViewMethod:++count
};
count=0;
OSF.DDA.EventDispId={
	dispidEventMin: count,
	dispidInitializeEvent: count++,
	dispidSettingsChangedEvent: count++,
	dispidDocumentSelectionChangedEvent: count++,
	dispidBindingSelectionChangedEvent: count++,
	dispidBindingDataChangedEvent: count++,
	dispidDocumentOpenEvent: count++,
	dispidDocumentCloseEvent: count++,
	dispidDataNodeAddedEvent: count=60,
	dispidDataNodeReplacedEvent:++count,
	dispidDataNodeDeletedEvent:++count,
	dispidEventMax:++count,
	dispidTaskSelectionChangedEvent: count=56,
	dispidResourceSelectionChangedEvent:++count,
	dispidViewSelectionChangedEvent:++count
};
	var initOSFModule=function OSF$initOSFModule() {
OSF.OUtil.setNamespace("Microsoft", window);
OSF.OUtil.setNamespace("Office", Microsoft);
OSF.OUtil.setNamespace("Common", Microsoft.Office);
Microsoft.Office.Common.InvokeType={ "async": 0,
									   "sync": 1,
									   "asyncRegisterEvent": 2,
									   "asyncUnregisterEvent": 3,
									   "syncRegisterEvent": 4,
									   "syncUnregisterEvent": 5
									   };
Microsoft.Office.Common.InvokeResultCode={
											 "noError": 0,
											 "errorInRequest": -1,
											 "errorHandlingRequest": -2,
											 "errorInResponse": -3,
											 "errorHandlingResponse": -4,
											 "errorHandlingRequestAccessDenied": -5,
											 "errorHandlingMethodCallTimedout": -6
											};
Microsoft.Office.Common.MessageType={ "request": 0,
										"response": 1
									  };
Microsoft.Office.Common.ActionType={ "invoke": 0,
									   "registerEvent": 1,
									   "unregisterEvent": 2 };
Microsoft.Office.Common.ResponseType={ "forCalling": 0,
										 "forEventing": 1
									  };
Microsoft.Office.Common.MethodObject=function Microsoft_Office_Common_MethodObject(method, invokeType, blockingOthers) {
	this._method=method;
	this._invokeType=invokeType;
	this._blockingOthers=blockingOthers;
};
Microsoft.Office.Common.MethodObject.prototype={
	getMethod: function Microsoft_Office_Common_MethodObject$getMethod() {
		return this._method;
	},
	getInvokeType: function Microsoft_Office_Common_MethodObject$getInvokeType() {
		return this._invokeType;
	},
	getBlockingFlag: function Microsoft_Office_Common_MethodObject$getBlockingFlag() {
		return this._blockingOthers;
	}
};
Microsoft.Office.Common.EventMethodObject=function Microsoft_Office_Common_EventMethodObject(registerMethodObject, unregisterMethodObject) {
	this._registerMethodObject=registerMethodObject;
	this._unregisterMethodObject=unregisterMethodObject;
};
Microsoft.Office.Common.EventMethodObject.prototype={
	getRegisterMethodObject: function Microsoft_Office_Common_EventMethodObject$getRegisterMethodObject() {
		return this._registerMethodObject;
	},
	getUnregisterMethodObject: function Microsoft_Office_Common_EventMethodObject$getUnregisterMethodObject() {
		return this._unregisterMethodObject;
	}
};
Microsoft.Office.Common.ServiceEndPoint=function Microsoft_Office_Common_ServiceEndPoint(serviceEndPointId) {
	var e=Function._validateParams(arguments, [
		  { name: "serviceEndPointId", type: String, mayBeNull: false }
	]);
	if (e) throw e;
	this._methodObjectList={};
	this._eventHandlerProxyList={};
	this._Id=serviceEndPointId;
	this._conversations={};
	this._policyManager=null;
};
Microsoft.Office.Common.ServiceEndPoint.prototype={
	registerMethod: function Microsoft_Office_Common_ServiceEndPoint$registerMethod(methodName, method, invokeType, blockingOthers) {
		var e=Function._validateParams(arguments, [
			{ name: "methodName", type: String, mayBeNull: false },
			{ name: "method", type: Function, mayBeNull: false },
			{ name: "invokeType", type: Number, mayBeNull: false },
			{ name: "blockingOthers", type: Boolean, mayBeNull: false }
		]);
		if (e) throw e;
		if (invokeType !==Microsoft.Office.Common.InvokeType.async
			&& invokeType !==Microsoft.Office.Common.InvokeType.sync){
			throw Error.argument("invokeType");
		}
		var methodObject=new Microsoft.Office.Common.MethodObject(method,
																	invokeType,
																	blockingOthers);
		this._methodObjectList[methodName]=methodObject;
	},
	unregisterMethod: function Microsoft_Office_Common_ServiceEndPoint$unregisterMethod(methodName) {
		var e=Function._validateParams(arguments, [
			{ name: "methodName", type: String, mayBeNull: false }
		]);
		if (e) throw e;
		delete this._methodObjectList[methodName];
	},
	registerEvent: function Microsoft_Office_Common_ServiceEndPoint$registerEvent(eventName, registerMethod, unregisterMethod) {
		var e=Function._validateParams(arguments, [
			{ name: "eventName", type: String, mayBeNull: false },
			{ name: "registerMethod", type: Function, mayBeNull: false },
			{ name: "unregisterMethod", type: Function, mayBeNull: false }
		]);
		if (e) throw e;
		var methodObject=new Microsoft.Office.Common.EventMethodObject (
																		  new Microsoft.Office.Common.MethodObject(registerMethod,
																												   Microsoft.Office.Common.InvokeType.syncRegisterEvent,
																												   false),
																		  new Microsoft.Office.Common.MethodObject(unregisterMethod,
																												   Microsoft.Office.Common.InvokeType.syncUnregisterEvent,
																												   false)
																												   );
		this._methodObjectList[eventName]=methodObject;
	},
	registerEventEx: function Microsoft_Office_Common_ServiceEndPoint$registerEventEx(eventName, registerMethod, registerMethodInvokeType, unregisterMethod, unregisterMethodInvokeType) {
		var e=Function._validateParams(arguments, [
			{ name: "eventName", type: String, mayBeNull: false },
			{ name: "registerMethod", type: Function, mayBeNull: false },
			{ name: "registerMethodInvokeType", type: Number, mayBeNull: false },
			{ name: "unregisterMethod", type: Function, mayBeNull: false },
			{ name: "unregisterMethodInvokeType", type: Number, mayBeNull: false }
		]);
		if (e) throw e;
		var methodObject=new Microsoft.Office.Common.EventMethodObject (
																		  new Microsoft.Office.Common.MethodObject(registerMethod,
																												   registerMethodInvokeType,
																												   false),
																		  new Microsoft.Office.Common.MethodObject(unregisterMethod,
																												   unregisterMethodInvokeType,
																												   false)
																												   );
		this._methodObjectList[eventName]=methodObject;
	},
	unregisterEvent: function (eventName) {
		var e=Function._validateParams(arguments, [
			{ name: "eventName", type: String, mayBeNull: false }
		]);
		if (e) throw e;
		this.unregisterMethod(eventName);
	},
	registerConversation: function Microsoft_Office_Common_ServiceEndPoint$registerConversation(conversationId) {
		var e=Function._validateParams(arguments, [
			{ name: "conversationId", type: String, mayBeNull: false }
			]);
		if (e) throw e;
		this._conversations[conversationId]=true;
	},
	unregisterConversation: function Microsoft_Office_Common_ServiceEndPoint$unregisterConversation(conversationId) {
		var e=Function._validateParams(arguments, [
			{ name: "conversationId", type: String, mayBeNull: false }
			]);
		if (e) throw e;
		delete this._conversations[conversationId];
	},
	setPolicyManager: function Microsoft_Office_Common_ServiceEndPoint$setPolicyManager(policyManager) {
		var e=Function._validateParams(arguments, [
			{ name: "policyManager", type: Object, mayBeNull: false }
			]);
		if (e) throw e;
		if (!policyManager.checkCapability) {
			throw Error.argument("policyManager");
		}
		this._policyManager=policyManager;
	},
	getPolicyManager: function Microsoft_Office_Common_ServiceEndPoint$getPolicyManager() {
		return this._policyManager;
	}
};
Microsoft.Office.Common.ClientEndPoint=function Microsoft_Office_Common_ClientEndPoint(conversationId, targetWindow, targetUrl) {
	var e=Function._validateParams(arguments, [
		  { name: "conversationId", type: String, mayBeNull: false },
		  { name: "targetWindow", mayBeNull: false },
		  { name: "targetUrl", type: String, mayBeNull: false }
	]);
	if (e) throw e;
	if (!targetWindow.postMessage) {
		throw Error.argument("targetWindow");
	}
	this._conversationId=conversationId;
	this._targetWindow=targetWindow;
	this._targetUrl=targetUrl;
	this._callingIndex=0;
	this._callbackList={};
	this._eventHandlerList={};
};
Microsoft.Office.Common.ClientEndPoint.prototype={
	invoke: function Microsoft_Office_Common_ClientEndPoint$invoke(targetMethodName, callback, param) {
		var e=Function._validateParams(arguments, [
			{ name: "targetMethodName", type: String, mayBeNull: false },
			{ name: "callback", type: Function, mayBeNull: true },
			{ name: "param", mayBeNull: true }
		]);
		if (e) throw e;
		var correlationId=this._callingIndex++;
		var now=new Date();
		var callbackEntry={"callback" : callback, "createdOn": now.getTime() };
		if(param && typeof param==="object" && typeof param.__timeout__==="number") {
			callbackEntry.timeout=param.__timeout__;
			delete param.__timeout__;
		}
		this._callbackList[correlationId]=callbackEntry;
		try {
			var callRequest=new Microsoft.Office.Common.Request(targetMethodName,
																  Microsoft.Office.Common.ActionType.invoke,
																  this._conversationId,
																  correlationId,
																  param);
			var msg=Microsoft.Office.Common.MessagePackager.envelope(callRequest);
			this._targetWindow.postMessage(msg, this._targetUrl);
			Microsoft.Office.Common.XdmCommunicationManager._startMethodTimeoutTimer();
		}
		catch (ex) {
			try {
				if (callback !==null)
					callback(Microsoft.Office.Common.InvokeResultCode.errorInRequest, ex);
			}
			finally {
				delete this._callbackList[correlationId];
			}
		}
	},
	registerForEvent: function Microsoft_Office_Common_ClientEndPoint$registerForEvent(targetEventName, eventHandler, callback, data) {
		var e=Function._validateParams(arguments, [
			{ name: "targetEventName", type: String, mayBeNull: false },
			{ name: "eventHandler", type: Function, mayBeNull: false },
			{ name: "callback", type: Function, mayBeNull: true },
			{ name: "data", mayBeNull: true, optional: true }
		]);
		if (e) throw e;
		var correlationId=this._callingIndex++;
		var now=new Date();
		this._callbackList[correlationId]={"callback" : callback, "createdOn": now.getTime() };
		try {
			var callRequest=new Microsoft.Office.Common.Request(targetEventName,
																  Microsoft.Office.Common.ActionType.registerEvent,
																  this._conversationId,
																  correlationId,
																  data);
			var msg=Microsoft.Office.Common.MessagePackager.envelope(callRequest);
			this._targetWindow.postMessage(msg, this._targetUrl);
			Microsoft.Office.Common.XdmCommunicationManager._startMethodTimeoutTimer();
			this._eventHandlerList[targetEventName]=eventHandler;
		}
		catch (ex) {
			try {
				if (callback !==null) {
					callback(Microsoft.Office.Common.InvokeResultCode.errorInRequest, ex);
				}
			}
			finally {
				delete this._callbackList[correlationId];
			}
		}
	},
	unregisterForEvent: function Microsoft_Office_Common_ClientEndPoint$unregisterForEvent(targetEventName, callback, data) {
		var e=Function._validateParams(arguments, [
			{ name: "targetEventName", type: String, mayBeNull: false },
			{ name: "callback", type: Function, mayBeNull: true },
			{ name: "data", mayBeNull: true, optional: true }
		]);
		if (e) throw e;
		var correlationId=this._callingIndex++;
		var now=new Date();
		this._callbackList[correlationId]={"callback" : callback, "createdOn": now.getTime() };
		try {
			var callRequest=new Microsoft.Office.Common.Request(targetEventName,
																  Microsoft.Office.Common.ActionType.unregisterEvent,
																  this._conversationId,
																  correlationId,
																  data);
			var msg=Microsoft.Office.Common.MessagePackager.envelope(callRequest);
			this._targetWindow.postMessage(msg, this._targetUrl);
			Microsoft.Office.Common.XdmCommunicationManager._startMethodTimeoutTimer();
		}
		catch (ex) {
			try {
				if (callback !==null) {
					callback(Microsoft.Office.Common.InvokeResultCode.errorInRequest, ex);
				}
			}
			finally {
				delete this._callbackList[correlationId];
			}
		}
		finally {
			delete this._eventHandlerList[targetEventName];
		}
	}
};
Microsoft.Office.Common.XdmCommunicationManager=(function () {
	var _invokerQueue=[];
	var _messageProcessingTimer=null;
	var _processInterval=10;
	var _blockingFlag=false;
	var _methodTimeoutTimer=null;
	var _methodTimeoutProcessInterval=2000;
	var _methodTimeout=60000;
	var _serviceEndPoints={};
	var _clientEndPoints={};
	var _initialized=false;
	function _lookupServiceEndPoint(conversationId) {
		for(var id in _serviceEndPoints) {
			 if(_serviceEndPoints[id]._conversations[conversationId]) {
				 return _serviceEndPoints[id];
			 }
		}
		Sys.Debug.trace("Unknown conversation Id.");
		throw Error.argument("conversationId");
	};
	function _lookupClientEndPoint(conversationId) {
		var clientEndPoint=_clientEndPoints[conversationId];
		if(!clientEndPoint) {
			Sys.Debug.trace("Unknown conversation Id.");
			throw Error.argument("conversationId");
		}
		return clientEndPoint;
	};
	function _lookupMethodObject(serviceEndPoint, messageObject) {
		var methodOrEventMethodObject=serviceEndPoint._methodObjectList[messageObject._actionName];
		if (!methodOrEventMethodObject) {
			Sys.Debug.trace("The specified method is not registered on service endpoint:"+messageObject._actionName);
			throw Error.argument("messageObject");
		}
		var methodObject=null;
		if (messageObject._actionType===Microsoft.Office.Common.ActionType.invoke) {
			methodObject=methodOrEventMethodObject;
		} else if (messageObject._actionType===Microsoft.Office.Common.ActionType.registerEvent) {
			methodObject=methodOrEventMethodObject.getRegisterMethodObject();
		} else {
			methodObject=methodOrEventMethodObject.getUnregisterMethodObject();
		}
		return methodObject;
	};
	function _enqueInvoker (invoker) {
		_invokerQueue.push(invoker);
	};
	function _dequeInvoker() {
		if (_messageProcessingTimer !==null) {
			if (!_blockingFlag) {
				if (_invokerQueue.length > 0) {
					var invoker=_invokerQueue.shift();
					_blockingFlag=invoker.getInvokeBlockingFlag();
					invoker.invoke();
				} else {
					clearInterval(_messageProcessingTimer);
					_messageProcessingTimer=null;
				}
			}
		} else {
			Sys.Debug.trace("channel is not ready.");
		}
	};
	function _checkMethodTimeout() {
		if (_methodTimeoutTimer) {
			var clientEndPoint;
			var methodCallsNotTimedout=0;
			var now=new Date();
			var timeoutValue;
			for(var conversationId in _clientEndPoints) {
				clientEndPoint=_clientEndPoints[conversationId];
				for(var correlationId in clientEndPoint._callbackList) {
					var callbackEntry=clientEndPoint._callbackList[correlationId];
					timeoutValue=callbackEntry.timeout ? callbackEntry.timeout : _methodTimeout;
					if(Math.abs(now.getTime() - callbackEntry.createdOn) >=timeoutValue) {
						try{
							if(callbackEntry.callback) {
								callbackEntry.callback(Microsoft.Office.Common.InvokeResultCode.errorHandlingMethodCallTimedout, null);
							}
						}
						finally {
							delete clientEndPoint._callbackList[correlationId];
						}
					} else {
						methodCallsNotTimedout++;
					};
				}
			}
			if (methodCallsNotTimedout===0) {
				clearInterval(_methodTimeoutTimer);
				_methodTimeoutTimer=null;
			}
		} else {
			Sys.Debug.trace("channel is not ready.");
		}
	};
	function _postCallbackHandler() {
		_blockingFlag=false;
	};
	function _registerListener(listener) {
		if ((Sys.Browser.agent===Sys.Browser.InternetExplorer) && window.attachEvent) {
			window.attachEvent("onmessage", listener);
		} else if (window.addEventListener) {
			window.addEventListener("message", listener, false);
		} else {
			Sys.Debug.trace("Browser doesn't support the required API.");
			throw Error.argument("Browser");
		}
	};
	function _receive(e) {
		if (e.data !='') {
			var messageObject;
			try {
				messageObject=Microsoft.Office.Common.MessagePackager.unenvelope(e.data);
			}catch(ex) {
				return;
			}
			if ( typeof (messageObject._messageType)=='undefined' ) {
				return;
			}
			if (messageObject._messageType===Microsoft.Office.Common.MessageType.request) {
				var requesterUrl=(e.origin==null || e.origin=="null") ? messageObject._origin : e.origin;
				try {
					var serviceEndPoint=_lookupServiceEndPoint(messageObject._conversationId);
					var policyManager=serviceEndPoint.getPolicyManager();
					if(policyManager && !policyManager.checkCapability(messageObject._conversationId, messageObject._actionName, messageObject._data)) {
						throw "Access Denied";
					}
					var methodObject=_lookupMethodObject(serviceEndPoint, messageObject);
					var invokeCompleteCallback=new Microsoft.Office.Common.InvokeCompleteCallback(e.source,
																										requesterUrl,
																										messageObject._actionName,
																										messageObject._conversationId,
																										messageObject._correlationId,
																										_postCallbackHandler);
					var invoker=new Microsoft.Office.Common.Invoker(methodObject,
																			messageObject._data,
																			invokeCompleteCallback,
																			serviceEndPoint._eventHandlerProxyList,
																			messageObject._conversationId,
																			messageObject._actionName);
					if (_messageProcessingTimer==null) {
						_messageProcessingTimer=setInterval(_dequeInvoker, _processInterval);
					}
					_enqueInvoker(invoker);
				}
				catch (ex) {
					var errorCode=Microsoft.Office.Common.InvokeResultCode.errorHandlingRequest;
					if (ex=="Access Denied") {
						errorCode=Microsoft.Office.Common.InvokeResultCode.errorHandlingRequestAccessDenied;
					}
					var callResponse=new Microsoft.Office.Common.Response(messageObject._actionName,
																				messageObject._conversationId,
																				messageObject._correlationId,
																				errorCode,
																				Microsoft.Office.Common.ResponseType.forCalling,
																				ex);
					var envelopedResult=Microsoft.Office.Common.MessagePackager.envelope(callResponse);
					e.source.postMessage(envelopedResult, requesterUrl);
				}
			} else if (messageObject._messageType===Microsoft.Office.Common.MessageType.response){
				var clientEndPoint=_lookupClientEndPoint(messageObject._conversationId);
				if (messageObject._responseType===Microsoft.Office.Common.ResponseType.forCalling) {
					var callbackEntry=clientEndPoint._callbackList[messageObject._correlationId];
					if (callbackEntry) {
						try {
							if (callbackEntry.callback)
								callbackEntry.callback(messageObject._errorCode, messageObject._data);
						}
						finally {
							delete clientEndPoint._callbackList[messageObject._correlationId];
						}
					}
				} else {
					var eventhandler=clientEndPoint._eventHandlerList[messageObject._actionName];
					if (eventhandler !==undefined && eventhandler !==null) {
						eventhandler(messageObject._data);
					}
				}
			} else {
				return;
			}
		}
	};
	function _initialize () {
		if(!_initialized) {
			_registerListener(_receive);
			_initialized=true;
		}
	};
	return {
		connect : function Microsoft_Office_Common_XdmCommunicationManager$connect(conversationId, targetWindow, targetUrl) {
			_initialize();
			var clientEndPoint=new Microsoft.Office.Common.ClientEndPoint(conversationId, targetWindow, targetUrl);
			_clientEndPoints[conversationId]=clientEndPoint;
			return clientEndPoint;
		},
		getClientEndPoint : function Microsoft_Office_Common_XdmCommunicationManager$getClientEndPoint(conversationId) {
			var e=Function._validateParams(arguments, [
				{name: "conversationId", type: String, mayBeNull: false}
			]);
			if (e) throw e;
			return _clientEndPoints[conversationId];
		},
		createServiceEndPoint : function Microsoft_Office_Common_XdmCommunicationManager$createServiceEndPoint(serviceEndPointId) {
			_initialize();
			var serviceEndPoint=new Microsoft.Office.Common.ServiceEndPoint(serviceEndPointId);
			_serviceEndPoints[serviceEndPointId]=serviceEndPoint;
			return serviceEndPoint;
		},
		getServiceEndPoint : function Microsoft_Office_Common_XdmCommunicationManager$getServiceEndPoint(serviceEndPointId) {
			var e=Function._validateParams(arguments, [
				 {name: "serviceEndPointId", type: String, mayBeNull: false}
			]);
			if (e) throw e;
			return _serviceEndPoints[serviceEndPointId];
		},
		deleteClientEndPoint : function Microsoft_Office_Common_XdmCommunicationManager$deleteClientEndPoint(conversationId) {
			var e=Function._validateParams(arguments, [
				{name: "conversationId", type: String, mayBeNull: false}
			]);
			if (e) throw e;
			delete _clientEndPoints[conversationId];
		},
		_setMethodTimeout : function Microsoft_Office_Common_XdmCommunicationManager$_setMethodTimeout(methodTimeout) {
			var e=Function._validateParams(arguments, [
				{name: "methodTimeout", type: Number, mayBeNull: false}
			]);
			if (e) throw e;
			_methodTimeout=(methodTimeout <=0) ?  60000 : methodTimeout;
		},
		_startMethodTimeoutTimer : function Microsoft_Office_Common_XdmCommunicationManager$_startMethodTimeoutTimer() {
			if (!_methodTimeoutTimer) {
				_methodTimeoutTimer=setInterval(_checkMethodTimeout, _methodTimeoutProcessInterval);
			}
		}
	};
})();
Microsoft.Office.Common.Message=function Microsoft_Office_Common_Message(messageType, actionName, conversationId, correlationId, data) {
	var e=Function._validateParams(arguments, [
		{name: "messageType", type: Number, mayBeNull: false},
		{name: "actionName", type: String, mayBeNull: false},
		{name: "conversationId", type: String, mayBeNull: false},
		{name: "correlationId", mayBeNull: false},
		{name: "data", mayBeNull: true, optional: true }
	]);
	if (e) throw e;
	this._messageType=messageType;
	this._actionName=actionName;
	this._conversationId=conversationId;
	this._correlationId=correlationId;
	this._origin=window.location.href;
	if (typeof data=="undefined") {
		this._data=null;
	} else {
		this._data=data;
	}
};
Microsoft.Office.Common.Message.prototype={
	getActionName: function Microsoft_Office_Common_Message$getActionName() {
		return this._actionName;
	},
	getConversationId: function Microsoft_Office_Common_Message$getConversationId() {
		return this._conversationId;
	},
	getCorrelationId: function Microsoft_Office_Common_Message$getCorrelationId() {
		return this._correlationId;
	},
	getOrigin: function Microsoft_Office_Common_Message$getOrigin() {
		return this._origin;
	},
	getData: function Microsoft_Office_Common_Message$getData() {
		return this._data;
	},
	getMessageType: function Microsoft_Office_Common_Message$getMessageType() {
		return this._messageType;
	}
};
Microsoft.Office.Common.Request=function Microsoft_Office_Common_Request(actionName, actionType, conversationId, correlationId, data) {
	Microsoft.Office.Common.Request.uber.constructor.call(this,
														  Microsoft.Office.Common.MessageType.request,
														  actionName,
														  conversationId,
														  correlationId,
														  data);
	this._actionType=actionType;
};
OSF.OUtil.extend(Microsoft.Office.Common.Request, Microsoft.Office.Common.Message);
Microsoft.Office.Common.Request.prototype.getActionType=function Microsoft_Office_Common_Request$getActionType() {
	return this._actionType;
};
Microsoft.Office.Common.Response=function Microsoft_Office_Common_Response(actionName, conversationId, correlationId, errorCode, responseType, data) {
	Microsoft.Office.Common.Response.uber.constructor.call(this,
														   Microsoft.Office.Common.MessageType.response,
														   actionName,
														   conversationId,
														   correlationId,
														   data);
	this._errorCode=errorCode;
	this._responseType=responseType;
};
OSF.OUtil.extend(Microsoft.Office.Common.Response, Microsoft.Office.Common.Message);
Microsoft.Office.Common.Response.prototype.getErrorCode=function Microsoft_Office_Common_Response$getErrorCode() {
	return this._errorCode;
};
Microsoft.Office.Common.Response.prototype.getResponseType=function Microsoft_Office_Common_Response$getResponseType() {
	return this._responseType;
};
Microsoft.Office.Common.MessagePackager={
	envelope: function Microsoft_Office_Common_MessagePackager$envelope(messageObject) {
		return Sys.Serialization.JavaScriptSerializer.serialize(messageObject);
	},
	unenvelope: function Microsoft_Office_Common_MessagePackager$unenvelope(messageObject) {
		return Sys.Serialization.JavaScriptSerializer.deserialize(messageObject);
	}
};
Microsoft.Office.Common.ResponseSender=function Microsoft_Office_Common_ResponseSender(requesterWindow, requesterUrl, actionName, conversationId, correlationId, responseType) {
	var e=Function._validateParams(arguments, [
		{name: "requesterWindow", mayBeNull: false},
		{name: "requesterUrl", type: String, mayBeNull: false},
		{name: "actionName", type: String, mayBeNull: false},
		{name: "conversationId", type: String, mayBeNull: false},
		{name: "correlationId", mayBeNull: false},
		{name: "responsetype", type: Number, maybeNull: false }
		]);
	if (e) throw e;
	this._requesterWindow=requesterWindow;
	this._requesterUrl=requesterUrl;
	this._actionName=actionName;
	this._conversationId=conversationId;
	this._correlationId=correlationId;
	this._invokeResultCode=Microsoft.Office.Common.InvokeResultCode.noError;
	this._responseType=responseType;
	var me=this;
	this._send=function (result) {
		 var response=new Microsoft.Office.Common.Response( me._actionName,
															  me._conversationId,
															  me._correlationId,
															  me._invokeResultCode,
															  me._responseType,
															  result);
		var envelopedResult=Microsoft.Office.Common.MessagePackager.envelope(response);
		me._requesterWindow.postMessage(envelopedResult, me._requesterUrl);
	};
};
Microsoft.Office.Common.ResponseSender.prototype={
	getRequesterWindow: function Microsoft_Office_Common_ResponseSender$getRequesterWindow() {
		return this._requesterWindow;
	},
	getRequesterUrl: function Microsoft_Office_Common_ResponseSender$getRequesterUrl() {
		return this._requesterUrl;
	},
	getActionName: function Microsoft_Office_Common_ResponseSender$getActionName() {
		return this._actionName;
	},
	getConversationId: function Microsoft_Office_Common_ResponseSender$getConversationId() {
		return this._conversationId;
	},
	getCorrelationId: function Microsoft_Office_Common_ResponseSender$getCorrelationId() {
		return this._correlationId;
	},
	getSend: function Microsoft_Office_Common_ResponseSender$getSend() {
		return this._send;
	},
	setResultCode: function Microsoft_Office_Common_ResponseSender$setResultCode(resultCode) {
		this._invokeResultCode=resultCode;
	}
};
Microsoft.Office.Common.InvokeCompleteCallback=function Microsoft_Office_Common_InvokeCompleteCallback(requesterWindow, requesterUrl, actionName, conversationId, correlationId, postCallbackHandler) {
	Microsoft.Office.Common.InvokeCompleteCallback.uber.constructor.call(this,
																 requesterWindow,
																 requesterUrl,
																 actionName,
																 conversationId,
																 correlationId,
																 Microsoft.Office.Common.ResponseType.forCalling);
	this._postCallbackHandler=postCallbackHandler;
	var me=this;
	this._send=function (result) {
		var response=new Microsoft.Office.Common.Response(me._actionName,
															  me._conversationId,
															  me._correlationId,
															  me._invokeResultCode,
															  me._responseType,
															  result);
		var envelopedResult=Microsoft.Office.Common.MessagePackager.envelope(response);
		me._requesterWindow.postMessage(envelopedResult, me._requesterUrl);
		 me._postCallbackHandler();
	};
};
OSF.OUtil.extend(Microsoft.Office.Common.InvokeCompleteCallback, Microsoft.Office.Common.ResponseSender);
Microsoft.Office.Common.Invoker=function Microsoft_Office_Common_Invoker(methodObject, paramValue, invokeCompleteCallback, eventHandlerProxyList, conversationId, eventName) {
	var e=Function._validateParams(arguments, [
		{name: "methodObject", mayBeNull: false},
		{name: "paramValue", mayBeNull: true},
		{name: "invokeCompleteCallback", mayBeNull: false},
		{name: "eventHandlerProxyList", mayBeNull: true},
		{name: "conversationId", type: String, mayBeNull: false},
		{name: "eventName", type: String, mayBeNull: false}
	]);
	if (e) throw e;
	this._methodObject=methodObject;
	this._param=paramValue;
	this._invokeCompleteCallback=invokeCompleteCallback;
	this._eventHandlerProxyList=eventHandlerProxyList;
	this._conversationId=conversationId;
	this._eventName=eventName;
};
Microsoft.Office.Common.Invoker.prototype={
	invoke: function Microsoft_Office_Common_Invoker$invoke() {
		try {
			var result;
			switch (this._methodObject.getInvokeType()) {
				case Microsoft.Office.Common.InvokeType.async:
					this._methodObject.getMethod()(this._param, this._invokeCompleteCallback.getSend());
					break;
				case Microsoft.Office.Common.InvokeType.sync:
					result=this._methodObject.getMethod()(this._param);
					this._invokeCompleteCallback.getSend()(result);
					break;
				case Microsoft.Office.Common.InvokeType.syncRegisterEvent:
					var eventHandlerProxy=this._createEventHandlerProxyObject(this._invokeCompleteCallback);
					result=this._methodObject.getMethod()(eventHandlerProxy.getSend(), this._param);
					this._eventHandlerProxyList[this._conversationId+this._eventName]=eventHandlerProxy.getSend();
					this._invokeCompleteCallback.getSend()(result);
					break;
				case Microsoft.Office.Common.InvokeType.syncUnregisterEvent:
					var eventHandler=this._eventHandlerProxyList[this._conversationId+this._eventName];
					result=this._methodObject.getMethod()(eventHandler, this._param);
					delete this._eventHandlerProxyList[this._conversationId+this._eventName];
					this._invokeCompleteCallback.getSend()(result);
					break;
				case Microsoft.Office.Common.InvokeType.asyncRegisterEvent:
					var eventHandlerProxyAsync=this._createEventHandlerProxyObject(this._invokeCompleteCallback);
					this._methodObject.getMethod()(eventHandlerProxyAsync.getSend(),
												   this._invokeCompleteCallback.getSend(),
												   this._param
												   );
					this._eventHandlerProxyList[this._callerId+this._eventName]=eventHandlerProxyAsync.getSend();
					break;
				case Microsoft.Office.Common.InvokeType.asyncUnregisterEvent:
					var eventHandlerAsync=this._eventHandlerProxyList[this._callerId+this._eventName];
					this._methodObject.getMethod()(eventHandlerAsync,
												   this._invokeCompleteCallback.getSend(),
												   this._param
												   );
					delete this._eventHandlerProxyList[this._callerId+this._eventName];
					break;
				default:
					break;
			}
		}
		catch (ex) {
			this._invokeCompleteCallback.setResultCode(Microsoft.Office.Common.InvokeResultCode.errorInResponse);
			this._invokeCompleteCallback.getSend()(ex);
		}
	},
	getInvokeBlockingFlag: function Microsoft_Office_Common_Invoker$getInvokeBlockingFlag() {
		return this._methodObject.getBlockingFlag();
	},
	_createEventHandlerProxyObject: function Microsoft_Office_Common_Invoker$_createEventHandlerProxyObject(invokeCompleteObject) {
		return new Microsoft.Office.Common.ResponseSender(invokeCompleteObject.getRequesterWindow(),
														  invokeCompleteObject.getRequesterUrl(),
														  invokeCompleteObject.getActionName(),
														  invokeCompleteObject.getConversationId(),
														  invokeCompleteObject.getCorrelationId(),
														  Microsoft.Office.Common.ResponseType.forEventing
														  );
	}
};
		OSF.EventDispatch=function OSF_EventDispatch(eventTypes) {
			this._eventHandlers={};
			for(var entry in eventTypes) {
				var eventType=eventTypes[entry];
				this._eventHandlers[eventType]=[];
			}
		};
		OSF.EventDispatch.prototype={
			getSupportedEvents: function OSF_EventDispatch$getSupportedEvents() {
				var events=[];
				for(var eventName in this._eventHandlers)
					events.push(eventName);
				return events;
			},
			supportsEvent: function OSF_EventDispatch$supportsEvent(event) {
				var isSupported=false;
				for(var eventName in this._eventHandlers) {
					if(event==eventName) {
						isSupported=true;
						break;
					}
				}
				return isSupported;
			},
			hasEventHandler: function OSF_EventDispatch$hasEventHandler(eventType, handler) {
				var handlers=this._eventHandlers[eventType];
				if(handlers && handlers.length > 0) {
					for(var h in handlers) {
						if(handlers[h]===handler)
							return true;
					}
				}
				return false;
			},
			addEventHandler: function OSF_EventDispatch$addEventHandler(eventType, handler) {
				var handlers=this._eventHandlers[eventType];
				if( handlers && !this.hasEventHandler(eventType, handler) ) {
					handlers.push(handler);
					return true;
				} else {
					return false;
				}
			},
			removeEventHandler: function OSF_EventDispatch$removeEventHandler(eventType, handler) {
				var handlers=this._eventHandlers[eventType];
				if(handlers && handlers.length > 0) {
					for(var index=0; index < handlers.length; index++) {
						if(handlers[index]===handler) {
							handlers.splice(index, 1);
							return true;
						}
					}
				}
				return false;
			},
			clearEventHandlers: function OSF_EventDispatch$clearEventHandlers(eventType) {
				this._eventHandlers[eventType]=[];
			},
			getEventHandlerCount: function OSF_EventDispatch$getEventHandlerCount(eventType) {
				return this._eventHandlers[eventType] !=undefined ? this._eventHandlers[eventType].length : -1;
			},
			fireEvent: function OSF_EventDispatch$fireEvent(eventArgs) {
				if( eventArgs.type==undefined )
					return false;
				var eventType=eventArgs.type;
				if( eventType && this._eventHandlers[eventType] ) {
					var eventHandlers=this._eventHandlers[eventType];
					for(var handler in eventHandlers)
						eventHandlers[handler](eventArgs);
					return true;
				} else {
					return false;
				}
			}
		};
		OSF.DDA.DataCoercion=(function OSF_DDA_DataCoercion() {
			return {
				findArrayDimensionality: function OSF_DDA_DataCoercion$findArrayDimensionality(obj) {
					if(OSF.OUtil.isArray(obj)) {
						var dim=0;
						for(var index=0; index < obj.length; index++) {
							dim=Math.max(dim, OSF.DDA.DataCoercion.findArrayDimensionality(obj[index]));
						}
						return dim+1;
					}
					else {
						return 0;
					}
				},
				getCoercionDefaultForBinding: function OSF_DDA_DataCoercion$getCoercionDefaultForBinding(bindingType) {
					switch(bindingType) {
						case Microsoft.Office.WebExtension.BindingType.Matrix: return Microsoft.Office.WebExtension.CoercionType.Matrix;
						case Microsoft.Office.WebExtension.BindingType.Table: return Microsoft.Office.WebExtension.CoercionType.Table;
						case Microsoft.Office.WebExtension.BindingType.Text:
						default:
							return Microsoft.Office.WebExtension.CoercionType.Text;
					}
				},
				getBindingDefaultForCoercion: function OSF_DDA_DataCoercion$getBindingDefaultForCoercion(coercionType) {
					switch(coercionType) {
						case Microsoft.Office.WebExtension.CoercionType.Matrix: return Microsoft.Office.WebExtension.BindingType.Matrix;
						case Microsoft.Office.WebExtension.CoercionType.Table: return Microsoft.Office.WebExtension.BindingType.Table;
						case Microsoft.Office.WebExtension.CoercionType.Text:
						case Microsoft.Office.WebExtension.CoercionType.Html:
						case Microsoft.Office.WebExtension.CoercionType.Ooxml:
						default:
							return Microsoft.Office.WebExtension.BindingType.Text;
					}
				},
				determineCoercionType: function OSF_DDA_DataCoercion$determineCoercionType(data) {
					if(data==null || data==undefined)
						return null;
					var sourceType=null;
					if(data.rows) {
						sourceType=Microsoft.Office.WebExtension.CoercionType.Table;
					}
					else {
						var dim=OSF.DDA.DataCoercion.findArrayDimensionality(data);
						if(dim==0) {
							sourceType=Microsoft.Office.WebExtension.CoercionType.Text;
						}
						else if(dim==2) {
							sourceType=Microsoft.Office.WebExtension.CoercionType.Matrix;
						}
					}
					return sourceType;
				},
				coerceData: function OSF_DDA_DataCoercion$coerceData(data, destinationType, sourceType) {
					sourceType=sourceType || OSF.DDA.DataCoercion.determineCoercionType(data);
					if( sourceType==destinationType ) {
						return data;
					} else {
						return OSF.DDA.DataCoercion._coerceDataFromTable(
							destinationType,
							OSF.DDA.DataCoercion._coerceDataToTable(data, sourceType)
						);
					}
				},
				_matrixToText: function OSF_DDA_DataCoercion$_matrixToText(matrix) {
					if (matrix.length==1 && matrix[0].length==1)
						return ""+matrix[0][0];
					var val="";
					for (var i=0; i < matrix.length; i++) {
						val+=matrix[i].join("\t")+"\n";
					}
					return val.substring(0, val.length - 1);
				},
				_textToMatrix: function OSF_DDA_DataCoercion$_textToMatrix(text) {
					var ret=text.split("\n");
					for (var i=0; i < ret.length; i++)
						ret[i]=ret[i].split("\t");
					return ret;
				},
				_tableToText: function OSF_DDA_DataCoercion$_tableToText(table) {
					var headers="";
					if(table.headers !=null) {
						headers=OSF.DDA.DataCoercion._matrixToText([table.headers])+"\n";
					}
					var rows=OSF.DDA.DataCoercion._matrixToText(table.rows);
					if(rows=="") {
						headers=headers.substring(0, headers.length - 1);
					}
					return headers+rows;
				},
				_tableToMatrix: function OSF_DDA_DataCoercion$_tableToMatrix(table) {
					var matrix=table.rows;
					if(table.headers !=null) {
						matrix.unshift(table.headers);
					}
					return matrix;
				},
				_coerceDataFromTable: function OSF_DDA_DataCoercion$_coerceDataFromTable(coercionType, table) {
					var value;
					switch(coercionType) {
						case Microsoft.Office.WebExtension.CoercionType.Table:
							value=table;
							break;
						case Microsoft.Office.WebExtension.CoercionType.Matrix:
							value=OSF.DDA.DataCoercion._tableToMatrix(table);
							break;
						case Microsoft.Office.WebExtension.CoercionType.Text:
						case Microsoft.Office.WebExtension.CoercionType.Html:
						case Microsoft.Office.WebExtension.CoercionType.Ooxml:
						default:
							value=OSF.DDA.DataCoercion._tableToText(table);
							break;
					}
					return value;
				},
				_coerceDataToTable: function OSF_DDA_DataCoercion$_coerceDataToTable(data, sourceType) {
					if( sourceType==undefined ) {
						sourceType=OSF.DDA.DataCoercion.determineCoercionType(data);
					}
					var value;
					switch(sourceType) {
						case Microsoft.Office.WebExtension.CoercionType.Table:
							value=data;
							break;
						case Microsoft.Office.WebExtension.CoercionType.Matrix:
							value=new Microsoft.Office.WebExtension.TableData(data);
							break;
						case Microsoft.Office.WebExtension.CoercionType.Text:
						case Microsoft.Office.WebExtension.CoercionType.Html:
						case Microsoft.Office.WebExtension.CoercionType.Ooxml:
						default:
							value=new Microsoft.Office.WebExtension.TableData(OSF.DDA.DataCoercion._textToMatrix(data));
							break;
					}
					return value;
				}
			};
		})();
		OSF.DDA.issueAsyncResult=function OSF_DDA$IssueAsyncResult(callArgs, status, payload) {
			var callback=callArgs[Microsoft.Office.WebExtension.Parameters.Callback];
			if(callback) {
				var asyncInitArgs={};
				asyncInitArgs[OSF.DDA.AsyncResultEnum.Properties.Context]=callArgs[Microsoft.Office.WebExtension.Parameters.AsyncContext];
				var errorArgs;
				if(status==OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
					asyncInitArgs[OSF.DDA.AsyncResultEnum.Properties.Value]=payload;
				}
				else {
					errorArgs={};
					payload=payload || OSF.DDA.ErrorCodeManager.getErrorArgs(OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError);
					errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name]=payload.name||payload;
					errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message]=payload.message||payload;
				}
				callback(new OSF.DDA.AsyncResult(asyncInitArgs, errorArgs));
			}
		};
		OSF.DDA.generateBindingId=function OSF_DDA$GenerateBindingId() {
			return "UnnamedBinding_"+OSF.OUtil.getUniqueId()+"_"+new Date().getTime();
		}
		OSF.DDA.SettingsManager={
			SerializedSettings: "serializedSettings",
			serializeSettings: function OSF_DDA_SettingsManager$serializeSettings(settingsCollection) {
				var ret={};
				for(var key in settingsCollection) {
					var value=settingsCollection[key];
					try {
						if(JSON) {
							value=JSON.stringify(value);
						}
						else {
							value=Sys.Serialization.JavaScriptSerializer.serialize(value);
						}
						ret[key]=value;
					}
					catch(ex) {
					}
				}
				return ret;
			},
			deserializeSettings: function OSF_DDA_SettingsManager$deserializeSettings(serializedSettings) {
				var ret={};
				serializedSettings=serializedSettings || {};
				for(var key in serializedSettings) {
					var value=serializedSettings[key];
					try {
						if(JSON) {
							value=JSON.parse(value);
						}
						else {
							value=Sys.Serialization.JavaScriptSerializer.deserialize(value);
						}
						ret[key]=value;
					}
					catch(ex) {
					}
				}
				return ret;
			}
		}
		OSF.DDA.OMFactory={
			manufactureBinding: function OSF_DDA_OMFactory$manufactureBinding(bindingProperties, containingDocument) {
				var id=bindingProperties[OSF.DDA.BindingProperties.Id];
				var rows=bindingProperties[OSF.DDA.BindingProperties.RowCount];
				var cols=bindingProperties[OSF.DDA.BindingProperties.ColumnCount];
				var hasHeaders=bindingProperties[OSF.DDA.BindingProperties.HasHeaders];
				var binding;
				switch(bindingProperties[OSF.DDA.BindingProperties.Type]) {
					case Microsoft.Office.WebExtension.BindingType.Text:
						binding=new OSF.DDA.TextBinding(
							id,
							containingDocument
						);
						break;
					case Microsoft.Office.WebExtension.BindingType.Matrix:
						binding=new OSF.DDA.MatrixBinding(
							id,
							containingDocument,
							rows,
							cols
						);
						break;
					case Microsoft.Office.WebExtension.BindingType.Table:
						binding=new OSF.DDA.TableBinding(
							id,
							containingDocument,
							rows,
							cols,
							hasHeaders
						);
						break;
					default:
						throw Error.argument(Microsoft.Office.WebExtension.Parameters.BindingType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedBindingType, bindingProperties[OSF.DDA.BindingProperties.Type]));
				}
				return binding;
			},
			manufactureTableData: function OSF_DDA_OMFactory$manufactureTableData(tableDataProperties) {
				return new Microsoft.Office.WebExtension.TableData(
					tableDataProperties[OSF.DDA.TableDataProperties.TableRows],
					tableDataProperties[OSF.DDA.TableDataProperties.TableHeaders]
				);
			},
			manufactureDataNode: function OSF_DDA_OMFactory$manufactureDataNode(nodeProperties) {
				if(nodeProperties) {
					return new OSF.DDA.CustomXmlNode(
						nodeProperties[OSF.DDA.DataNodeProperties.Handle],
						nodeProperties[OSF.DDA.DataNodeProperties.NodeType],
						nodeProperties[OSF.DDA.DataNodeProperties.NamespaceUri],
						nodeProperties[OSF.DDA.DataNodeProperties.BaseName]
					);
				}
			},
			manufactureDataPart: function OSF_DDA_OMFactory$manufactureDataPart(partProperties, containingCustomXmlParts) {
				return new OSF.DDA.CustomXmlPart(
					containingCustomXmlParts,
					partProperties[OSF.DDA.DataPartProperties.Id],
					partProperties[OSF.DDA.DataPartProperties.BuiltIn]
				);
			},
			manufactureEventArgs: function OSF_DDA_OMFactory$manufactureEventArgs(eventType, target, eventProperties) {
				var args;
				switch (eventType) {
					case Microsoft.Office.WebExtension.EventType.DocumentSelectionChanged:
						args=new OSF.DDA.DocumentSelectionChangedEventArgs(target);
						break;
					case Microsoft.Office.WebExtension.EventType.BindingSelectionChanged:
						args=new OSF.DDA.BindingSelectionChangedEventArgs(
							this.manufactureBinding(eventProperties, target.document),
							eventProperties[OSF.DDA.PropertyDescriptors.Subset]
						);
						break;
					case Microsoft.Office.WebExtension.EventType.BindingDataChanged:
						args=new OSF.DDA.BindingDataChangedEventArgs(this.manufactureBinding(eventProperties, target.document));
						break;
					case Microsoft.Office.WebExtension.EventType.SettingsChanged:
						args=new OSF.DDA.SettingsChangedEventArgs(target);
						break;
					case Microsoft.Office.WebExtension.EventType.DataNodeInserted:
						args=new OSF.DDA.NodeInsertedEventArgs(
							this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.NewNode]),
							eventProperties[OSF.DDA.DataNodeEventProperties.InUndoRedo]
						);
						break;
					case Microsoft.Office.WebExtension.EventType.DataNodeReplaced:
						args=new OSF.DDA.NodeReplacedEventArgs(
							this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.OldNode]),
							this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.NewNode]),
							eventProperties[OSF.DDA.DataNodeEventProperties.InUndoRedo]
						);
						break;
					case Microsoft.Office.WebExtension.EventType.DataNodeDeleted:
						args=new OSF.DDA.NodeDeletedEventArgs(
							this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.OldNode]),
							this.manufactureDataNode(eventProperties[OSF.DDA.DataNodeEventProperties.NextSiblingNode]),
							eventProperties[OSF.DDA.DataNodeEventProperties.InUndoRedo]
						);
						break;
					case Microsoft.Office.WebExtension.EventType.TaskSelectionChanged:
						args=new OSF.DDA.TaskSelectionChangedEventArgs(target);
						break;
					case Microsoft.Office.WebExtension.EventType.ResourceSelectionChanged:
						args=new OSF.DDA.ResourceSelectionChangedEventArgs(target);
						break;
					case Microsoft.Office.WebExtension.EventType.ViewSelectionChanged:
						args=new OSF.DDA.ViewSelectionChangedEventArgs(target);
						break;
					default:
						throw Error.argument(Microsoft.Office.WebExtension.Parameters.EventType, OSF.OUtil.formatString(Strings.OfficeOM.L_NotSupportedEventType, eventType));
				}
				return args;
			}
		};
		OSF.DDA.ListType=(function () {
			var listTypes={};
			listTypes[OSF.DDA.ListDescriptors.BindingList]=OSF.DDA.PropertyDescriptors.BindingProperties;
			listTypes[OSF.DDA.ListDescriptors.DataPartList]=OSF.DDA.PropertyDescriptors.DataPartProperties;
			listTypes[OSF.DDA.ListDescriptors.DataNodeList]=OSF.DDA.PropertyDescriptors.DataNodeProperties;
			return {
				isListType: function OSF_DDA_ListType$IsListType(t) { return OSF.OUtil.listContainsKey(listTypes, t); },
				getDescriptor: function OSF_DDA_ListType$getDescriptor(t) { return listTypes[t]; }
			}
		})();
		OSF.DDA.AsyncMethodCall=function OSF_DDA_AsyncMethodCall(requiredParameters, supportedOptions, privateStateCallbacks, onSucceeded, onFailed, fixOptions) {
			var requiredCount=requiredParameters.length;
			function OSF_DAA_AsyncMethodCall$VerifyArguments(params, args) {
				for(var name in params) {
					var param=params[name];
					var arg=args[name];
					if(arg !=undefined) {
						try {
							if(param["enum"]) {
								if(!OSF.OUtil.listContainsValue(param["enum"], arg)) {
									throw Error.argument(name);
								}
							}
							if(param["types"]) {
								if(!OSF.OUtil.listContainsValue(param["types"], typeof arg)) {
									throw Error.argumentType(name);
								}
							}
						}
						catch(ex) {
							throw ex;
						}
					}
				}
			}
			function OSF_DAA_AsyncMethodCall$ExtractRequiredArguments(userArgs, caller, stateInfo) {
				if(userArgs.length < requiredCount) {
					throw Error.parameterCount(Strings.OfficeOM.L_MissingRequiredArguments);
				}
				var requiredArgs=[];
				var index;
				for(index=0; index < requiredCount; index++) {
					requiredArgs.push(userArgs[index]);
				}
				try {
				}
				catch(ex) {
					throw ex;
				}
				var ret={}
				for(index=0; index < requiredCount; index++) {
					var param=requiredParameters[index];
					var arg=requiredArgs[index];
					if(param.verify) {
						var isValid=param.verify(arg, caller, stateInfo);
						if(!isValid) {
							throw Error.argument(param.name);
						}
					}
					ret[param.name]=arg;
				}
				return ret;
			}
			function OSF_DAA_AsyncMethodCall$ExtractOptions(userArgs, requiredArgs, caller, stateInfo) {
				if(userArgs.length > requiredCount+2) {
					throw Error.parameterCount(Strings.OfficeOM.L_TooManyArguments);
				}
				var options, parameterCallback;
				for(var i=userArgs.length - 1; i >=requiredParameters.length; i--) {
					var argument=userArgs[i];
					switch(typeof argument) {
						case "object":
							if(options) {
								throw Error.parameterCount(Strings.OfficeOM.L_TooManyOptionalObjects);
							}
							else {
								options=argument;
							}
							break;
						case "function":
							if(parameterCallback) {
								throw Error.parameterCount(Strings.OfficeOM.L_TooManyOptionalFunction);
							}
							else {
								parameterCallback=argument;
							}
							break;
						default:
							throw Error.argument(Strings.OfficeOM.L_InValidOptionalArgument);
							break;
					}
				}
				if(options) {
					try {
					}
					catch(ex) {
						throw ex;
					}
				}
				else {
					options={}
				}
				for(var optionName in supportedOptions) {
					var value=options[optionName];
					if(!value) {
						var option=supportedOptions[optionName];
						if(option.calculate) {
							value=option.calculate(requiredArgs, caller, stateInfo);
						}
						if(!value && option.defaultValue !=undefined) {
							value=option.defaultValue;
						}
						options[optionName]=value;
					}
				}
				if(parameterCallback) {
					if (options[Microsoft.Office.WebExtension.Parameters.Callback]) {
						throw OSF.OUtil.formatString(Strings.OfficeOM.L_RedundantCallbackSpecification);
					}
					else {
						options[Microsoft.Office.WebExtension.Parameters.Callback]=parameterCallback;
					}
				}
				if(fixOptions) {
					options=fixOptions(options);
				}
				return options;
			}
			this.verifyAndExtractCall=function OSF_DAA_AsyncMethodCall$VerifyAndExtractCall(userArgs, caller, stateInfo) {
				var required=OSF_DAA_AsyncMethodCall$ExtractRequiredArguments(userArgs, caller, stateInfo);
				var options=OSF_DAA_AsyncMethodCall$ExtractOptions(userArgs, required, caller, stateInfo);
				var callArgs={};
				for(var r in required) {
					callArgs[r]=required[r];
				}
				for(var o in options) {
					callArgs[o]=options[o];
				}
				for(var s in privateStateCallbacks) {
					callArgs[s]=privateStateCallbacks[s](caller, stateInfo);
				}
				return callArgs;
			}
			this.processResponse=function OSF_DAA_AsyncMethodCall$ProcessResponse(status, response, caller, callArgs) {
				var payload;
				if(status==OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
					if(onSucceeded) {
						payload=onSucceeded(response, caller, callArgs);
					}
					else {
						payload=response;
					}
				}
				else {
					if(onFailed) {
						payload=onFailed(status, response);
					} else {
						payload=OSF.DDA.ErrorCodeManager.getErrorArgs(status);
					}
				}
				return payload;
			}
		}
		OSF.DDA.AsyncMethodNames=(function(methodNames) {
				var ret={}
				for(var entry in methodNames) {
					var am={};
					Object.defineProperties(am, {
						"id": {
							value: entry
						},
						"displayName": {
							value: methodNames[entry]
						}
					});
					ret[entry]=am;
				}
				return ret;
			}({
				GetSelectedDataAsync: "getSelectedDataAsync",
				SetSelectedDataAsync: "setSelectedDataAsync",
				GetWholeDocumentAsync: "getAllContentAsync",
				AddFromSelectionAsync: "addFromSelectionAsync",
				AddFromPromptAsync: "addFromPromptAsync",
				AddFromNamedItemAsync: "addFromNamedItemAsync",
				GetAllAsync: "getAllAsync",
				GetByIdAsync: "getByIdAsync",
				ReleaseByIdAsync: "releaseByIdAsync",
				GetDataAsync: "getDataAsync",
				SetDataAsync: "setDataAsync",
				AddRowsAsync: "addRowsAsync",
				AddColumnsAsync: "addColumnsAsync",
				DeleteAllDataValuesAsync: "deleteAllDataValuesAsync",
				RefreshAsync: "refreshAsync",
				SaveAsync: "saveAsync",
				AddHandlerAsync: "addHandlerAsync",
				RemoveHandlerAsync: "removeHandlerAsync",
				AddDataPartAsync: "addAsync",
				GetDataPartByIdAsync: "getByIdAsync",
				GetDataPartsByNameSpaceAsync: "getByNamespaceAsync",
				DeleteDataPartAsync: "deleteAsync",
				GetPartNodesAsync: "getNodesAsync",
				GetPartXmlAsync: "getXmlAsync",
				AddDataPartNamespaceAsync: "addNamespaceAsync",
				GetDataPartNamespaceAsync: "getNamespaceAsync",
				GetDataPartPrefixAsync: "getPrefixAsync",
				GetRelativeNodesAsync: "getNodesAsync",
				GetNodeValueAsync: "getNodeValueAsync",
				GetNodeXmlAsync: "getXmlAsync",
				SetNodeValueAsync: "setNodeValueAsync",
				SetNodeXmlAsync: "setXmlAsync",
				GetSelectedDataProject: "getSelectedDataAsync",
				GetSelectedTask:        "getSelectedTaskAsync",
				GetTask:                "getTaskAsync",
				GetWSSUrl:              "getWSSUrlAsync",
				GetTaskField:           "getTaskFieldAsync",
				GetSelectedResource:    "getSelectedResourceAsync",
				GetResourceField:       "getResourceFieldAsync",
				GetProjectField:        "getProjectFieldAsync",
				GetSelectedView:        "getSelectedViewAsync"
			})
		);
		OSF.DDA.AsyncMethodCallFactory=(function() {
			function createObject(properties) {
				var obj=null;
				if(properties) {
					obj={};
					var len=properties.length;
					for(var i=0 ; i < len; i++) {
						obj[properties[i].name]=properties[i].value;
					}
				}
				return obj;
			}
			return {
				manufacture: function(params) {
					var supportedOptions=params.supportedOptions ? createObject(params.supportedOptions) : [];
					var privateStateCallbacks=params.privateStateCallbacks ? createObject(params.privateStateCallbacks) : [];
					return new OSF.DDA.AsyncMethodCall(
						params.requiredArguments || [],
						supportedOptions,
						privateStateCallbacks,
						params.onSucceeded,
						params.onFailed,
						params.fixOptions
					);
				}
			}
		})();
		OSF.DDA.AsyncMethodCalls=(function() {
			var asyncMethodCalls={};
			function define(params) {
				asyncMethodCalls[params.method.id]=OSF.DDA.AsyncMethodCallFactory.manufacture(params);
			}
			function processData(dataDescriptor) {
				var data=dataDescriptor[Microsoft.Office.WebExtension.Parameters.Data];
				if(data[OSF.DDA.TableDataProperties.TableRows] !=undefined) {
					data=OSF.DDA.OMFactory.manufactureTableData(data);
				}
				return data;
			}
			function processBinding(bindingDescriptor) {
				return OSF.DDA.OMFactory.manufactureBinding(bindingDescriptor, Microsoft.Office.WebExtension.context.document);
			}
			function processDataPart(dataPartDescriptor) {
				return OSF.DDA.OMFactory.manufactureDataPart(dataPartDescriptor, Microsoft.Office.WebExtension.context.document.customXmlParts);
			}
			function processDataNode(dataNodeDescriptor) {
				return OSF.DDA.OMFactory.manufactureDataNode(dataNodeDescriptor);
			}
			function getObjectId(obj) { return obj.id; }
			function getPartId(part, partId) { return partId; };
			function getNodeHandle(node, nodeHandle) { return nodeHandle; };
			define({
				method : OSF.DDA.AsyncMethodNames.GetSelectedDataAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.CoercionType,
						"enum": Microsoft.Office.WebExtension.CoercionType
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.ValueFormat,
						value : {
							"enum": Microsoft.Office.WebExtension.ValueFormat,
							"defaultValue": Microsoft.Office.WebExtension.ValueFormat.Unformatted
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.FilterType,
						value : {
							"enum": Microsoft.Office.WebExtension.FilterType,
							"defaultValue": Microsoft.Office.WebExtension.FilterType.All
						}
					}
				],
				privateStateCallbacks : [],
				onSucceeded : processData
			});
			define({
				method : OSF.DDA.AsyncMethodNames.SetSelectedDataAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Data,
						"types": ["string", "object"]
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.CoercionType,
						value : {
							"enum": Microsoft.Office.WebExtension.CoercionType,
							"calculate": function(requiredArgs) { return OSF.DDA.DataCoercion.determineCoercionType(requiredArgs[Microsoft.Office.WebExtension.Parameters.Data]) }
						}
					}
				],
				privateStateCallbacks : []
			});
			define({
				method: OSF.DDA.AsyncMethodNames.GetWholeDocumentAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.CoercionType,
						"enum": Microsoft.Office.WebExtension.CoercionType
					}
				],
				onSucceeded: function(dataDescriptor, caller, callArgs) {
					var data=dataDescriptor[Microsoft.Office.WebExtension.Parameters.Data];
					var ret;
					switch(callArgs[Microsoft.Office.WebExtension.Parameters.CoercionType]) {
						case Microsoft.Office.WebExtension.CoercionType.Base64:
							ret=OSF.OUtil.encodeBase64(data);
							break;
						case Microsoft.Office.WebExtension.CoercionType.Text:
						default:
							ret=data;
							break;
					}
					return ret;
				}
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddFromSelectionAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.BindingType,
						"enum": Microsoft.Office.WebExtension.BindingType
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : {
							"types": ["string"],
							"calculate": OSF.DDA.generateBindingId
						}
					}
				],
				privateStateCallbacks : [],
				onSucceeded : processBinding
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddFromPromptAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.BindingType,
						"enum": Microsoft.Office.WebExtension.BindingType
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : {
							"types": ["string"],
							"calculate": OSF.DDA.generateBindingId
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.PromptText,
						value : {
							"types": ["string"],
							"calculate": function() { return Strings.OfficeOM.L_AddBindingFromPromptDefaultText; }
						}
					}
				],
				privateStateCallbacks : [],
				onSucceeded : processBinding
			});
			define({
				method: OSF.DDA.AsyncMethodNames.AddFromNamedItemAsync,
				requiredArguments: [
					{
						"name": Microsoft.Office.WebExtension.Parameters.ItemName,
						"types": ["string"]
					},
					{
						"name": Microsoft.Office.WebExtension.Parameters.BindingType,
						"enum": Microsoft.Office.WebExtension.BindingType
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : {
							"types": ["string"],
							"calculate": OSF.DDA.generateBindingId
						}
					},
					{
						name: Microsoft.Office.WebExtension.Parameters.FailOnCollision,
						value : {
							"types": ["boolean"],
							"defaultValue": false
						}
					}
				],
				onSucceeded: processBinding
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetAllAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : function(response) { return OSF.OUtil.mapList(response[OSF.DDA.ListDescriptors.BindingList], processBinding); }
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetByIdAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Id,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : processBinding
			});
			define({
				method : OSF.DDA.AsyncMethodNames.ReleaseByIdAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Id,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : function(response, caller, callArgs) {
					var id=callArgs[Microsoft.Office.WebExtension.Parameters.Id];
					delete caller._eventDispatches[id];
				}
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetDataAsync,
				requiredArguments : [],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.CoercionType,
						value : {
							"enum": Microsoft.Office.WebExtension.CoercionType,
							"calculate": function(requiredArgs, binding) { return OSF.DDA.DataCoercion.getCoercionDefaultForBinding(binding.type) }
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.ValueFormat,
						value : {
							"enum": Microsoft.Office.WebExtension.ValueFormat,
							"defaultValue": Microsoft.Office.WebExtension.ValueFormat.Unformatted
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.FilterType,
						value : {
							"enum": Microsoft.Office.WebExtension.FilterType,
							"defaultValue": Microsoft.Office.WebExtension.FilterType.All
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.StartRow,
						value : {
							"types": ["number"],
							"defaultValue": 0
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.StartColumn,
						value : {
							"types": ["number"],
							"defaultValue": 0
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.RowCount,
						value : {
							"types": ["number"],
							"defaultValue": 0
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.ColumnCount,
						value : {
							"types": ["number"],
							"defaultValue": 0
						}
					}
				],
				fixOptions : function(options) {
					if(options[Microsoft.Office.WebExtension.Parameters.StartRow]==0 &&
						options[Microsoft.Office.WebExtension.Parameters.StartColumn]==0 &&
						options[Microsoft.Office.WebExtension.Parameters.RowCount]==0 &&
						options[Microsoft.Office.WebExtension.Parameters.ColumnCount]==0) {
							delete options[Microsoft.Office.WebExtension.Parameters.StartRow];
							delete options[Microsoft.Office.WebExtension.Parameters.StartColumn];
							delete options[Microsoft.Office.WebExtension.Parameters.RowCount];
							delete options[Microsoft.Office.WebExtension.Parameters.ColumnCount];
					}
					return options;
				},
				privateStateCallbacks : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : getObjectId
					}
				],
				onSucceeded : processData
			});
			define({
				method : OSF.DDA.AsyncMethodNames.SetDataAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Data,
						"types": ["string", "object"]
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.CoercionType,
						value : {
							"enum": Microsoft.Office.WebExtension.CoercionType,
							"calculate": function(requiredArgs) { return OSF.DDA.DataCoercion.determineCoercionType(requiredArgs[Microsoft.Office.WebExtension.Parameters.Data]) }
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.StartRow,
						value : {
							"types": ["number"],
							"defaultValue": 0
						}
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.StartColumn,
						value : {
							"types": ["number"],
							"defaultValue": 0
						}
					}
				],
				fixOptions : function(options) {
					if(options[Microsoft.Office.WebExtension.Parameters.StartRow]==0 &&
						options[Microsoft.Office.WebExtension.Parameters.StartColumn]==0) {
							delete options[Microsoft.Office.WebExtension.Parameters.StartRow];
							delete options[Microsoft.Office.WebExtension.Parameters.StartColumn];
					}
					return options;
				},
				privateStateCallbacks : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : getObjectId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddRowsAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Data,
						"types": ["object"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : getObjectId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddColumnsAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Data,
						"types": ["object"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : getObjectId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.DeleteAllDataValuesAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : Microsoft.Office.WebExtension.Parameters.Id,
						value : getObjectId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.RefreshAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : function deserializeSettings(serializedSettingsDescriptor, refreshingSettings) {
					var serializedSettings=serializedSettingsDescriptor[OSF.DDA.SettingsManager.SerializedSettings];
					var newSettings=OSF.DDA.SettingsManager.deserializeSettings(serializedSettings);
					return newSettings;
				}
			});
			define({
				method : OSF.DDA.AsyncMethodNames.SaveAsync,
				requiredArguments : [],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.OverwriteIfStale,
						value : {
							"types": ["boolean"],
							"defaultValue": true
						}
					}
				],
				privateStateCallbacks : [
					{
						name : OSF.DDA.SettingsManager.SerializedSettings,
						value : function serializeSettings(settingsInstance, settingsCollection) {
							return OSF.DDA.SettingsManager.serializeSettings(settingsCollection);
						}
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddHandlerAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.EventType,
						"enum": Microsoft.Office.WebExtension.EventType,
						"verify": function(eventType, caller, eventDispatch) { return eventDispatch.supportsEvent(eventType); }
					},
					{
						"name": Microsoft.Office.WebExtension.Parameters.Handler,
						"types": ["function"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : []
			});
			define({
				method : OSF.DDA.AsyncMethodNames.RemoveHandlerAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.EventType,
						"enum": Microsoft.Office.WebExtension.EventType,
						"verify": function(eventType, caller, eventDispatch) { return eventDispatch.supportsEvent(eventType); }
					},
					{
						"name": Microsoft.Office.WebExtension.Parameters.Handler,
						"types": ["function", typeof null]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : []
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddDataPartAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Xml,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : processDataPart
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetDataPartByIdAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Id,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : processDataPart
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetDataPartsByNameSpaceAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Namespace,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [],
				onSucceeded : function(response) { return OSF.OUtil.mapList(response[OSF.DDA.PropertyDescriptors.DataPartList], processDataPart); }
			});
			define({
				method : OSF.DDA.AsyncMethodNames.DeleteDataPartAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataPartProperties.Id,
						value : getObjectId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetPartNodesAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.XPath,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataPartProperties.Id,
						value : getObjectId
					}
				],
				onSucceeded : function(response) { return OSF.OUtil.mapList(response[OSF.DDA.ListDescriptors.DataNodeList], processDataNode); }
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetPartXmlAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataPartProperties.Id,
						value : getObjectId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.AddDataPartNamespaceAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Prefix,
						"types": ["string"]
					},
					{
						"name": Microsoft.Office.WebExtension.Parameters.Namespace,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataPartProperties.Id,
						value : getPartId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetDataPartNamespaceAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Prefix,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataPartProperties.Id,
						value : getPartId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetDataPartPrefixAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Namespace,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataPartProperties.Id,
						value : getPartId
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetRelativeNodesAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.XPath,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataNodeProperties.Handle,
						value : getNodeHandle
					}
				],
				onSucceeded : function(response) { return OSF.OUtil.mapList(response[OSF.DDA.ListDescriptors.DataNodeList], processDataNode); }
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetNodeValueAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataNodeProperties.Handle,
						value : getNodeHandle
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetNodeXmlAsync,
				requiredArguments : [],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataNodeProperties.Handle,
						value : getNodeHandle
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.SetNodeValueAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Data,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataNodeProperties.Handle,
						value : getNodeHandle
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.SetNodeXmlAsync,
				requiredArguments : [
					{
						"name": Microsoft.Office.WebExtension.Parameters.Xml,
						"types": ["string"]
					}
				],
				supportedOptions : [],
				privateStateCallbacks : [
					{
						name : OSF.DDA.DataNodeProperties.Handle,
						value : getNodeHandle
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetSelectedDataProject,
				privateStateCallbacks : [
					{
						name : Microsoft.Office.WebExtension.Parameters.CoercionType,
						value : function() { return Microsoft.Office.WebExtension.CoercionType.Text }
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.ValueFormat,
						value : function() { return Microsoft.Office.WebExtension.ValueFormat.Unformatted }
					},
					{
						name : Microsoft.Office.WebExtension.Parameters.FilterType,
						value : function() { return Microsoft.Office.WebExtension.FilterType.All }
					}
				],
				onSucceeded: processData
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetSelectedTask,
				onSucceeded: function(taskIdDescriptor) { return taskIdDescriptor[Microsoft.Office.WebExtension.Parameters.TaskId]; }
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetTask,
				requiredArguments : [
					{
						name: Microsoft.Office.WebExtension.Parameters.TaskId,
						types: ["string"]
					}
				]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetTaskField,
				requiredArguments : [
					{
						name: Microsoft.Office.WebExtension.Parameters.TaskId,
						types: ["string"]
					},
					{   name: Microsoft.Office.WebExtension.Parameters.FieldId,
						types: ["number"]
					}],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.GetRawValue,
						value : {
							"types": ["boolean"],
							"defaultValue": false
						}
					}]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetResourceField,
				requiredArguments : [
					{
						name: Microsoft.Office.WebExtension.Parameters.ResourceId,
						types: ["string"]
					},
					{   name: Microsoft.Office.WebExtension.Parameters.FieldId,
						types: ["number"]
					}],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.GetRawValue,
						value : {
							"types": ["boolean"],
							"defaultValue": false
						}
					}]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetProjectField,
				requiredArguments : [
					{   name: Microsoft.Office.WebExtension.Parameters.FieldId,
						types: ["number"]
					}
				],
				supportedOptions : [
					{
						name : Microsoft.Office.WebExtension.Parameters.GetRawValue,
						value : {
							"types": ["boolean"],
							"defaultValue": false
						}
					}]
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetSelectedResource,
				onSucceeded: function(resIdDescriptor) { return resIdDescriptor[Microsoft.Office.WebExtension.Parameters.ResourceId]; }
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetWSSUrl
			});
			define({
				method : OSF.DDA.AsyncMethodNames.GetSelectedView
			});
			return asyncMethodCalls;
		})();
		OSF.DDA.HostParameterMap=function (specialProcessor, mappings) {
			var toHostMap="toHost";
			var fromHostMap="fromHost";
			var self="self";
			var dynamicTypes={};
			dynamicTypes[Microsoft.Office.WebExtension.Parameters.Data]={
				toHost: function(data) {
					if(data.rows) {
						var tableData={};
						tableData[OSF.DDA.TableDataProperties.TableRows]=data.rows;
						tableData[OSF.DDA.TableDataProperties.TableHeaders]=data.headers;
						data=tableData;
					}
					return data;
				},
				fromHost: function(args) {
					return args;
				}
			}
			function mapValues(preimageSet, mapping) {
				var ret=preimageSet ? {} : undefined;
				for (var entry in preimageSet) {
					var preimage=preimageSet[entry];
					var image;
					if(OSF.DDA.ListType.isListType(entry)) {
						image=[];
						for(var subEntry in preimage) {
							image.push(mapValues(preimage[subEntry], mapping));
						}
					}
					else if(OSF.OUtil.listContainsKey(dynamicTypes, entry)) {
						image=dynamicTypes[entry][mapping](preimage);
					}
					else if(mapping==fromHostMap && specialProcessor.preserveNesting(entry)) {
						image=mapValues(preimage, mapping);
					}
					else {
						var maps=mappings[entry];
						if (maps) {
							image=maps[mapping][preimage];
						}
						else {
							image=preimage;
						}
					}
					ret[entry]=image;
				}
				return ret;
			}
			function generateArguments(imageSet, parameters) {
				var ret;
				for (var param in parameters) {
					var arg;
					if (specialProcessor.isComplexType(param)) {
						arg=generateArguments(imageSet, mappings[param][toHostMap]);
					}
					else {
						arg=imageSet[param];
					}
					if(arg !=undefined) {
						if(!ret) {
							ret={};
						}
						var index=parameters[param];
						if(index==self) {
							index=param;
						}
						ret[index]=specialProcessor.pack(param, arg);
					}
				}
				return ret;
			}
			function extractArguments(source, parameters, extracted) {
				if(!extracted) {
					extracted={};
				}
				for(var param in parameters) {
					var index=parameters[param];
					var value;
					if(index==self) {
						value=source;
					}
					else {
						value=source[index];
					}
					if(value===null || value===undefined) {
						extracted[param]=undefined;
					}
					else {
						value=specialProcessor.unpack(param, value);
						var map;
						if(specialProcessor.isComplexType(param)) {
							map=mappings[param][fromHostMap];
							if(specialProcessor.preserveNesting(param)) {
								extracted[param]=extractArguments(value, map);
							}
							else {
								extractArguments(value, map, extracted);
							}
						}
						else {
							if(OSF.DDA.ListType.isListType(param)) {
								map={};
								var entryDescriptor=OSF.DDA.ListType.getDescriptor(param);
								map[entryDescriptor]=self;
								for(var item in value) {
									value[item]=extractArguments(value[item], map);
								}
							}
							extracted[param]=value;
						}
					}
				}
				return extracted;
			}
			function applyMap(mapName, preimage, mapping) {
				var parameters=mappings[mapName][mapping];
				var image;
				if(mapping=="toHost") {
					var imageSet=mapValues(preimage, mapping);
					image=generateArguments(imageSet, parameters);
				}
				else if(mapping=="fromHost") {
					var argumentSet=extractArguments(preimage, parameters);
					image=mapValues(argumentSet, mapping);
				}
				return image;
			}
			if (!mappings) {
				mappings={}
			}
			this.setMapping=function (mapName, description) {
				var toHost, fromHost;
				if(description.map) {
					toHost=description.map;
					fromHost={};
					for (var preimage in toHost) {
						var image=toHost[preimage];
						if(image==self) {
							image=preimage;
						}
						fromHost[image]=preimage;
					}
				}
				else {
					toHost=description.toHost;
					fromHost=description.fromHost;
				}
				var pair=mappings[mapName]={};
				pair[toHostMap]=toHost;
				pair[fromHostMap]=fromHost;
			}
			this.toHost=function (mapName, preimage) { return applyMap(mapName, preimage, toHostMap) }
			this.fromHost=function (mapName, image) { return applyMap(mapName, image, fromHostMap) }
			this.self=self;
		}
		OSF.DDA.SpecialProcessor=function (complexTypes, dynamicTypes) {
			this.isComplexType=function OSF_DDA_SpecialProcessor$isComplexType(t) {
				return OSF.OUtil.listContainsValue(complexTypes, t);
			};
			this.isDynamicType=function OSF_DDA_SpecialProcessor$isDynamicType(p) {
				return OSF.OUtil.listContainsKey(dynamicTypes, p);
			};
			this.preserveNesting=function OSF_DDA_SpecialProcessor$preserveNesting(p) {
				var pn=[
					OSF.DDA.PropertyDescriptors.Subset,
					OSF.DDA.DataNodeEventProperties.OldNode,
					OSF.DDA.DataNodeEventProperties.NewNode,
					OSF.DDA.DataNodeEventProperties.NextSiblingNode
				];
				return OSF.OUtil.listContainsValue(pn, p);
			};
			this.pack=function OSF_DDA_SpecialProcessor$pack(param, arg) {
				var value;
				if (this.isDynamicType(param)) {
					value=dynamicTypes[param].toHost(arg);
				}
				else {
					value=arg;
				}
				return value;
			};
			this.unpack=function OSF_DDA_SpecialProcessor$unpack(param, arg) {
				var value;
				if (this.isDynamicType(param)) {
					value=dynamicTypes[param].fromHost(arg);
				}
				else {
					value=arg;
				}
				return value;
			};
		};
		OSF.DDA.DispIdHost.Facade=function OSF_DDA_DispIdHost_Facade(getDelegateMethods, parameterMap) {
			var dispIdMap={};
			var jsom=OSF.DDA.AsyncMethodNames;
			var did=OSF.DDA.MethodDispId;
			dispIdMap[jsom.GetSelectedDataAsync.id]=did.dispidGetSelectedDataMethod;
			dispIdMap[jsom.SetSelectedDataAsync.id]=did.dispidSetSelectedDataMethod;
			dispIdMap[jsom.GetWholeDocumentAsync.id]=did.dispidGetWholeDocumentMethod;
			dispIdMap[jsom.AddFromSelectionAsync.id]=did.dispidAddBindingFromSelectionMethod;
			dispIdMap[jsom.AddFromPromptAsync.id]=did.dispidAddBindingFromPromptMethod;
			dispIdMap[jsom.AddFromNamedItemAsync.id]=did.dispidAddBindingFromNamedItemMethod;
			dispIdMap[jsom.GetAllAsync.id]=did.dispidGetAllBindingsMethod;
			dispIdMap[jsom.GetByIdAsync.id]=did.dispidGetBindingMethod;
			dispIdMap[jsom.ReleaseByIdAsync.id]=did.dispidReleaseBindingMethod;
			dispIdMap[jsom.GetDataAsync.id]=did.dispidGetBindingDataMethod;
			dispIdMap[jsom.SetDataAsync.id]=did.dispidSetBindingDataMethod;
			dispIdMap[jsom.AddRowsAsync.id]=did.dispidAddRowsMethod;
			dispIdMap[jsom.AddColumnsAsync.id]=did.dispidAddColumnsMethod;
			dispIdMap[jsom.DeleteAllDataValuesAsync.id]=did.dispidClearAllRowsMethod;
			dispIdMap[jsom.RefreshAsync.id]=did.dispidLoadSettingsMethod;
			dispIdMap[jsom.SaveAsync.id]=did.dispidSaveSettingsMethod;
			dispIdMap[jsom.AddDataPartAsync.id]=did.dispidAddDataPartMethod;
			dispIdMap[jsom.GetDataPartByIdAsync.id]=did.dispidGetDataPartByIdMethod;
			dispIdMap[jsom.GetDataPartsByNameSpaceAsync.id]=did.dispidGetDataPartsByNamespaceMethod;
			dispIdMap[jsom.GetPartXmlAsync.id]=did.dispidGetDataPartXmlMethod;
			dispIdMap[jsom.GetPartNodesAsync.id]=did.dispidGetDataPartNodesMethod;
			dispIdMap[jsom.DeleteDataPartAsync.id]=did.dispidDeleteDataPartMethod;
			dispIdMap[jsom.GetNodeValueAsync.id]=did.dispidGetDataNodeValueMethod;
			dispIdMap[jsom.GetNodeXmlAsync.id]=did.dispidGetDataNodeXmlMethod;
			dispIdMap[jsom.GetRelativeNodesAsync.id]=did.dispidGetDataNodesMethod;
			dispIdMap[jsom.SetNodeValueAsync.id]=did.dispidSetDataNodeValueMethod;
			dispIdMap[jsom.SetNodeXmlAsync.id]=did.dispidSetDataNodeXmlMethod;
			dispIdMap[jsom.AddDataPartNamespaceAsync.id]=did.dispidAddDataNamespaceMethod;
			dispIdMap[jsom.GetDataPartNamespaceAsync.id]=did.dispidGetDataUriByPrefixMethod;
			dispIdMap[jsom.GetDataPartPrefixAsync.id]=did.dispidGetDataPrefixByUriMethod;
			dispIdMap[jsom.GetSelectedDataProject.id]=did.dispidGetSelectedDataMethod;
			dispIdMap[jsom.GetSelectedTask.id]=did.dispidGetSelectedTaskMethod;
			dispIdMap[jsom.GetTask.id]=did.dispidGetTaskMethod;
			dispIdMap[jsom.GetWSSUrl.id]=did.dispidGetWSSUrlMethod;
			dispIdMap[jsom.GetTaskField.id]=did.dispidGetTaskFieldMethod;
			dispIdMap[jsom.GetSelectedResource.id]=did.dispidGetSelectedResourceMethod;
			dispIdMap[jsom.GetResourceField.id]=did.dispidGetResourceFieldMethod;
			dispIdMap[jsom.GetProjectField.id]=did.dispidGetProjectFieldMethod;
			dispIdMap[jsom.GetSelectedView.id]=did.dispidGetSelectedViewMethod;
			jsom=Microsoft.Office.WebExtension.EventType;
			did=OSF.DDA.EventDispId;
			dispIdMap[jsom.SettingsChanged]=did.dispidSettingsChangedEvent;
			dispIdMap[jsom.DocumentSelectionChanged]=did.dispidDocumentSelectionChangedEvent;
			dispIdMap[jsom.BindingSelectionChanged]=did.dispidBindingSelectionChangedEvent;
			dispIdMap[jsom.BindingDataChanged]=did.dispidBindingDataChangedEvent;
			dispIdMap[jsom.TaskSelectionChanged]=did.dispidTaskSelectionChangedEvent;
			dispIdMap[jsom.ResourceSelectionChanged]=did.dispidResourceSelectionChangedEvent;
			dispIdMap[jsom.ViewSelectionChanged]=did.dispidViewSelectionChangedEvent;
			dispIdMap[jsom.DataNodeInserted]=did.dispidDataNodeAddedEvent;
			dispIdMap[jsom.DataNodeReplaced]=did.dispidDataNodeReplacedEvent;
			dispIdMap[jsom.DataNodeDeleted]=did.dispidDataNodeDeletedEvent;
			this[OSF.DDA.DispIdHost.Methods.InvokeMethod]=function OSF_DDA_DispIdHost_Facade$InvokeMethod(method, suppliedArguments, caller, privateState) {
				var callArgs;
				try {
					var methodName=method.id;
					var asyncMethodCall=OSF.DDA.AsyncMethodCalls[methodName];
					callArgs=asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, privateState);
					var dispId=dispIdMap[methodName];
					var delegate=getDelegateMethods(methodName);
					var hostCallArgs;
					if(parameterMap.toHost) {
						hostCallArgs=parameterMap.toHost(dispId, callArgs);
					}
					else {
						hostCallArgs=callArgs;
					}
					delegate[OSF.DDA.DispIdHost.Delegates.ExecuteAsync]({
						"dispId": dispId,
						"hostCallArgs": hostCallArgs,
						"onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
						"onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
						"onComplete": function(status, hostResponseArgs) {
							var responseArgs;
							if(status==OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
								if(parameterMap.fromHost) {
									responseArgs=parameterMap.fromHost(dispId, hostResponseArgs);
								}
								else {
									responseArgs=hostResponseArgs;
								}
							}
							else {
								responseArgs=hostResponseArgs;
							}
							var payload=asyncMethodCall.processResponse(status, responseArgs, caller, callArgs);
							OSF.DDA.issueAsyncResult(callArgs, status, payload);
						}
					});
				}
				catch(ex) {
					if(callArgs) {
						OSF.DDA.issueAsyncResult(callArgs, OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError, {name : Strings.OfficeOM.L_InternalError, message : ex});
					} else {
						throw ex;
					}
				}
			};
			this[OSF.DDA.DispIdHost.Methods.AddEventHandler]=function OSF_DDA_DispIdHost_Facade$AddEventHandler(suppliedArguments, eventDispatch, caller) {
				var callArgs;
				var eventType, handler;
				function onEnsureRegistration(status) {
					if(status==OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
						var added=eventDispatch.addEventHandler(eventType, handler);
						if(!added) {
							status=OSF.DDA.ErrorCodeManager.errorCodes.ooeEventHandlerNotExist;
						}
					}
					var error;
					if(status !=OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
						error=OSF.DDA.ErrorCodeManager.getErrorArgs(OSF.DDA.ErrorCodeManager.errorCodes.ooeEventHandlerNotExist);
					}
					OSF.DDA.issueAsyncResult(callArgs, status, error);
				}
				try {
					var asyncMethodCall=OSF.DDA.AsyncMethodCalls[OSF.DDA.AsyncMethodNames.AddHandlerAsync.id];
					callArgs=asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, eventDispatch);
					eventType=callArgs[Microsoft.Office.WebExtension.Parameters.EventType];
					handler=callArgs[Microsoft.Office.WebExtension.Parameters.Handler]
					if(eventDispatch.hasEventHandler(eventType, handler)) {
					}
					if(eventDispatch.getEventHandlerCount(eventType)==0) {
						var dispId=dispIdMap[eventType];
						var invoker=getDelegateMethods(eventType)[OSF.DDA.DispIdHost.Delegates.RegisterEventAsync];
						invoker({
							"eventType": eventType,
							"dispId": dispId,
							"targetId": caller.id || "",
							"onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
							"onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
							"onComplete": onEnsureRegistration,
							"onEvent": function handleEvent(hostArgs) {
								var args=parameterMap.fromHost(dispId, hostArgs);
								eventDispatch.fireEvent(OSF.DDA.OMFactory.manufactureEventArgs(eventType, caller, args))
							}
						});
					}
					else {
						onEnsureRegistration(OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess);
					}
				}
				catch(ex) {
					if(callArgs) {
						OSF.DDA.issueAsyncResult(callArgs, OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError, {name : Strings.OfficeOM.L_EventRegistrationError, message : ex});
					} else {
						throw ex;
					}
				}
			}
			this[OSF.DDA.DispIdHost.Methods.RemoveEventHandler]=function OSF_DDA_DispIdHost_Facade$RemoveEventHandler(suppliedArguments, eventDispatch, caller) {
				var callArgs;
				var eventType, handler;
				function onEnsureRegistration(status) {
					var error;
					if(status !=OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess) {
						error=OSF.DDA.ErrorCodeManager.getErrorArgs(OSF.DDA.ErrorCodeManager.errorCodes.ooeEventHandlerNotExist);
					}
					OSF.DDA.issueAsyncResult(callArgs, status, error);
				}
				try {
					var asyncMethodCall=OSF.DDA.AsyncMethodCalls[OSF.DDA.AsyncMethodNames.RemoveHandlerAsync.id];
					callArgs=asyncMethodCall.verifyAndExtractCall(suppliedArguments, caller, eventDispatch);
					eventType=callArgs[Microsoft.Office.WebExtension.Parameters.EventType];
					handler=callArgs[Microsoft.Office.WebExtension.Parameters.Handler];
					var status;
					if(handler==null) {
						eventDispatch.clearEventHandlers(eventType);
						status=true;
					}
					else {
						if(!eventDispatch.hasEventHandler(eventType, handler)) {
							status=false;
						}
						else {
							status=eventDispatch.removeEventHandler(eventType, handler);
						}
					}
					if(eventDispatch.getEventHandlerCount(eventType)==0) {
						var dispId=dispIdMap[eventType];
						var invoker=getDelegateMethods(eventType)[OSF.DDA.DispIdHost.Delegates.UnregisterEventAsync];
						invoker({
							"eventType": eventType,
							"dispId": dispId,
							"targetId": caller.id || "",
							"onCalling": function OSF_DDA_DispIdFacade$Execute_onCalling() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.IssueCall); },
							"onReceiving": function OSF_DDA_DispIdFacade$Execute_onReceiving() { OSF.OUtil.writeProfilerMark(OSF.HostCallPerfMarker.ReceiveResponse); },
							"onComplete": onEnsureRegistration
						});
					}
					else {
						onEnsureRegistration(status ? OSF.DDA.ErrorCodeManager.errorCodes.ooeSuccess : Strings.OfficeOM.L_EventRegistrationError);
					}
				}
				catch(ex) {
					if(callArgs) {
						OSF.DDA.issueAsyncResult(callArgs, OSF.DDA.ErrorCodeManager.errorCodes.ooeInternalError, {name : Strings.OfficeOM.L_EventRegistrationError, message : ex});
					} else {
						throw ex;
					}
				}
			}
		}
		OSF.DDA.DispIdHost.addAsyncMethods=function OSF_DDA_DispIdHost$AddAsyncMethods(target, asyncMethodNames, privateState) {
			for(var entry in asyncMethodNames) {
				var method=asyncMethodNames[entry];
				var name=method.displayName;
				if(!target[name]) {
					Object.defineProperty(target, name, {
						value:
							(function(asyncMethod) {
								return function() {
									var invokeMethod=OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.InvokeMethod];
									invokeMethod(asyncMethod, arguments, target, privateState);
								}
							})(method)
					});
				}
			}
		}
		OSF.DDA.DispIdHost.addEventSupport=function OSF_DDA_DispIdHost$AddEventSupport(target, eventDispatch) {
			var add=OSF.DDA.AsyncMethodNames.AddHandlerAsync.displayName;
			var remove=OSF.DDA.AsyncMethodNames.RemoveHandlerAsync.displayName;
			if(!target[add]) {
				Object.defineProperty(target, add, {
					value: function() {
						var addEventHandler=OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.AddEventHandler];
						addEventHandler(arguments, eventDispatch, target);
					}
				});
			}
			if(!target[remove]) {
				Object.defineProperty(target, remove, {
					value: function() {
						var removeEventHandler=OSF._OfficeAppFactory.getHostFacade()[OSF.DDA.DispIdHost.Methods.RemoveEventHandler];
						removeEventHandler(arguments, eventDispatch, target);
					}
				});
			}
		}
		OSF.DDA.Context=function OSF_DDA_Context(application, document, settings, license, appOM) {
			Object.defineProperty(this, "application", {
				value: application
			});
			if (document) {
				Object.defineProperty(this, "document", {
					value: document
				});
			}
			if(settings) {
				Object.defineProperty(this, "settings", {
					value: settings
				});
			}
			if(license) {
				Object.defineProperty(this, "license", {
					value: license
				});
			}
			if(appOM) {
				var displayName=appOM.displayName || "appOM";
				delete appOM.displayName;
				Object.defineProperty(this, displayName, {
					value: appOM
				});
			}
		}
		Object.defineProperty(Microsoft.Office.WebExtension, "context", {
			get: function Microsoft_Office_WebExtension$GetContext() {
				var context;
				if (OSF && OSF._OfficeAppFactory) {
					context=OSF._OfficeAppFactory.getContext();
				}
				return context;
			}
		});
		Microsoft.Office.WebExtension.useShortNamespace=function Microsoft_Office_WebExtension_useShortNamespace(useShortcut) {
			if(useShortcut) {
				OSF.NamespaceManager.enableShortcut();
			} else {
				OSF.NamespaceManager.disableShortcut();
			}
		};
		Microsoft.Office.WebExtension.select=function Microsoft_Office_WebExtension_select(str, errorCallback) {
			var promise;
			if(str) {
				var index=str.indexOf("#");
				if(index !=-1) {
					var op=str.substring(0, index);
					var target=str.substring(index+1);
					switch(op) {
						case "bindings":
							if(target) {
								promise=new OSF.DDA.BindingPromise(target);
							}
							break;
					}
				}
			}
			if(!promise) {
				throw OSF.OUtil.formatString(Strings.OfficeOM.L_BadSelectorString);
			} else {
				promise.onFail=errorCallback;
				return promise;
			}
		};
		OSF.DDA.BindingPromise=function OSF_DDA_BindingPromise(bindingId, errorCallback) {
			this._id=bindingId;
			Object.defineProperty(this, "onFail", {
				get: function() {
					return errorCallback;
				},
				set: function(onError) {
					var t=typeof onError;
					if(t !="undefined" && t !="function") {
						throw OSF.OUtil.formatString(Strings.OfficeOM.L_CallbackNotAFunction, t);
					}
					errorCallback=onError;
				}
			});
		};
		OSF.DDA.BindingPromise.prototype={
			_fetch: function OSF_DDA_BindingPromise$_fetch(onComplete) {
				if(this.binding) {
					if(onComplete)
						onComplete(this.binding);
				} else {
					if(!this._binding) {
						var me=this;
						Microsoft.Office.WebExtension.context.document.bindings.getByIdAsync(this._id, function(asyncResult) {
							if(asyncResult.status==Microsoft.Office.WebExtension.AsyncResultStatus.Succeeded) {
								Object.defineProperty(me, "binding", {
									value: asyncResult.value
								});
								if(onComplete)
									onComplete(me.binding);
							} else {
								if(me.onFail)
									me.onFail(asyncResult);
							}
						});
					}
				}
				return this;
			},
			getDataAsync: function OSF_DDA_BindingPromise$getDataAsync() {
				var args=arguments;
				this._fetch(function onComplete(binding) { binding.getDataAsync.apply(binding, args); });
				return this;
			},
			setDataAsync: function OSF_DDA_BindingPromise$setDataAsync() {
				var args=arguments;
				this._fetch(function onComplete(binding) { binding.setDataAsync.apply(binding, args); });
				return this;
			},
			addHandlerAsync: function OSF_DDA_BindingPromise$addHandlerAsync() {
				var args=arguments;
				this._fetch(function onComplete(binding) { binding.addHandlerAsync.apply(binding, args); });
				return this;
			},
			removeHandlerAsync: function OSF_DDA_BindingPromise$removeHandlerAsync() {
				var args=arguments;
				this._fetch(function onComplete(binding) { binding.removeHandlerAsync.apply(binding, args); });
				return this;
			}
		};
		OSF.DDA.License=function OSF_DDA_License(eToken) {
			Object.defineProperty(this, "value", {
				value: eToken
			});
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
				}
			});
			var am=OSF.DDA.AsyncMethodNames;
			OSF.DDA.DispIdHost.addAsyncMethods(
				this,
				[
					am.SaveAsync,
					am.RefreshAsync
				],
				settings
			);
			OSF.DDA.DispIdHost.addEventSupport(this, new OSF.EventDispatch([Microsoft.Office.WebExtension.EventType.SettingsChanged]));
			OSF.OUtil.finalizeProperties(this);
		};
		OSF.DDA.Application=function OSF_DDA_Application(officeAppContext, wnd) {
			this._officeAppContext=officeAppContext;
			this._mode=Microsoft.Office.WebExtension.ApplicationMode.Client;
			var getNameString=function (appNameNumber) {
				for (var nameString in OSF.AppName) {
					if (OSF.AppName[nameString]==appNameNumber) return nameString;
				}
				throw OSF.OUtil.formatString(Strings.OfficeOM.L_AppNameNotExist, appNameNumber);
			};
			this._wnd=wnd;
			OSF.OUtil.defineMutableProperties(this, {
				"contentLanguage": {
					value: officeAppContext.get_dataLocale()
				},
				"displayLanguage": {
					value: officeAppContext.get_appUILocale()
				},
				"mode": {
					value: undefined
				},
				"name": {
					value: getNameString(officeAppContext.get_appName())
				},
				"version": {
					value: officeAppContext.get_appVersion()
				}
			});
		};
		OSF.DDA.ClientApplication=function OSF_DDA_ClientApplication(officeAppContext, wnd) {
			OSF.DDA.ClientApplication.uber.constructor.call(this, officeAppContext, wnd);
			this.mode=Microsoft.Office.WebExtension.ApplicationMode.Client;
		}
		OSF.OUtil.extend(OSF.DDA.ClientApplication, OSF.DDA.Application);
		OSF.DDA.WebApplication=function OSF_DDA_WebApplication(officeAppContext, wnd) {
			OSF.DDA.WebApplication.uber.constructor.call(this, officeAppContext, wnd);
			if(officeAppContext.get_clientMode()==OSF.DDA.DocumentMode.ReadOnly) {
				this.mode=Microsoft.Office.WebExtension.ApplicationMode.WebViewer;
			} else {
				this.mode=Microsoft.Office.WebExtension.ApplicationMode.WebEditor;
			}
		}
		OSF.OUtil.extend(OSF.DDA.WebApplication, OSF.DDA.Application);
		OSF.DDA.Excel=function OSF_DDA_Excel(officeAppContext, wnd) {
			OSF.DDA.Excel.uber.constructor.call(this, officeAppContext, wnd);
			OSF.OUtil.finalizeProperties(this);
		};
		OSF.OUtil.extend(OSF.DDA.Excel, OSF.DDA.ClientApplication);
		OSF.DDA.ExcelWebApp=function OSF_DDA_ExcelWebApp(officeAppContext, wnd) {
			OSF.DDA.ExcelWebApp.uber.constructor.call(this, officeAppContext, wnd);
			this.name="Excel";
			OSF.OUtil.finalizeProperties(this);
		}
		OSF.OUtil.extend(OSF.DDA.ExcelWebApp, OSF.DDA.WebApplication);
		OSF.DDA.Word=function OSF_DDA_Word(officeAppContext, wnd) {
			OSF.DDA.Word.uber.constructor.call(this, officeAppContext, wnd);
			OSF.OUtil.finalizeProperties(this);
		};
		OSF.OUtil.extend(OSF.DDA.Word, OSF.DDA.ClientApplication);
		OSF.DDA.Outlook=function OSF_DDA_Outlook(officeAppContext, wnd, outlookAppOm, appReady) {
			OSF.DDA.Outlook.uber.constructor.call(this, officeAppContext, wnd);
			if (officeAppContext.get_appName()===OSF.AppName.OutlookWebApp) {
				this.mode=Microsoft.Office.WebExtension.ApplicationMode.WebEditor;
			}
			this.get_outlookAppOm=function() {return outlookAppOm;};
		};
		OSF.OUtil.extend(OSF.DDA.Outlook, OSF.DDA.Application);
		OSF.DDA.OutlookAppOm=function OSF_DDA_OutlookAppOm() {};
		OSF.DDA.Document=function OSF_DDA_Document(officeAppContext, application) {
			var mode;
			switch(officeAppContext.get_clientMode()) {
				case OSF.ClientMode.ReadOnly: mode=Microsoft.Office.WebExtension.DocumentMode.ReadOnly; break;
				case OSF.ClientMode.ReadWrite: mode=Microsoft.Office.WebExtension.DocumentMode.ReadWrite; break;
			}
			OSF.OUtil.defineMutableProperties(this, {
				"application": {
					value: application
				},
				"mode": {
					value: mode
				},
				"url": {
					value: officeAppContext.get_docUrl()
				}
			});
		};
		OSF.DDA.JsomDocument=function OSF_DDA_JsomDocument(officeAppContext, application, bindingFacade) {
			OSF.DDA.JsomDocument.uber.constructor.call(this, officeAppContext, application);
			Object.defineProperty(this, "bindings", {
				get: function OSF_DDA_Document$GetBindings() { return bindingFacade; }
			});
			var am=OSF.DDA.AsyncMethodNames;
			OSF.DDA.DispIdHost.addAsyncMethods(this, [
				am.GetSelectedDataAsync,
				am.SetSelectedDataAsync
			]);
			OSF.DDA.DispIdHost.addEventSupport(this, new OSF.EventDispatch([Microsoft.Office.WebExtension.EventType.DocumentSelectionChanged]));
		};
		OSF.OUtil.extend(OSF.DDA.JsomDocument, OSF.DDA.Document);
		OSF.DDA.ExcelDocument=function OSF_DDA_ExcelDocument(officeAppContext, application) {
			throw OSF.OUtil.formatString(Strings.OfficeOM.L_NotImplemented, 'ExcelDocument');
		};
		OSF.DDA.WordDocument=function OSF_DDA_WordDocument(officeAppContext, application) {
			throw OSF.OUtil.formatString(Strings.OfficeOM.L_NotImplemented, 'WordDocument');
		};
		OSF.DDA.BindingFacade=function OSF_DDA_BindingFacade(docInstance) {
			this._eventDispatches=[];
			Object.defineProperty(this, "document", {
				value: docInstance,
				writeable: false,
				configurable: false
			});
			var am=OSF.DDA.AsyncMethodNames;
			OSF.DDA.DispIdHost.addAsyncMethods(this, [
				am.AddFromSelectionAsync,
				am.AddFromNamedItemAsync,
				am.GetAllAsync,
				am.GetByIdAsync,
				am.ReleaseByIdAsync
			]);
		};
		OSF.DDA.Binding=function OSF_DDA_Binding(id, docInstance) {
			Object.defineProperties(this, {
				"document": {
					value: docInstance,
					writeable: false,
					configurable: false
				},
				"id": {
					value: id,
					writeable: false,
					configurable: false
				},
				"type": {
					get: function OSF_DDA_Binding$GetType() { throw OSF.OUtil.formatString(Strings.OfficeOM.L_NotImplemented, 'OSF_DDA_Binding$GetType'); },
					configurable: true
				}
			});
			var am=OSF.DDA.AsyncMethodNames;
			OSF.DDA.DispIdHost.addAsyncMethods(this, [
				am.GetDataAsync,
				am.SetDataAsync
			]);
			var et=Microsoft.Office.WebExtension.EventType;
			var bindingEventDispatches=docInstance.bindings._eventDispatches;
			if(!bindingEventDispatches[id]) {
				bindingEventDispatches[id]=new OSF.EventDispatch([
					et.BindingSelectionChanged,
					et.BindingDataChanged
				]);
			}
			var eventDispatch=bindingEventDispatches[id];
			OSF.DDA.DispIdHost.addEventSupport(this, eventDispatch);
		};
		OSF.DDA.TextBinding=function OSF_DDA_TextBinding(id, docInstance) {
			OSF.DDA.TextBinding.uber.constructor.call(
				this,
				id,
				docInstance
			);
			Object.defineProperty(this, "type", {
				value: Microsoft.Office.WebExtension.BindingType.Text,
				writeable: false,
				configurable: false
			});
		};
		OSF.OUtil.extend(OSF.DDA.TextBinding, OSF.DDA.Binding);
		OSF.DDA.MatrixBinding=function OSF_DDA_MatrixBinding(id, docInstance, rows, cols) {
			OSF.DDA.MatrixBinding.uber.constructor.call(
				this,
				id,
				docInstance
			);
			Object.defineProperties(this, {
				"type": {
					value: Microsoft.Office.WebExtension.BindingType.Matrix,
					writeable: false,
					configurable: false
				},
				"rowCount": {
					value: rows ? rows : 0,
					writeable: false,
					configurable: false
				},
				"columnCount": {
					value: cols ? cols: 0,
					writeable: false,
					configurable: false
				}
			});
		};
		OSF.OUtil.extend(OSF.DDA.MatrixBinding, OSF.DDA.Binding);
		OSF.DDA.TableBinding=function OSF_DDA_TableBinding(id, docInstance, rows, cols, hasHeaders) {
			OSF.DDA.TableBinding.uber.constructor.call(
				this,
				id,
				docInstance
			);
			Object.defineProperties(this, {
				"type": {
					value: Microsoft.Office.WebExtension.BindingType.Table,
					writeable: false,
					configurable: false
				},
				"rowCount": {
					value: rows ? rows : 0,
					writeable: false,
					configurable: false
				},
				"columnCount": {
					value: cols ? cols: 0,
					writeable: false,
					configurable: false
				},
				"hasHeaders": {
					value: hasHeaders ? hasHeaders : false,
					writeable: false,
					configurable: false
				}
			});
			var am=OSF.DDA.AsyncMethodNames;
			OSF.DDA.DispIdHost.addAsyncMethods(this, [
				am.AddRowsAsync,
				am.AddColumnsAsync,
				am.DeleteAllDataValuesAsync
			]);
		};
		OSF.OUtil.extend(OSF.DDA.TableBinding, OSF.DDA.Binding);
		Microsoft.Office.WebExtension.TableData=function Microsoft_Office_WebExtension_TableData(rows, headers) {
			function fixDimension(data) {
				try {
					for(var dim=OSF.DDA.DataCoercion.findArrayDimensionality(data, 2); dim < 2; dim++) {
						data=[data];
					}
					return data;
				}
				catch(ex) {
				}
			}
			Object.defineProperties(this, {
				"headers": {
					get: function() { return headers; },
					set: function(value) {
						headers=value !=undefined ? fixDimension(value) : null;
					}
				},
				"rows": {
					get: function() { return rows; },
					set: function(value) {
						rows=fixDimension(value);
					}
				}
			});
			this.headers=headers;
			this.rows=rows;
		};
		OSF.DDA.Error=function OSF_DDA_Error(name, message) {
			Object.defineProperties(this, {
				"name": {
					value: name,
					writeable: false,
					configurable: false
				},
				"message": {
					value: message,
					writeable: false,
					configurable: false
				}
			});
		};
		OSF.DDA.AsyncResult=function OSF_DDA_AsyncResult(initArgs, errorArgs) {
			Object.defineProperties(this, {
				"value": {
					value: initArgs[OSF.DDA.AsyncResultEnum.Properties.Value],
					writeable: false,
					configurable: false
				},
				"status": {
					value: errorArgs ? Microsoft.Office.WebExtension.AsyncResultStatus.Failed : Microsoft.Office.WebExtension.AsyncResultStatus.Succeeded,
					writeable: false,
					configurable: false
				}
			});
			if(initArgs[OSF.DDA.AsyncResultEnum.Properties.Context]) {
				Object.defineProperty(this, "asyncContext", {
					value: initArgs[OSF.DDA.AsyncResultEnum.Properties.Context],
					writeable: false,
					configurable: false
				});
			}
			if(errorArgs) {
				Object.defineProperty(this, "error", {
					value: new OSF.DDA.Error(
						errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Name],
						errorArgs[OSF.DDA.AsyncResultEnum.ErrorProperties.Message]
					),
					writeable: false,
					configurable: false
				});
			}
		};
		OSF.DDA.DocumentSelectionChangedEventArgs=function OSF_DDA_DocumentSelectionChangedEventArgs(docInstance) {
			Object.defineProperties(this, {
				"type": {
					value: Microsoft.Office.WebExtension.EventType.DocumentSelectionChanged,
					writeable: false,
					configurable: false
				},
				"document": {
					value: docInstance,
					writeable: false,
					configurable: false
				}
			});
		};
		OSF.DDA.BindingSelectionChangedEventArgs=function OSF_DDA_BindingSelectionChangedEventArgs(bindingInstance, subset) {
			Object.defineProperties(this, {
				"type": {
					value: Microsoft.Office.WebExtension.EventType.BindingSelectionChanged,
					writeable: false,
					configurable: false
				},
				"binding": {
					value: bindingInstance,
					writeable: false,
					configurable: false
				}
			});
			for(var prop in subset) {
				Object.defineProperty(this, prop, {
					value: subset[prop],
					writeable:false,
					configurable: false
				});
			}
		};
		OSF.DDA.BindingDataChangedEventArgs=function OSF_DDA_BindingDataChangedEventArgs(bindingInstance) {
			Object.defineProperties(this, {
				"type": {
					value: Microsoft.Office.WebExtension.EventType.BindingDataChanged,
					writeable: false,
					configurable: false
				},
				"binding": {
					value: bindingInstance,
					writeable: false,
					configurable: false
				}
			});
		};
		OSF.DDA.SettingsChangedEventArgs=function OSF_DDA_SettingsChangedEventArgs(settingsInstance) {
			Object.defineProperties(this, {
				"type": {
					value: Microsoft.Office.WebExtension.EventType.SettingsChanged,
					writeable: false,
					configurable: false
				},
				"settings": {
					value: settingsInstance,
					writeable: false,
					configurable: false
				}
			});
		};
		OSF._OfficeAppFactory=(function() {
			var _officeJS="office.js";
			var _appToScriptTable={
				"1-15" : "excel-15.js",
				"2-15" : "word-15.js",
				"8-15" : "outlook-15.js",
				"16-15" : "excelwebapp-15.js",
				"64-15" : "outlookwebapp-15.js",
				"128-15": "Project-15.js"
			};
			var _context;
			var _app;
			var _hostFacade;
			var _WebAppState={};
			_WebAppState.id=null;
			_WebAppState.webAppUrl=null;
			_WebAppState.conversationID=null;
			_WebAppState.clientEndPoint=null;
			_WebAppState.window=window.parent;
			var _isRichClient=true;
			var retrieveIframeInfo=function () {
				var xdmInfoValue=OSF.OUtil.parseXdmInfo();
				if (xdmInfoValue !=null) {
					var items=xdmInfoValue.split('|');
					if (items !=undefined && items.length==3) {
						_WebAppState.conversationID=items[0];
						_WebAppState.id=items[1];
						_WebAppState.webAppUrl=items[2];
						_isRichClient=false;
					}
				}
			};
			var getAppContextAsync=function (wnd, gotAppContext) {
					if (_isRichClient) {
						var returnedContext;
						var context=window.external.GetContext();
						var appType=context.GetAppType();
						var appTypeSupported=false;
						for (var appEntry in OSF.AppName) {
							if (OSF.AppName[appEntry]==appType) {
								appTypeSupported=true;
								break;
							}
						}
						if (!appTypeSupported) {
							throw "Unsupported client type "+appType;
						}
						var id=context.GetSolutionRef();
						var version=context.GetAppVersionMajor();
						var UILocale=context.GetAppUILocale();
						var dataLocale=context.GetAppDataLocale();
						var docUrl=context.GetDocUrl();
						var clientMode=context.GetAppCapabilities();
						var reason=context.GetActivationMode();
						var osfControlType=context.GetControlIntegrationLevel();
						var settings=[];
						var eToken;
						try {
							eToken=context.GetSolutionToken();
						}
						catch (ex) {
						}
						eToken=eToken ? eToken.toString() : "";
						returnedContext=new OSF.OfficeAppContext(id, appType, version, UILocale, dataLocale, docUrl, clientMode, settings, reason, osfControlType, eToken);
						gotAppContext(returnedContext);
					} else {
						var getInvocationCallbackWebApp=function (errorCode, appContext) {
							var settings;
							if (appContext._appName===OSF.AppName.ExcelWebApp) {
								var serializedSettings=appContext._settings;
								settings={};
								for(var index in serializedSettings) {
									var setting=serializedSettings[index];
									settings[setting[0]]=setting[1];
								}
							}
							else {
								settings=appContext._settings;
							}
							if (errorCode===0 && appContext._id !=undefined && appContext._appName !=undefined && appContext._appVersion !=undefined && appContext._appUILocale !=undefined && appContext._dataLocale !=undefined &&
								appContext._docUrl !=undefined && appContext._clientMode !=undefined && appContext._settings !=undefined && appContext._reason !=undefined) {
								var returnedContext=new OSF.OfficeAppContext(appContext._id, appContext._appName, appContext._appVersion, appContext._appUILocale, appContext._dataLocale, appContext._docUrl, appContext._clientMode, settings, appContext._reason, appContext._osfControlType, appContext._eToken);
								gotAppContext(returnedContext);
							} else {
								throw "Function ContextActivationManager_getAppContextAsync call failed. ErrorCode is "+errorCode;
							}
						};
						_WebAppState.clientEndPoint.invoke("ContextActivationManager_getAppContextAsync", getInvocationCallbackWebApp, _WebAppState.id);
					}
				};
			var initialize=function () {
				retrieveIframeInfo();
				if (!_isRichClient) {
					_WebAppState.clientEndPoint=Microsoft.Office.Common.XdmCommunicationManager.connect(_WebAppState.conversationID, _WebAppState.window, _WebAppState.webAppUrl);
				}
				var scripts=document.getElementsByTagName("script") || [];
				var i, src, basePath, indexOfOfficeJS;
				for (i=0;i<scripts.length;i++) {
					if (scripts[i].src) {
						src=scripts[i].src.toLowerCase();
						indexOfOfficeJS=src.indexOf(_officeJS);
						if (indexOfOfficeJS===(src.length - _officeJS.length) && (indexOfOfficeJS===0 || src.charAt(indexOfOfficeJS-1)==='/' || src.charAt(indexOfOfficeJS-1)==='\\')) {
							basePath=src.replace(_officeJS, "");
						}
					}
				}
				if (basePath===undefined) throw "Office Web Extension script library file name should be Office.js.";
				getAppContextAsync(_WebAppState.window, function (appContext) {
					var app, doc, appOM;
					var retryNumber=100;
					var t;
					function appReady() {
						if (Microsoft.Office.WebExtension.initialize !=undefined && app !=undefined) {
							var serializedSettings;
							if (_isRichClient) {
								serializedSettings=OSF.DDA.RichClientSettingsManager.read();
							} else if(appContext.get_appName()==OSF.AppName.ExcelWebApp) {
								serializedSettings=appContext.get_settings();
							} else {
								serializedSettings=appContext.get_settings();
							}
							var settings=new OSF.DDA.Settings(OSF.DDA.SettingsManager.deserializeSettings(serializedSettings));
							var license=new OSF.DDA.License(appContext.get_eToken());
							if (appContext.get_appName()==OSF.AppName.OutlookWebApp || appContext.get_appName()==OSF.AppName.Outlook) {
								_context=new OSF.DDA.Context(app, null, settings, license, appOM);
								Microsoft.Office.WebExtension.initialize();
							}
							else if (appContext.get_osfControlType()===OSF.OsfControlType.DocumentLevel || appContext.get_osfControlType()===OSF.OsfControlType.ContainerLevel) {
								_context=new OSF.DDA.Context(app, doc, settings, license);
								var getDelegateMethods, parameterMap;
								var reason=appContext.get_reason();
								if(_isRichClient) {
									getDelegateMethods=OSF.DDA.DispIdHost.getRichClientDelegateMethods;
									parameterMap=OSF.DDA.SafeArray.Delegate.ParameterMap;
									reason=OSF.DDA.RichInitializationReason[reason];
								} else {
									getDelegateMethods=OSF.DDA.DispIdHost.getXLSDelegateMethods;
									parameterMap=OSF.DDA.XLS.Delegate.ParameterMap;
								}
								_hostFacade=new OSF.DDA.DispIdHost.Facade(getDelegateMethods, parameterMap);
								Microsoft.Office.WebExtension.initialize(reason);
							}
							else {
								throw OSF.OUtil.formatString(Strings.OfficeOM.L_OsfControlTypeNotSupported);
							}
							_app=app;
							if (t !=undefined) window.clearTimeout(t);
						} else if (retryNumber==0) {
							clearTimeout(t);
							throw OSF.OUtil.formatString(Strings.OfficeOM.L_InitializeNotReady);
						} else {
							retryNumber--;
							t=window.setTimeout(appReady, 100);
						}
					};
					var localeStringFileLoaded=function() {
						if (typeof Strings=='undefined' || typeof Strings.OfficeOM=='undefined') throw "The locale, "+appContext.get_appUILocale()+", provided by the host app is not supported.";
						var scriptPath=basePath+_appToScriptTable[appContext.get_appName()+"-"+appContext.get_appVersion()];
						var stringNS=Strings.OfficeOM;
						var errorMgr=OSF.DDA.ErrorCodeManager;
						var errorMapping={};
						errorMapping[errorMgr.errorCodes.ooeCoercionTypeNotSupported]={ name : stringNS.L_InvalidCoercion , message : stringNS.L_CoercionTypeNotSupported };
						errorMapping[errorMgr.errorCodes.ooeGetSelectionNotMatchDataType]={ name : stringNS.L_DataReadError , message : stringNS.L_GetSelectionNotSupported };
						errorMapping[errorMgr.errorCodes.ooeCoercionTypeNotMatchBinding]={ name : stringNS.L_InvalidCoercion , message : stringNS.L_CoercionTypeNotMatchBinding };
						errorMapping[errorMgr.errorCodes.ooeInvalidGetRowColumnCounts]={ name : stringNS.L_DataReadError , message : stringNS.L_InvalidGetRowColumnCounts };
						errorMapping[errorMgr.errorCodes.ooeSelectionNotSupportCoercionType]={ name : stringNS.L_DataReadError , message : stringNS.L_SelectionNotSupportCoercionType };
						errorMapping[errorMgr.errorCodes.ooeInvalidGetStartRowColumn]={ name : stringNS.L_DataReadError , message : stringNS.L_InvalidGetStartRowColumn };
						errorMapping[errorMgr.errorCodes.ooeUnsupportedDataObject]={ name : stringNS.L_DataWriteError , message : stringNS.L_UnsupportedDataObject };
						errorMapping[errorMgr.errorCodes.ooeCannotWriteToSelection]={ name : stringNS.L_DataWriteError , message : stringNS.L_CannotWriteToSelection };
						errorMapping[errorMgr.errorCodes.ooeDataNotMatchSelection]={ name : stringNS.L_DataWriteError , message : stringNS.L_DataNotMatchSelection };
						errorMapping[errorMgr.errorCodes.ooeOverwriteWorksheetData]={ name : stringNS.L_DataWriteError , message : stringNS.L_OverwriteWorksheetData };
						errorMapping[errorMgr.errorCodes.ooeDataNotMatchBindingSize]={ name : stringNS.L_DataWriteError , message : stringNS.L_DataNotMatchBindingSize };
						errorMapping[errorMgr.errorCodes.ooeInvalidSetStartRowColumn]={ name : stringNS.L_DataWriteError , message : stringNS.L_InvalidSetStartRowColumn };
						errorMapping[errorMgr.errorCodes.ooeInvalidDataFormat]={ name : stringNS.L_InvalidFormat , message : stringNS.L_InvalidDataFormat };
						errorMapping[errorMgr.errorCodes.ooeDataNotMatchCoercionType]={ name : stringNS.L_InvalidDataObject , message : stringNS.L_DataNotMatchCoercionType };
						errorMapping[errorMgr.errorCodes.ooeDataNotMatchBindingType]={ name : stringNS.L_InvalidDataObject , message : stringNS.L_DataNotMatchBindingType };
						errorMapping[errorMgr.errorCodes.ooeSelectionCannotBound]={ name : stringNS.L_BindingCreationError , message : stringNS.L_SelectionCannotBound };
						errorMapping[errorMgr.errorCodes.ooeBindingNotExist]={ name : stringNS.L_BindingCreationError , message : stringNS.L_BindingNotExist };
						errorMapping[errorMgr.errorCodes.ooeBindingToMultipleSelection]={ name : stringNS.L_BindingCreationError , message : stringNS.L_BindingToMultipleSelection };
						errorMapping[errorMgr.errorCodes.ooeInvalidSelectionForBindingType]={ name : stringNS.L_BindingCreationError , message : stringNS.L_InvalidSelectionForBindingType };
						errorMapping[errorMgr.errorCodes.ooeUnknownBindingType]={ name : stringNS.L_BindingCreationError , message : stringNS.L_UnknownBindingType };
						errorMapping[errorMgr.errorCodes.ooeSettingNameNotExist]={ name : stringNS.L_ReadSettingsError , message : stringNS.L_SettingNameNotExist };
						errorMapping[errorMgr.errorCodes.ooeSettingsCannotSave]={ name : stringNS.L_SaveSettingsError , message : stringNS.L_SettingsCannotSave };
						errorMapping[errorMgr.errorCodes.ooeSettingsAreStale]={ name : stringNS.L_SettingsStaleError , message : stringNS.L_SettingsAreStale };
						errorMapping[errorMgr.errorCodes.ooeOperationNotSupported]={ name : stringNS.L_HostError , message : stringNS.L_OperationNotSupported };
						errorMapping[errorMgr.errorCodes.ooeInternalError]={ name : stringNS.L_InternalError , message : stringNS.L_InternalErrorDescription };
						errorMapping[errorMgr.errorCodes.ooeDocumentReadOnly]={ name : stringNS.L_PermissionDenied , message : stringNS.L_DocumentReadOnly };
						errorMapping[errorMgr.errorCodes.ooeEventHandlerNotExist]={ name : stringNS.L_EventRegistrationError , message : stringNS.L_EventHandlerNotExist };
						errorMapping[errorMgr.errorCodes.ooeInvalidApiCallInContext]={ name : stringNS.L_InvalidAPICall , message : stringNS.L_InvalidApiCallInContext };
						errorMapping[errorMgr.errorCodes.ooeCustomXmlError]={ name : stringNS.L_CustomXmlError , message : stringNS.L_CustomXmlError };
						errorMapping[errorMgr.errorCodes.ooeNoCapability]={ name : stringNS.L_PermissionDenied , message : stringNS.L_NoCapability }
						errorMgr.initErrorMessages(errorMapping);
						if (appContext.get_appName()==OSF.AppName.Excel) {
							var excelScriptLoaded=function() {
								app=new OSF.DDA.Excel(appContext, _WebAppState.window);
								doc=new OSF.DDA.ExcelDocument(appContext, app);
								appReady();
							};
							OSF.OUtil.loadScript(scriptPath, excelScriptLoaded);
						} else if(appContext.get_appName()==OSF.AppName.ExcelWebApp) {
							var excelWebAppScriptLoaded=function() {
								app=new OSF.DDA.ExcelWebApp(appContext, _WebAppState.window);
								doc=new OSF.DDA.ExcelWebAppDocument(appContext, app);
								appReady();
							};
							OSF.OUtil.loadScript(scriptPath, excelWebAppScriptLoaded);
						} else if (appContext.get_appName()==OSF.AppName.Word) {
							var wordScriptLoaded=function() {
								app=new OSF.DDA.Word(appContext, _WebAppState.window);
								doc=new OSF.DDA.WordDocument(appContext, app);
								appReady();
							};
							OSF.OUtil.loadScript(scriptPath, wordScriptLoaded);
						} else if (appContext.get_appName()==OSF.AppName.OutlookWebApp || appContext.get_appName()==OSF.AppName.Outlook) {
							var outlookScriptLoaded=function() {
								appOM=new OSF.DDA.OutlookAppOm();
								app=new OSF.DDA.Outlook(appContext, _WebAppState.window, appOM, appReady);
							};
							OSF.OUtil.loadScript(scriptPath, outlookScriptLoaded);
						} else if (appContext.get_appName()==OSF.AppName.Project) {
							var projScriptLoaded=function() {
								app=new OSF.DDA.Project(appContext, _WebAppState.window);
								doc=new OSF.DDA.ProjectDocument(appContext, app);
								appReady();
							};
							OSF.OUtil.loadScript(scriptPath, projScriptLoaded);
						} else {
							throw OSF.OUtil.formatString(stringNS.L_AppNotExistInitializeNotCalled, appContext.get_appName());
						}
					};
					OSF.OUtil.loadScript(basePath+appContext.get_appUILocale()+"/office_strings.js", localeStringFileLoaded);
				});
			};
			initialize();
			return {
				getId : function OSF__OfficeAppFactory$getId() {return _WebAppState.id;},
				getClientEndPoint : function OSF__OfficeAppFactory$getClientEndPoint() { return _WebAppState.clientEndPoint; },
				getApp : function OSF__OfficeAppFactory$getApp() { return _app; },
				getWebAppState : function OSF__OfficeAppFactory$getWebAppState() { return _WebAppState; },
				getContext: function OSF__OfficeAppFactory$getContext() { return _context; },
				getHostFacade: function OSF__OfficeAppFactory$getHostFacade() { return _hostFacade; }
			};
		})();
	};
	var isMicrosftAjaxLoaded=function OSF$isMicrosftAjaxLoaded() {
		if (typeof(Sys) !=='undefined' && typeof(Type) !=='undefined' &&
		   Sys.StringBuilder && typeof(Sys.StringBuilder)==="function" &&
		   Type.registerNamespace && typeof(Type.registerNamespace)==="function" &&
		   Type.registerClass && typeof(Type.registerClass)==="function") {
			return true;
		} else {
			return false;
		}
	};
	if (isMicrosftAjaxLoaded()) {
		initOSFModule();
	} else if(typeof(Function) !=='undefined'){
		OSF.OUtil.loadScript('http://ajax.aspnetcdn.com/ajax/3.5/MicrosoftAjax.js', function() {
			if (isMicrosftAjaxLoaded()) {
				initOSFModule();
			} else if (typeof(Function) !=='undefined'){
				throw 'Not able to load MicrosoftAjax.js.';
			}
		});
	}
})(window);

