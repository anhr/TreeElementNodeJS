# TreeElement
node.js version of the TreeElement.

Adds a hierarchy of HTML elements as a tree to your webpage. [Example.](https://raw.githack.com/anhr/TreeElementNodeJS/master/Examples/html/)


## Packaged Builds
The easiest way to use TreeElement in your code is by using the built source at `build/treeElement.js`. These built JavaScript files bundle all the necessary dependencies to run TreeElement.

In your `head` tag, include the following code:
```
<link rel="stylesheet" href="https://anhr.github.io/TreeElement/myTreeView.css" type="text/css">
```
then
```
<script src="https://raw.githack.com/anhr/TreeElementNodeJS/master/build/treeElement.js"></script>
```
or
```
<script src="https://raw.githack.com/anhr/TreeElementNodeJS/master/build/treeElement.min.js"></script>
```
or you can import myTreeView from myTreeView.js file in your JavaScript module. [Example](https://raw.githack.com/anhr/TreeElementNodeJS/master/Examples/module/) [Code of example.](https://github.com/anhr/TreeElementNodeJS/tree/master/Examples/module)
```
import myTreeView from 'myTreeView.js';
```

Now you can use window.myTreeView for append of a Tree element into your web page.

* [myTreeView.createBranch( options )](#mytreeviewcreatebranch-options-) Create tree branch.
* [myTreeView.createTree( elTree, tree )](#mytreeviewcreatetree-eltree-tree-) Create tree.
* [myTreeView.onclickBranch( a )](#mytreeviewonclickbranch-a-) User has clicked a branch event.
* [myTreeView.onclickCloseBranch( event )](#mytreeviewonclickclosebranch-event-) User has closed a branch event.
* [myTreeView.onCloseBranchAnywhere( event )](#mytreeviewonclosebranchanywhere-event-) User has closed a branch event.
* [myTreeView.AddNewBranch( elTree, branch )](#mytreeviewaddnewbranch-eltree-branch-) Adds a new branch to the tree.
* [myTreeView.removeBranch( branchId, elTree )](#mytreeviewremovebranch-branchid-eltree-) Removes a branch from the tree.
* [myTreeView.removeAllBranches( elTree )](#mytreeviewremoveallbranches-eltree-) Removes all branch from the tree.

### myTreeView.createBranch( options )

Create tree branch.

**Returns**: <code>HTMLElement</code> - the tree branch element.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Followed options is available: |
| [options.name] | <code>String</code> | "" | The name of the branch. |
| [options.title] | <code>String</code> |  | The title of the tag of the TreeElement. |
| [options.tagName] | <code>String</code> |  | The name of the branch tag. |
| [options.className] | <code>String</code> |  | The className of branch tag. |
| [options.id] | <code>String</code> |  | The id of branch tag. |
| [options.treeViewTagName] | <code>String</code> | "span" | The name of tag of the TreeElement. |
|  |  |  |  |
| options.params | <code>Object</code> |  | Followed params is available: |
| options.params.createBranch | <code>Function</code> |  | function (). creates and returns the branch element. |
| [options.params.remember] | <code>String</code> |  | The name of the branch that was opened before closing the web page. This branch will be opened immediately after opening the web page. |
| [options.params.noBranchLeft] | <code>boolean</code> |  | true - margin-left of the branch is 0 and not 10 pixels. |
| [options.params.onOpenBranch] | <code>event</code> |  | function ( element ). event is user has opened a branch. element is the "treeView" class. |
| [options.params.onCloseBranch] | <code>event</code> |  | function ( element ). event is user has closed a branch. element is the "treeView" class. |
| [options.params.animate] | <code>boolean</code> |  | true - animate of open/closing of the branch. |
| [options.params.branchId] | <code>String</code> |  | Identifier of the branch. |
| [options.params.branch] | <code>String or Function</code> |  | The name of the branch or function () - creates and returns the branch element. |
| [options.params.tree] | <code>Object[]</code> |  | Array of branches. Each item of the tree array is options of the branch. |
| [options.params.scrollIntoView] | <code>boolean</code> |  | true - scroll the opened branch into the visible area of the browser window. |

**Example. Simple tree.**  
```
<div id="SimpleTree"></div>
<script type="text/javascript">
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
</script>
```

**Example. Open branch and close branch events.**  
```
<div id="SimpleTree2"></div>
<script type="text/javascript">
	document.getElementById( "SimpleTree2" ).appendChild( myTreeView.createBranch( {
		name: "Open Branch",
		params:
		{
			noBranchLeft: true,
			createBranch: function () {
				var el = document.createElement( "div" );
				el.innerText = "Branch";
				return el;
			},
			onOpenBranch: function ( a ) { a.querySelector( ".name" ).innerText = "Close Branch"; },
			onCloseBranch: function ( a ) { a.querySelector( ".name" ).innerText = "Open Branch"; }
		}
	} ) );
</script>
```

### myTreeView.createTree( elTree, tree )

Create tree.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elTree | <code>HTMLElement or string</code> |  | Parent element of the tree or class name of the new parent element. |
| tree | <code>Object[]</code> |  | Array of branches. Each item of the tree array is options of the branch. |
| [tree[].name] | <code>String</code> | "" | The name of the branch. |
| [tree[].branch] | <code>String or HTMLElement or Function</code> |  | The name of the branch or branch element or function () - creates and returns the branch element. |
| [tree[].animate] | <code>boolean</code> |  | true - animate of open/closing of the branch. |
| [tree[].title] | <code>String</code> |  | The title of the tag of the branch. |
| [tree[].tagName] | <code>String</code> | "div" | The name of the branch tag. |
| [tree[].tree] | <code>Object[]</code> |  | Array of child branches. Each item of the tree array is options of the branch. |
| [tree[].parentElement] | <code>String</code> |  | Id of the parentElement of the branch tag. A new branch can be not a child of the tree. Use the parentElement option if you want to create a branch anywhere on the web page. |
| [tree[].file] | <code>String</code> |  | The path to HTML file with code of the branch element. |
| [tree[].el] | <code>String</code> |  | The code of the branch element. |

**Example. Create tree.**  
```
<div id="ComplexTree"></div>
<script type="text/javascript">
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
</script>
```

### myTreeView.onclickBranch( a )

User has clicked a branch event.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| a | <code>HTMLElement</code> |  | The branch the user clicked on. |

### myTreeView.onclickCloseBranch( event )

User has closed a branch event.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>event</code> |  | event. |

### myTreeView.onCloseBranchAnywhere( event )

User has closed a branch event.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| event | <code>event</code> |  | event. |

### myTreeView.AddNewBranch( elTree, branch )

Adds a new branch to the tree.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elTree | <code>string or HTMLElement</code> |  | id of the tree element or tree element to which the new branch will be added. |
| branch | <code>Object</code> |  | New branch options. |
| [branch.name] | <code>string</code> |  | The name of the branch. You can use a branch function instead branch name. |
| [branch.branch] | <code>Function</code> |  | function () returns an element of the new branch. |
| [branch.branchId] | <code>string</code> |  | Identifier of the new branch. Uses for find and remove branch. |

### myTreeView.removeBranch( branchId, elTree )

Removes a branch from the tree.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| branchId | <code>string</code> |  | identifier of the branch for removing. See [myTreeView.AddNewBranch( elTree, branch )](#mytreeviewaddnewbranch-eltree-branch-) function for details. |
| elTree | <code>HTMLElement</code> |  | The tree element from which the branch will be removed. |

### myTreeView.removeAllBranches( elTree )

Removes all branch from the tree.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elTree | <code>HTMLElement</code> |  | The tree element from which all branches will be removed. |

## Directory Contents

```
└── build - Compiled source code.
```

## Building your own TreeElement

In the terminal, enter the following:

```
$ npm install
$ npm run build
```

## npm scripts

- npm run build - Build development and production version of scripts.


## On the following browsers have been successfully tested:

Windows 10

	IE 11

	Microsoft Edge 41

	Chrome 74

	Opera 60

	Safari 5.1.7 

	FireFox 56

Android 6.0.1

	Chrome 74

	Samsung Galaxy S5 Internet 9.2

	FireFox 67

	Opera 52

	Opera Mini 43

LG Smart tv

	Chrome 


## Thanks
The following libraries / open-source projects were used in the development of customController:
 * [Rollup](https://rollupjs.org)
 * [Node.js](http://nodejs.org/)

 ## Have a job for me?
Please read [About Me](https://anhr.github.io/AboutMe/).
