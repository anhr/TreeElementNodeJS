/**
 * node.js version of the TreeElement
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function getElTreeView( parentElement ) {

	return parentElement.querySelector( '.treeView' );

}

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
		+ '<span class="triangle">?</span>'//?//??compatible with edge and ? not compatible with Safari
		+ '<span class="name">' + options.name + '</span>'
		+ '</' + treeViewTagName + '>'
		;
	var elA = getElTreeView( el );
	elA.params = options.params;
	if ( ( options.params != undefined ) && options.params.remember && ( get_cookie( options.params.remember, 'false' ) == 'true' ) ) this.onclickBranch( elA );
	return el;

}

export { createBranch };