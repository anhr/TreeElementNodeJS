/**
 * node.js version of the TreeElement
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.myTreeView = {})));
}(this, (function (exports) { 'use strict';

/**
 * @module cookie
 * @description node.js version of the cookie.
 * Cookies let you store user information in web pages.
 * @see {@link https://www.w3schools.com/js/js_cookies.asp}
 *
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function isEnabled() {
	return navigator.cookieEnabled;
}
function set(name, value, cookie_date) {
	if (!isEnabled()) {
		consoleCookieEnabled();
		return;
	}
	value = value.toString();
	if (cookie_date === undefined) {
		cookie_date = new Date();
		cookie_date.setTime(cookie_date.getTime() + 1000 * 60 * 60 * 24 * 365);
	}
	document.cookie = name + "=" + value + (typeof settings == 'undefined' ? '' : settings) + "; expires=" + cookie_date.toGMTString();
	if (document.cookie === '') console.error('document.cookie is empty');
}
function setObject(name, object) {
	set(name, JSON.stringify(object));
}
function get(name, defaultValue) {
	if (!isEnabled()) {
		consoleCookieEnabled();
		return;
	}
	var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	if (results) return unescape(results[2]);
	if (typeof defaultValue == 'undefined') return '';
	return defaultValue;
}
function getObject(name, options, optionsDefault) {
	new defaultCookie().getObject(name, options, copyObject(name, optionsDefault));
}
function copyObject(name, objectDefault) {
	return JSON.parse(get(name, JSON.stringify(objectDefault)));
}
function consoleCookieEnabled() {
	console.error('navigator.cookieEnabled = ' + navigator.cookieEnabled);
}
function defaultCookie(name) {
	this.get = function (defaultValue) {
		return defaultValue;
	};
	this.set = function () {};
	this.getObject = function (name, options, optionsDefault) {
		if (!optionsDefault) return;
		Object.keys(optionsDefault).forEach(function (key) {
			var option = optionsDefault[key];
			if (option !== undefined) options[key] = JSON.parse(JSON.stringify(option));
		});
	};
	this.copyObject = function (name, objectDefault) {
		return JSON.parse(JSON.stringify(objectDefault));
	};
	this.setObject = function () {};
	this.isTrue = function (defaultValue) {
		return defaultValue;
	};
}

/**
* node.js version of the cookie.
*
* @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
*
* @copyright 2011 Data Arts Team, Google Creative Lab
*
* @license under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*/
var cookie = {
  set: set,
  setObject: setObject,
  get: get,
  getObject: getObject,
  copyObject: copyObject,
  defaultCookie: defaultCookie
};

/**
 * node.js version of the synchronous download of the file.
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function myRequest(options) {
	this.loadXMLDoc = function () {
		var req;
		if (window.XMLHttpRequest) {
			req = new XMLHttpRequest();
			if (!req) throw "new XMLHttpRequest() failed!";
		} else if (window.ActiveXObject) {
			req = this.NewActiveXObject();
			if (!req) throw "NewActiveXObject() failed!";
		} else throw "myRequest.loadXMLDoc(...) failed!";
		return req;
	};
	this.NewActiveXObject = function () {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
		} catch (e) {}
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {}
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
		ErrorMessage('This browser does not support XMLHttpRequest. Probably, your security settings do not allow Web sites to use ActiveX controls installed on your computer. Refresh your Web page to find out the current status of your Web page or enable the "Initialize and script ActiveX controls not marked as safe" and "Run Active X controls and plug-ins" of the Security settings of the Internet zone of your browser.');
		return null;
	};
	this.XMLHttpRequestStart = function (onreadystatechange, async) {
		this.XMLHttpRequestStop();
		this.req.onreadystatechange = onreadystatechange;
		if ("onerror" in this.req) {
			this.req.onerror = function (event) {
				ErrorMessage("XMLHttpRequest error. url: " + this.url, false, false);
			};
		}
		this.XMLHttpRequestReStart(async);
	};
	this.getUrl = function () {
		if (typeof this.url == 'undefined' || this.url == null) {
			this.url = "XMLHttpRequest.xml";
		}
		return this.url + (this.params ? this.params : "");
	};
	this.XMLHttpRequestReStart = function (async) {
		try {
			if (typeof async == 'undefined') async = true;
			this.req.open("GET", this.getUrl(), async);
			if (async) {
				var timeout = (60 + 30) * 1000;
				if ("timeout" in this.req)
					this.req.timeout = timeout;
				if ("ontimeout" in this.req) this.req.ontimeout = function () {
					ErrorMessage('XMLHttpRequest timeout', false, false);
				};else {
					clearTimeout(this.timeout_id_SendReq);
					this.timeout_id_SendReq = setTimeout(function () {
						ErrorMessage('XMLHttpRequest timeout 2', false, false);
					}, timeout);
				}
			}
			this.req.send(null);
		} catch (e) {
			ErrorMessage(e.message + " url: " + this.url, false, false);
		}
	};
	this.XMLHttpRequestStop = function () {
		if (this.req == null) return;
		this.req.abort();
	};
	this.ProcessReqChange = function (processStatus200) {
		var req = this.req;
		switch (req.readyState) {
			case 4:
				{
					if (typeof req.status == "unknown") {
						consoleError('typeof XMLHttpRequest status == "unknown"');
						return true;
					}
					if (req.status == 200)
						{
							clearTimeout(this.timeout_id_SendReq);
							return processStatus200(this);
						}
					else {
							ErrorMessage("Invalid XMLHttpRequest status : " + req.status + " url: " + this.url);
						}
				}
				break;
			case 1:
			case 2:
			case 3:
				break;
			case 0:
			default:
				throw "processReqChange(); req.readyState = " + req.readyState;
				break;
		}
		return true;
	};
	this.processStatus200Error = function () {
		var error = this.GetElementText('error', true);
		if (error) {
			ErrorMessage(error);
			return true;
		}
		return false;
	};
	this.GetElementText = function (tagName, noDisplayErrorMessage) {
		var xmlhttp = this.req;
		if (!xmlhttp.responseXML) {
			if (noDisplayErrorMessage != true) ErrorMessage('GetXMLElementText(xmlhttp, ' + tagName + '); xmlhttp.responseXML is null.\nxmlhttp.responseText:\n' + xmlhttp.responseText);
			return null;
		}
		var element = xmlhttp.responseXML.getElementsByTagName(tagName);
		if (element.length == 0) {
			if (noDisplayErrorMessage != true) ErrorMessage('GetXMLElementText(xmlhttp, "' + tagName + '"); element.length == ' + element.length);
			return "";
		}
		var text = "";
		for (var i = 0; i < element.length; i++) {
			if (typeof element[i].textContent == 'undefined') {
				if (typeof element[i].text == 'undefined') {
					ErrorMessage('GetXMLElementText(xmlhttp, ' + tagName + '); element[' + i + '].text) == undefined');
					return '';
				}
				if (text != "") text += " ";
				text += element[i].text;
			} else text += element[i].textContent;
		}
		return text;
	};
	if (options.data) {
		this.req = options.data.req;
		this.url = options.data.url;
		this.params = options.data.params;
	} else {
		try {
			this.req = this.loadXMLDoc();
		} catch (e) {
			var message;
			if (typeof e.message == 'undefined') message = e;else message = e.message;
			ErrorMessage("Your browser is too old and is not compatible with our site.\n\n" + window.navigator.appName + " " + window.navigator.appVersion + "\n\n" + message);
			return;
		}
	}
	if (!this.req) {
		consoleError("Invalid myRequest.req: " + this.req);
		return;
	}
	function ErrorMessage(error) {
		console.error(error);
		options.onerror(error);
	}
}
function sync(url, options) {
	options = options || {};
	options.onload = options.onload || function () {};
	options.onerror = options.onerror || function () {};
	var response,
	    request = new myRequest(options);
	request.url = url;
	request.XMLHttpRequestStart(function () {
		request.ProcessReqChange(function (myRequest) {
			if (myRequest.processStatus200Error()) return;
			response = myRequest.req.responseText;
			options.onload(response, url);
			return;
		});
	}, false
	);
	return response;
}

/**
 * node.js version of the synchronous download of the file.
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var loadFile = {
  sync: sync
};

/**
 * node.js version of the TreeElement
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function createBranch(options) {
	var el = document.createElement(options.tagName == undefined ? "div" : options.tagName);
	if (options.className != undefined) el.className = options.className;
	if (options.id != undefined) el.id = options.id;
	var treeViewTagName = typeof options.treeViewTagName == 'undefined' ? 'span' : options.treeViewTagName;
	switch (typeof options.name) {
		case 'undefined':
			options.name = '';break;
		case 'function':
			el.appendChild(options.name());return el;
	}
	el.innerHTML = '<' + treeViewTagName + ' class="treeView" onclick="javascript: myTreeView.onclickBranch(this)" ' + (typeof options.title == 'undefined' ? '' : 'title="' + options.title + '"') + '>' + '<span class="triangle">▶</span>'
	+ '<span class="name">' + options.name + '</span>' + '</' + treeViewTagName + '>';
	var elA = getElTreeView(el);
	elA.params = options.params;
	if (options.params != undefined && options.params.remember && cookie.get(options.params.remember, 'false') == 'true') this.onclickBranch(elA);
	return el;
}
function createTree(elTree, tree) {
	tree.forEach(function (branch) {
		appendBranch(elTree, branch);
		if (typeof branch.branch == "object") {
			branch.branch.parentElement.removeChild(branch.branch);
			if (branch.branch.style.display == "none") branch.branch.style.display = '';
		}
	});
}
function onclickBranch(a) {
	var parentElement = getParentElement(a),
	    elBranch = getElBranch(parentElement),
	    triangle,
	    isOpened = isBranchOpened(elBranch);
	if (isOpened) {
		if (typeof a.branchElement != 'undefined')
			a.branchElement.rootElement = a.branchElement.parentElement;
		if (typeof a.branchElement != 'undefined' && a.branchElement.classList.contains(btoggle)) a.branchElement.classList.remove(expanded);else parentElement.removeChild(elBranch);
		triangle = '▶';
		isOpened = false;
		if (a.params.onCloseBranch != undefined) a.params.onCloseBranch(a);
		if (a.params.branch != undefined && a.params.branch.onCloseBranch != undefined) a.params.branch.onCloseBranch(a);
	} else {
		if (typeof a.branchElement == 'undefined') {
			if (typeof a.params == "undefined") a.params = {};
			switch (typeof a.params.createBranch) {
				case "function":
					a.branchElement = a.params.createBranch(a);
					if (a.branchElement == null) {
						consoleError$1('Invalid branchElement: ' + a.branchElement);
						return;
					}
					if (a.branchElement.style.display == "none") a.branchElement.style.display = 'block';
					break;
				case "string":
					a.branchElement = document.getElementById(a.params.createBranch);
					if (a.branchElement == null) {
						a.branchElement = document.createElement("div");
						a.branchElement.innerText = a.params.createBranch;
					}
					break;
				case "undefined":
					if (typeof a.params.tree == "undefined") a.params.tree = [];
					if (typeof a.params.tree == "object") {
						var el = document.createElement("div");
						if (a.params.tree.length == 0) consoleError$1('empty branch');
						a.params.tree.forEach(function (branch) {
							var elBranch = document.createElement("div");
							if (typeof branch.branch == "function") {
								var branch = branch.branch();
								switch (typeof branch) {
									case "string":
										elBranch.innerHTML = branch;
										break;
									case "object":
										elBranch = branch;
										break;
									default:
										consoleError$1('invalid typeof branch: ' + typeof branch);
								}
							} else {
								elBranch.innerHTML = branch.name;
								if (branch.branchId) elBranch.branchId = branch.branchId;
							}
							el.appendChild(elBranch);
						});
						delete a.params.tree;
						a.branchElement = el;
					} else consoleError$1('invalid a.params.tree: ' + a.params.tree);
					break;
			}
			var branch = 'branch',
			    branchLeft = 'branchLeft';
			if (!a.branchElement.classList.contains(branch)) a.branchElement.classList.add(branch);
			if (a.params.animate && !a.branchElement.classList.contains(btoggle)) a.branchElement.classList.add(btoggle);
			if (typeof a.params.noBranchLeft == 'undefined' || !a.params.noBranchLeft) a.branchElement.classList.add(branchLeft);
		}
		if (!elBranch) {
			parentElement.appendChild(a.branchElement);
			if (a.params.scrollIntoView || typeof a.params.branch != 'undefined' && a.params.branch.scrollIntoView) setTimeout(function () {
				a.branchElement.scrollIntoView();
			}, 0);
		}
		if (a.branchElement.classList.contains(btoggle) && !a.branchElement.classList.contains(expanded)) setTimeout(function () {
			a.branchElement.classList.add(expanded);
		}, 0);
		triangle = '▼';
		isOpened = true;
		if (a.params.onOpenBranch != undefined) a.params.onOpenBranch(a);
		if (a.params.branch != undefined && a.params.branch.onOpenBranch != undefined) a.params.branch.onOpenBranch(a);
	}
	if (a.params.remember !== undefined) cookie.set(a.params.remember, isOpened ? 'true' : 'false');
	a.querySelector('.triangle').innerHTML = triangle;
	if (typeof a.params.branch != 'undefined' && typeof a.params.branch.onclickBranch != 'undefined') a.params.branch.onclickBranch(a);else if (typeof a.params.onclickBranch != 'undefined') a.params.onclickBranch(a);
	return isOpened;
}
function onclickCloseBranch(event) {
	var elParent = getElementFromEvent(event).parentElement.parentElement;
	var elTreeView = getElTreeView(elParent);
	if (elTreeView.parentElement != elParent) consoleError$1('incorrect treeView');
	onclickBranch(elTreeView);
}
function onCloseBranchAnywhere(event) {
	getElementFromEvent(event).parentElement.elTreeView.onclick();
}
function AddNewBranch(elTree, branch) {
	if (typeof elTree == "string") elTree = document.getElementById(elTree);
	var elTreeView = getElTreeView(elTree);
	var elBranch = getElBranch(elTree);
	if (!elBranch) elBranch = elTreeView.branchElement;
	if (elBranch) {
		var elNewBranch;
		if (typeof branch.branch == "function") {
			var newBranch = branch.branch();
			switch (typeof newBranch) {
				case "string":
					elNewBranch = document.createElement('div');
					elNewBranch.innerHTML = newBranch;
					break;
				case "object":
					elNewBranch = newBranch;
					break;
				default:
					consoleError$1('invalid typeof branch: ' + typeof newBranch);
			}
			elBranch.appendChild(elNewBranch);
		} else if (typeof branch.name == "string") {
			elNewBranch = document.createElement('div');
			elNewBranch.innerHTML = branch.name;
			elBranch.appendChild(elNewBranch);
		} else consoleError$1('invalid typeof branch.branch: ' + typeof branch.branch);
		if (typeof branch.branchId != "undefined") elNewBranch.branchId = branch.branchId;
	} else {
		if (typeof elTreeView.params == "undefined") elTreeView.params = {};
		if (typeof elTreeView.params.tree == "undefined") elTreeView.params.tree = [];
		elTreeView.params.tree.push(branch);
	}
}
function findBranch(elTree, branchId) {
	if (typeof elTree == "string") elTree = document.getElementById(elTree);
	var elTreeView = getElTreeView(elTree),
	    array = [];
	if (elTreeView == null) return array;
	var tree = elTreeView.params == undefined ? undefined : elTreeView.params.tree;
	if (typeof tree == 'undefined') {
		var elBranches = getElBranch(elTree),
		    childNodes = elBranches == null ? elTreeView.branchElement == undefined ? null : elTreeView.branchElement.childNodes : elBranches.childNodes;
		if (childNodes == null) return array;
		for (var i = childNodes.length - 1; i >= 0; i--) {
			var elBranch = childNodes[i],
			    res = false,
			elTreeViewChild = getElTreeView(elBranch);
			if (elTreeViewChild) {
				if (elTreeViewChild.params.branchId == undefined) consoleError$1('elTreeViewChild.params.branchId: ' + elTreeViewChild.params.branchId);
				if (branchId == undefined || elTreeViewChild.params.branchId == branchId) res = true;
			} else if (typeof elBranch.branchId == 'undefined') {
				consoleError$1('elBranch.branchId: ' + elBranch.branchId);
				if (branchId == undefined || elBranch.innerText == branchId) res = true;
			} else if (branchId == undefined || elBranch.branchId == branchId) res = true;
			if (res) array.push(elBranch);
		}
	} else {
		for (var i = tree.length - 1; i >= 0; i--) {
			var branch = tree[i],
			    res = false;
			if (typeof branch.branchId == 'undefined') {
				consoleError$1('branch.branchId: ' + branch.branchId);
				if (branchId == undefined || branch.name == branchId) res = true;
			} else if (branchId == undefined || branch.branchId == branchId) res = true;
			if (res) array.push({ tree: tree, i: i });
		}
	}
	return array;
}
function removeBranch(branchId, elTree) {
	var array = findBranch(elTree, branchId);
	var res = false;
	array.forEach(function (item) {
		if (item.tree == undefined) item.parentElement.removeChild(item);else item.tree.splice(item.i, 1);
		res = true;
	});
	return res;
}
function removeAllBranches(elTree) {
	if (typeof elTree == "string") elTree = document.getElementById(elTree);
	var res = false;
	var elTreeView = getElTreeView(elTree);
	if (elTreeView == null) return res;
	var tree = elTreeView.params.tree;
	if (typeof tree == 'undefined') {
		var elBranches = getElBranch(elTree);
		var childNodes = elBranches == null ? elTreeView.branchElement.childNodes : elBranches.childNodes;
		for (var i = childNodes.length - 1; i >= 0; i--) {
			var elBranch = childNodes[i];
			elBranch.parentElement.removeChild(elBranch);
			res = true;
		}
	} else {
		if (tree.length > 0) res = true;
		elTreeView.params.tree = [];
	}
	return res;
}
function getElTreeView(parentElement) {
	return parentElement.querySelector('.treeView');
}
function getParentElement(a) {
	var parentElement = a.params.branch != undefined && a.params.branch.parentElement != undefined ? a.params.branch.parentElement : a.params.parentElement == undefined ? a.parentElement : a.params.parentElement;
	if (typeof parentElement == "string") parentElement = document.getElementById(parentElement);
	return parentElement;
}
function getElBranch(parentElement) {
	return parentElement.querySelector('.branch');
}
function isBranchOpened(elBranch) {
	return elBranch ? !elBranch.classList.contains(btoggle) ? true : elBranch.classList.contains(expanded) ? true : false : false;
}
function appendBranch(elTree, branch) {
	if (typeof elTree == "string") elTree = document.getElementById(elTree);
	var parentElement;
	switch (typeof branch.parentElement) {
		case "undefined":
			break;
		case "string":
			parentElement = document.getElementById(branch.parentElement);
			break;
		case "object":
			parentElement = branch.parentElement;
			break;
		default:
			consoleError$1("Invalid typeof branch.parentElement: " + typeof branch.parentElement);
	}
	var branchClass = "branch";
	if (parentElement && parentElement.className.indexOf(branchClass) == -1) parentElement.className += " " + branchClass;
	elTree.appendChild(createBranch({
		name: branch.name,
		params: {
			createBranch: function () {
				var el;
				switch (typeof branch.branch) {
					case "function":
						el = branch.branch();
						break;
					case "object":
						el = branch.branch;
						break;
					default:
						el = document.createElement("div");
						var res = false;
						if (typeof branch.branch == "string") {
							el.innerText = branch.branch;
							res = true;
						}
						if (this.branch.tree) {
							this.branch.tree.forEach(function (branch) {
								if (branch.name) appendBranch(el, branch);else if (branch.el) {
									var elChild = document.createElement('div');
									elChild.innerHTML = branch.el;
									el.appendChild(elChild);
								} else if (branch.file) {
									var elChild = document.createElement('div');
									elChild.innerHTML = 'branch from "' + branch.file + '" file';
									el.appendChild(elChild);
									elChild.innerHTML = loadFile.sync(branch.file);
								} else consoleError$1('Branch: ' + JSON.stringify(branch));
							});
							res = true;
						}
						if (!res) consoleError$1("Invalid branch");
				}
				if (branch.animate) el.classList.add(btoggle);
				return el;
			},
			branch: branch,
			remember: branch.remember
		},
		title: branch.title,
		tagName: branch.tagName,
		className: branch.className,
		id: branch.id
	}));
}
var expanded = 'expanded';
var btoggle = 'b-toggle';
function consoleError$1(e) {
	console.error(e);
}
function getElementFromEvent(event) {
	if (!event) event = window.event;
	return event.target || event.srcElement;
}
function getWaitIconBase(papams) {
	if (typeof papams == 'undefined') papams = 'style="width: 20px; height:20px"';
	return '<img src="https://raw.githubusercontent.com/anhr/TreeElementNodeJS/master/img/wait.gif" ' + papams + '>';
}

exports.getWaitIconBase = getWaitIconBase;
exports.createBranch = createBranch;
exports.createTree = createTree;
exports.onclickBranch = onclickBranch;
exports.onclickCloseBranch = onclickCloseBranch;
exports.onCloseBranchAnywhere = onCloseBranchAnywhere;
exports.AddNewBranch = AddNewBranch;
exports.removeBranch = removeBranch;
exports.removeAllBranches = removeAllBranches;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=treeElement.js.map
