/**
 * node.js module version of the TreeElement
 * 
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

import { createBranch, createTree, onclickBranch, onclickCloseBranch, onCloseBranchAnywhere, AddNewBranch, removeBranch, removeAllBranches } from './index.js';

export default myTreeView = {

	createBranch: createBranch,
	createTree: createTree,
	onclickBranch: onclickBranch,
	onclickCloseBranch: onclickCloseBranch,
	onCloseBranchAnywhere: onCloseBranchAnywhere,
	AddNewBranch: AddNewBranch,
	removeBranch: removeBranch,
	removeAllBranches: removeAllBranches

}
