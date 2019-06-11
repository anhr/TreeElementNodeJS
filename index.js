/**
 * node.js version of the TreeElement
 * @author Andrej Hristoliubov https://anhr.github.io/AboutMe/
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

//Please download https://github.com/anhr/cookieNodeJS into ../cookieNodeJS folder
import { cookie } from '../cookieNodeJS/cookie.js';

//Please download https://github.com/anhr/loadFileNodeJS into ../loadFileNodeJS folder
import { loadFile } from '../loadFileNodeJS/loadFile.js';
/**
 * @callback onBranchEvent
 * @param {HTMLElement} a element of the "treeView" class
 */

/**
 * @callback branchOptions
 */

/**
 * Create tree branch
 * @param {Object} options followed options is available
 * @param {string} [options.name] name of the branch. Optional. Default is empty name
 * @param {string} [options.title] title of the tag of the TreeElement. Optional. Default is empty title
 * @param {string} [options.tagName] name of the branch tag. Optional. Default is div
 * @param {string} [options.className] className of branch tag. Optional.
 * @param {string} [options.id] id of tag of the branch. Optional. Default is empty id
 * @param {string} [options.treeViewTagName] name of tag of the TreeElement. Optional. Default is span
 * 
 * @param {Object} options.params followed params is available
 * @param {Function} options.params.createBranch function (). creates and returns the branch element
 * @param {string} [options.params.remember] the name of the branch that was opened before closing the web page.
 * This branch will be opened immediately after opening the web page.
 * Optional. Default is empty - not remember
 * @param {boolean} [options.params.noBranchLeft] true - margin-left of the branch is 0 and not 10 pixels.
 * Optional. Default - shift the tree branch to left to the 10 pixels
 * @param {onBranchEvent} [options.params.onOpenBranch] function ( a ). event is user has opened a branch.
 * element is class="treeView". * Optional.
 * @param {onBranchEvent} [options.params.onCloseBranch] function ( a ). event is user has closed a branch. Optional.
 * @param {boolean} [options.params.animate] true - animate of open/closing of the branch. Optional. Default is undefined
 * @param {string} [options.params.branchId] identifier of the branch. Optional.
 * @param {string|Function} [options.params.branch] name of the branch or function () - creates and returns the branch element. Optional.
 * @param {branchOptions[]} [options.params.tree] array of branches. Each item of the tree array is options of the branch. Optional.
 * @param {boolean} [options.params.scrollIntoView] true - scroll the opened branch into the visible area of the browser window.
 * Optional. Default is not scrolling
 *
 * @returns tree branch element
 *
 * @example
 * 
 	document.getElementById( "SimpleTree" ).appendChild( myTreeView.createBranch( {
		name: "Simple Tree",
		params:
		{
			createBranch: function () {
				var el = document.createElement( "div" );
				el.innerText = "Branch";
				return el;
			}
		}
	} ) );
*
 * @example see https://raw.githack.com/anhr/TreeElementNodeJS/master/Examples/html/
 * and https://raw.githack.com/anhr/TreeElementNodeJS/master/Examples/module/
 *
*/
function createBranch( options ) {

	var el = document.createElement( ( options.tagName == undefined ) ? "div" : options.tagName );
	if ( ( options.className != undefined ) )
		el.className = options.className;
	if ( ( options.id != undefined ) )
		el.id = options.id;
	var treeViewTagName = typeof options.treeViewTagName == 'undefined' ? 'span' : options.treeViewTagName;
	switch ( typeof options.name ) {

		case 'undefined': options.name = ''; break;
		case 'function': el.appendChild( options.name() ); return el;

	}
	el.innerHTML =
		'<' + treeViewTagName + ' class="treeView" onclick="javascript: myTreeView.onclickBranch(this)" '
		+ ( ( typeof options.title == 'undefined' ) ? '' : 'title="' + options.title + '"' ) + '>'
		+ '<span class="triangle">▶</span>'//▶//⯈➤compatible with edge and ⯈ not compatible with Safari
		+ '<span class="name">' + options.name + '</span>'
		+ '</' + treeViewTagName + '>';
	var elA = getElTreeView( el );
	elA.params = options.params;
	if (
		( options.params != undefined )
		&& options.params.remember
		&& ( cookie.get( options.params.remember, 'false' ) == 'true' )
	) this.onclickBranch( elA );
	return el;

}

/**
 * Create tree
 * @param {HTMLElement|string} elTree parent element of the tree or class name of the new parent element
 * @param {branchOptions[]} tree array of branches. Each item of the tree array is options of the branch
 * @param {string} [tree[].name] name of the branch. Optional. Default is empty name
 * @param {string|HTMLElement|Function} tree[].branch name of the branch
 * or branch element
 * or function () - creates and returns the branch element
 * @param {boolean} [tree[].animate] true - animate of open/closing of the branch. Optional. Default is undefined
 * @param {string} [tree[].title] title of the tag of the branch. Optional. Default is empty title
 * @param {string} [tree[].tagName] name of the branch tag. Optional. Default is div
 * @param {branchOptions[]} [tree[].tree] array of child branches. Each item of the tree array is options of the branch
 * @param {string} [tree[].parentElement] id of the parentElement of the branch tag.
 * A new branch can be not a child of the tree. Use the parentElement option if you want to create a branch anywhere on the web page.
 * Optional. Default is undefined
 * @param {string} [tree[].file] the path to HTML file with code of the branch element. Optional.
 * @param {string} [tree[].el] code of the branch element. Optional.
 *
 * @example
 * 
	myTreeView.createTree(
		document.getElementById( "ComplexTree" ),
		[
			{
				name: "Animate Branch",
				branch: "branch 1",
				animate: true,
				tree: [
					{
						name: "tree 2.1",
						animate: true,
						tree: [
							{
								name: "tree 2.2",
								branch: "branch 2.2",
								animate: true
							}
						]
					},
					{
						file: "branch1.html",
					},
					{
						el: "<div>Branch from string</div>"
					},
				]
			},
			{
				name: "Complex Tree 2",
				branch: function () {
					var el = document.createElement( "div" );
					el.className = "branchLeft";
					el.appendChild( document.createElement( "input" ) );
					var elClose = document.createElement( "input" );
					elClose.type = "button";
					elClose.onclick = myTreeView.onclickCloseBranch;
					elClose.value = "Close Branch";
					el.appendChild( elClose );
					return el;
				},
				title: "inline-element",
				tagName: "span"
			},
			{
				name: "Complex Tree 3",
				branch: "branch 3",
				title: "inline-element",
				tagName: "span"
			},
		]
	);
 *
 */
function createTree( elTree, tree ) {

	tree.forEach( function ( branch ) {

		appendBranch( elTree, branch );
		if ( typeof branch.branch == "object" ) {

			branch.branch.parentElement.removeChild( branch.branch );
			if ( branch.branch.style.display == "none" )
				branch.branch.style.display = '';

		}

	} );

}

/**
 * User has clicked a branch event
 * @param {HTMLElement} a the branch the user clicked on
 */
function onclickBranch( a ) {

	var parentElement = getParentElement( a ),
		elBranch = getElBranch( parentElement ),
		triangle,
		isOpened = isBranchOpened( elBranch );
	if ( isOpened ) {

		if ( typeof a.branchElement != 'undefined' )
			//Parent element of the branch is null after closing of the branch.
			//But some applications want to know it.
			//Remembers a parent element in the rootElement member.
			a.branchElement.rootElement = a.branchElement.parentElement;
		if ( ( typeof a.branchElement != 'undefined' ) && a.branchElement.classList.contains( btoggle ) )
			a.branchElement.classList.remove( expanded );
		else parentElement.removeChild( elBranch );
		triangle = '▶';
		isOpened = false;
		if ( a.params.onCloseBranch != undefined )
			a.params.onCloseBranch( a );
		if ( ( a.params.branch != undefined ) && ( a.params.branch.onCloseBranch != undefined ) )
			a.params.branch.onCloseBranch( a );

	} else {

		if ( typeof a.branchElement == 'undefined' ) {

			if ( typeof a.params == "undefined" )
				a.params = {};
			switch ( typeof a.params.createBranch ) {

				case "function":
					a.branchElement = a.params.createBranch( a );
					if ( a.branchElement == null ) {

						consoleError( 'Invalid branchElement: ' + a.branchElement );
						return;

					}
					if ( a.branchElement.style.display == "none" )
						a.branchElement.style.display = 'block';
					break;
				case "string":
					a.branchElement = document.getElementById( a.params.createBranch );
					if ( a.branchElement == null ) {

						a.branchElement = document.createElement( "div" );
						a.branchElement.innerText = a.params.createBranch;

					}
					break;
				case "undefined"://tree
					if ( typeof a.params.tree == "undefined" )
						a.params.tree = [];
					if ( typeof a.params.tree == "object" ) {

						var el = document.createElement( "div" );
						if ( a.params.tree.length == 0 )
							consoleError( 'empty branch' );
						a.params.tree.forEach( function ( branch ) {

							var elBranch = document.createElement( "div" );
							if ( typeof branch.branch == "function" ) {

								var branch = branch.branch();
								switch ( typeof branch ) {

									case "string":
										elBranch.innerHTML = branch;
										break;
									case "object":
										elBranch = branch;
										break;
									default: consoleError( 'invalid typeof branch: ' + typeof branch );

								}

							} else {

								elBranch.innerHTML = branch.name;
								if ( branch.branchId )
									elBranch.branchId = branch.branchId;

							}
							el.appendChild( elBranch );

						} );
						delete a.params.tree;
						a.branchElement = el;

					} else consoleError( 'invalid a.params.tree: ' + a.params.tree );
					break;

			}
			var branch = 'branch', branchLeft = 'branchLeft';
			if ( ! a.branchElement.classList.contains( branch ) )
				a.branchElement.classList.add( branch );
			if ( a.params.animate && ! a.branchElement.classList.contains( btoggle ) )
				a.branchElement.classList.add( btoggle );
			if ( ( typeof a.params.noBranchLeft == 'undefined' ) || ! a.params.noBranchLeft )
				a.branchElement.classList.add( branchLeft );

		}
		if ( ! elBranch ) {

			parentElement.appendChild( a.branchElement );
			if ( a.params.scrollIntoView || ( ( typeof a.params.branch != 'undefined' ) && ( a.params.branch.scrollIntoView ) ) )
				setTimeout( function () {

					a.branchElement.scrollIntoView();

				}, 0 );

		}
		if ( a.branchElement.classList.contains( btoggle ) && ! a.branchElement.classList.contains( expanded ) )
			setTimeout( function () {

				a.branchElement.classList.add( expanded );

			}, 0 );

		triangle = '▼';
		isOpened = true;
		if ( a.params.onOpenBranch != undefined )
			a.params.onOpenBranch( a );
		if ( ( a.params.branch != undefined ) && ( a.params.branch.onOpenBranch != undefined ) )
			a.params.branch.onOpenBranch( a );

	}
	if ( a.params.remember !== undefined )
		cookie.set( a.params.remember, isOpened ? 'true' : 'false' );
	a.querySelector( '.triangle' ).innerHTML = triangle;
	if ( ( typeof a.params.branch != 'undefined' ) && ( typeof a.params.branch.onclickBranch != 'undefined' ) )
		a.params.branch.onclickBranch( a );
	else if ( typeof a.params.onclickBranch != 'undefined' )
		a.params.onclickBranch( a );
	return isOpened;

}

/**
 * User has closed a branch event
 * @param {Event} event
 */
function onclickCloseBranch( event ) {

	var elParent = getElementFromEvent( event ).parentElement.parentElement;
	var elTreeView = getElTreeView( elParent );
	if ( elTreeView.parentElement != elParent )
		consoleError( 'incorrect treeView' );
	onclickBranch( elTreeView );

}

/**
 * User has closed a branch event
 * @param {Event} event
 */
function onCloseBranchAnywhere( event ) {

	getElementFromEvent( event ).parentElement.elTreeView.onclick();

}

/**
 * Adds a new branch to the tree
 * @param {String|HTMLElement} elTree id of the tree element or tree element to which the new branch will be added
 * @param {Object} branch new branch options
 * @param {string} [branch.name] name of the branch.
 * Optional. You can use a branch function instead branch name.
 * @param {Function} [branch.branch] function () returns an element of the new branch
 * @param {string} [branch.branchId] identifier of the new branch. Uses for find and remove branch.
 */
function AddNewBranch( elTree, branch ) {

	if ( typeof elTree == "string" )
		elTree = document.getElementById( elTree );
	var elTreeView = getElTreeView( elTree );
	var elBranch = getElBranch( elTree );
	if ( ! elBranch )
		elBranch = elTreeView.branchElement;//branch exists but hidden
	if ( elBranch ) {

		var elNewBranch;
		if ( typeof branch.branch == "function" ) {

			var newBranch = branch.branch();
			switch ( typeof newBranch ) {

				case "string":
					elNewBranch = document.createElement( 'div' );
					elNewBranch.innerHTML = newBranch;
					break;
				case "object":
					elNewBranch = newBranch;
					break;
				default: consoleError( 'invalid typeof branch: ' + typeof newBranch );

			}
			elBranch.appendChild( elNewBranch );

		} else if ( typeof branch.name == "string" ) {

			elNewBranch = document.createElement( 'div' );
			elNewBranch.innerHTML = branch.name;
			elBranch.appendChild( elNewBranch );

		} else consoleError( 'invalid typeof branch.branch: ' + typeof branch.branch );
		if ( typeof branch.branchId != "undefined" )
			elNewBranch.branchId = branch.branchId;//for branch removing

	} else {

		if ( typeof elTreeView.params == "undefined" )
			elTreeView.params = {};
		if ( typeof elTreeView.params.tree == "undefined" )
			elTreeView.params.tree = [];
		elTreeView.params.tree.push( branch );

	}

}

function findBranch( elTree, branchId ) {

	if ( typeof elTree == "string" ) elTree = document.getElementById( elTree );
	var elTreeView = getElTreeView( elTree ),
		array = [];
	if ( elTreeView == null ) return array;
	var tree = elTreeView.params == undefined ? undefined : elTreeView.params.tree;
	if ( typeof tree == 'undefined' ) {

		var elBranches = getElBranch( elTree ),
			childNodes = elBranches == null ?
				( elTreeView.branchElement == undefined ? null : elTreeView.branchElement.childNodes )
				: elBranches.childNodes;
		if ( childNodes == null ) return array;
		for ( var i = childNodes.length - 1; i >= 0; i -- ) {

			var elBranch = childNodes[ i ],
				res = false, //Branch is not detected
				elTreeViewChild = getElTreeView( elBranch );
			if ( elTreeViewChild ) {

				if ( elTreeViewChild.params.branchId == undefined ) consoleError( 'elTreeViewChild.params.branchId: ' + elTreeViewChild.params.branchId );
				if ( ( branchId == undefined ) || ( elTreeViewChild.params.branchId == branchId ) ) res = true;

			} else if ( typeof elBranch.branchId == 'undefined' ) {

				consoleError( 'elBranch.branchId: ' + elBranch.branchId );
				if ( ( branchId == undefined ) || ( elBranch.innerText == branchId ) ) res = true;

			} else if ( ( branchId == undefined ) || ( elBranch.branchId == branchId ) ) res = true;
			if ( res ) array.push( elBranch );

		}

	} else {

		for ( var i = tree.length - 1; i >= 0; i -- ) {

			var branch = tree[ i ],
				res = false;//Branch is not detected
			if ( typeof branch.branchId == 'undefined' ) {

				consoleError( 'branch.branchId: ' + branch.branchId );
				if ( ( branchId == undefined ) || ( branch.name == branchId ) ) res = true;

			} else if ( ( branchId == undefined ) || ( branch.branchId == branchId ) ) res = true;
			if ( res ) array.push( { tree: tree, i: i } );

		}

	}
	return array;

}

/**
 * Removes a branch from a tree
 * @param {String} branchId identifier of the branch for removing. See AddNewBranch function for details
 * @param {HTMLElement} elTree The tree element from which the branch will be removed
 */
function removeBranch( branchId, elTree ) {

	var array = findBranch( elTree, branchId );
	var res = false;//Branch is not detected and not removed
	array.forEach( function ( item ) {

		if ( item.tree == undefined ) item.parentElement.removeChild( item );
		else item.tree.splice( item.i, 1 );
		res = true;

	} );
	return res;

}

/**
 * Removes all branch from a tree
 * @param {HTMLElement} elTree The tree element from which all branches will be removed
 */
function removeAllBranches( elTree ) {

	if ( typeof elTree == "string" )
		elTree = document.getElementById( elTree );
	var res = false;//Branch is not detected and not removed
	var elTreeView = getElTreeView( elTree );
	if ( elTreeView == null )
		return res;
	var tree = elTreeView.params.tree;
	if ( typeof tree == 'undefined' ) {

		var elBranches = getElBranch( elTree );
		var childNodes = elBranches == null ? elTreeView.branchElement.childNodes : elBranches.childNodes;
		for ( var i = childNodes.length - 1; i >= 0; i -- ) {

			var elBranch = childNodes[ i ];
			elBranch.parentElement.removeChild( elBranch );
			res = true;

		}

	} else {

		if ( tree.length > 0 )
			res = true;
		elTreeView.params.tree = [];

	}
	return res;

}

function getElTreeView( parentElement ) {

	return parentElement.querySelector( '.treeView' );

}

function getParentElement( a ) {

	var parentElement = ( ( a.params.branch != undefined ) && ( a.params.branch.parentElement != undefined ) ) ?
		a.params.branch.parentElement : ( a.params.parentElement == undefined ) ? a.parentElement : a.params.parentElement;
	if ( typeof parentElement == "string" )
		parentElement = document.getElementById( parentElement );
	return parentElement;

}

function getElBranch( parentElement ) {

	return parentElement.querySelector( '.branch' );

}

function isBranchOpened( elBranch ) {

	return elBranch ?
		(
			! elBranch.classList.contains( btoggle ) ?
				true : ( elBranch.classList.contains( expanded ) ? true : false )
		)
		: false;

}

function appendBranch( elTree, branch ) {

	if ( typeof elTree == "string" )
		elTree = document.getElementById( elTree );
	var parentElement;
	switch ( typeof branch.parentElement ) {

		case "undefined":
			break;
		case "string":
			parentElement = document.getElementById( branch.parentElement );
			break;
		case "object":
			parentElement = branch.parentElement;
			break;
		default: consoleError( "Invalid typeof branch.parentElement: " + typeof branch.parentElement );

	}
	var branchClass = "branch";
	if ( parentElement && ( parentElement.className.indexOf( branchClass ) == - 1 ) )
		parentElement.className += " " + branchClass;
	elTree.appendChild( createBranch(
		{
			name: branch.name,
			params:
			{
				createBranch: function () {

					var el;
					switch ( typeof branch.branch ) {

						case "function":
							el = branch.branch();
							break;
						case "object":
							el = branch.branch;
							break;
						default:
							el = document.createElement( "div" );
							var res = false;
							if ( typeof branch.branch == "string" ) {

								el.innerText = branch.branch;
								res = true;

							}
							if ( this.branch.tree ) {

								this.branch.tree.forEach( function ( branch ) {

									if ( branch.name ) appendBranch( el, branch );
									else if ( branch.el ) {

										var elChild = document.createElement( 'div' );
										elChild.innerHTML = branch.el;
										el.appendChild( elChild );

									} else if ( branch.file ) {

										var elChild = document.createElement( 'div' );
										elChild.innerHTML = 'branch from "' + branch.file + '" file';
										el.appendChild( elChild );
										elChild.innerHTML = loadFile.sync( branch.file );

									} else consoleError( 'Branch: ' + JSON.stringify( branch ) );

								} );
								res = true;

							}
							if ( ! res )
								consoleError( "Invalid branch" );

					}
					if ( branch.animate )
						el.classList.add( btoggle );
					return el;

				},
				branch: branch,
				remember: branch.remember
			},
			title: branch.title,
			tagName: branch.tagName,
			className: branch.className,
			id: branch.id
		}
	) );

}

var expanded = 'expanded', btoggle = 'b-toggle';

function consoleError( e ) {

	console.error( e );

}
function getElementFromEvent( event ) {
	if ( !event ) event = window.event;//for IE6
	return event.target || event.srcElement;
}

export { createBranch, createTree, onclickBranch, onclickCloseBranch, onCloseBranchAnywhere, AddNewBranch, removeBranch, removeAllBranches };
