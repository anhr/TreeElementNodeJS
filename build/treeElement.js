/**
 * node.js version of the TreeElement
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
	if (options.params != undefined && options.params.remember && typeof get_cookie !== 'undefined' && get_cookie(options.params.remember, 'false') == 'true') this.onclickBranch(elA);
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
		if (typeof a.branchElement != 'undefined' && a.branchElement.className.indexOf(btoggle) != -1) a.branchElement.className = a.branchElement.className.replace(expanded, '');else parentElement.removeChild(elBranch);
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
						consoleError('Invalid branchElement: ' + a.branchElement);
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
						if (a.params.tree.length == 0) consoleError('empty branch');
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
										consoleError('invalid typeof branch: ' + typeof branch);
								}
							} else {
								elBranch.innerHTML = branch.name;
								if (branch.branchId) elBranch.branchId = branch.branchId;
							}
							el.appendChild(elBranch);
						});
						delete a.params.tree;
						a.branchElement = el;
					} else consoleError('invalid a.params.tree: ' + a.params.tree);
					break;
			}
			var indexBranch = a.branchElement.className.indexOf('branch');
			if (indexBranch == -1 || indexBranch == a.branchElement.className.indexOf('branchLeft')) a.branchElement.className += ' branch';
			if (a.params.animate && a.branchElement.className.indexOf(btoggle) == -1) a.branchElement.className += ' ' + btoggle;
			if (typeof a.params.noBranchLeft == 'undefined' || !a.params.noBranchLeft) a.branchElement.className += ' branchLeft';
		}
		if (!elBranch) {
			parentElement.appendChild(a.branchElement);
			if (a.params.scrollIntoView || typeof a.params.branch != 'undefined' && a.params.branch.scrollIntoView) setTimeout(function () {
				a.branchElement.scrollIntoView();
			}, 0);
		}
		if (a.branchElement.className.indexOf(btoggle) != -1 && a.branchElement.className.indexOf(expanded) == -1) setTimeout(function () {
			a.branchElement.className += expanded;
		}, 0);
		triangle = '▼';
		isOpened = true;
		if (a.params.onOpenBranch != undefined) a.params.onOpenBranch(a);
		if (a.params.branch != undefined && a.params.branch.onOpenBranch != undefined) a.params.branch.onOpenBranch(a);
	}
	if (a.params.remember) SetCookie(a.params.remember, isOpened ? 'true' : 'false');
	a.querySelector('.triangle').innerHTML = triangle;
	if (typeof a.params.branch != 'undefined' && typeof a.params.branch.onclickBranch != 'undefined') a.params.branch.onclickBranch(a);else if (typeof a.params.onclickBranch != 'undefined') a.params.onclickBranch(a);
	return isOpened;
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
	return elBranch ? elBranch.className.indexOf(btoggle) == -1 ? true : elBranch.className.indexOf(expanded) != -1 ? true : false : false;
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
			consoleError("Invalid typeof branch.parentElement: " + typeof branch.parentElement);
	}
	var branchClass = "branch";
	if (parentElement && parentElement.className.indexOf(branchClass) == -1) parentElement.className += " " + branchClass;
	elTree.appendChild(myTreeView.createBranch({
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
									var request = new myRequest();
									request.url = branch.file;
									request.XMLHttpRequestStart(function () {
										request.ProcessReqChange(function (myRequest) {
											if (myRequest.processStatus200Error()) return true;
											elChild.innerHTML = myRequest.req.responseText;
											if (branch.callback != undefined) branch.callback(elChild);
											return true;
										});
									});
								} else consoleError('Branch: ' + JSON.stringify(branch));
							});
							res = true;
						}
						if (!res) consoleError("Invalid branch");
				}
				if (el.className != '') el.className += ' ';
				el.className += branch.animate ? " " + myTreeView.btoggle : "";
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
const expanded = ' expanded';
const btoggle = 'b-toggle';

exports.createBranch = createBranch;
exports.onclickBranch = onclickBranch;
exports.createTree = createTree;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=treeElement.js.map
