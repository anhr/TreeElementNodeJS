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

## Simple tree 

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
