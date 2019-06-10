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
or you can import myTreeView from myTreeView.js file in your JavaScript module. [Code example.](https://github.com/anhr/TreeElementNodeJS/tree/master/Examples/module)
```
import myTreeView from 'myTreeView.js';
```

Now you can use window.myTreeView for append of a Tree element into your web page.

### myTreeView.createBranch( options )

Create tree branch.

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

**Example**  

 * @param {Object} options followed options is available
 * @param {string} [options.name] name of the branch. Optional. Default is empty name
 * @param {string} [options.title] title of the tag of the TreeElement. Optional. Default is empty title
 * @param {string} [options.tagName] name of the branch tag. Optional. Default is div
 * @param {string} [options.className] className of tag of the branchremember className
 * @param {string} [options.id] id of tag of the branch. Optional. Default is empty id
 * @param {string} [options.treeViewTagName] name of tag of the TreeElement. Optional. Default is span
 * 
 * @param {Object} options.params followed params is available
 * @param {Function} options.params.createBranch function (). creates and returns the branch element
 * @param {string} [options.params.remember] the name of the branch that was opened before closing the web page.
 * This branch will be opened immediately after opening the web page.
 * Optional. Default is empty - not remember
 * @param {boolean} [options.params.noBranchLeft] true - do not shift the tree branch to left to the 10 pixels in your web page.
 * Optional. Default - shift the tree branch to left to the 10 pixels
 * @param {onBranchEvent} [options.params.onOpenBranch] function ( a ). event is user has opened a branch. Optional.
 * @param {onBranchEvent} [options.params.onCloseBranch] function ( a ). event is user has closed a branch. Optional.
 * @param {boolean} [options.params.animate] true - animate of open/closing of the branch. Optional. Default is undefined
 * @param {string} [options.params.branchId] identifier of the branch. Optional.
 * @param {string|Function} [options.params.branch] name of the branch or function () - creates and returns the branch element. Optional.
 * @param {branchOptions[]} [options.params.tree] array of branches. Each item of the tree array is options of the branch. Optional.
 * @param {boolean} [options.params.scrollIntoView] true - Scroll the opened branch into the visible area of the browser window.
 * Optional. Default is not scrolling
 *
 * @returns tree branch element


Examples.
```
	element
```

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
