jQuery.sap.declare("HCMMissingTimesheets.utils.TreeHelper");

TreeHelper = {
	nodeId: "Orgeh",
	nodeDesd: "OrgehT",
	nodeParent: "OrgehSup",
	nodeAll: "Orgtx",
		
	loadTreeModel: function(idTree, model)
	{
		var tree = sap.ui.getCore().byId(idTree);
		
		//var sortedModel = TreeHelper.sortModel(model);
		var sortedModel = model;
    	 
    	for(var i in sortedModel)
		{
    		if(sortedModel[i][TreeHelper.nodeAll])
			{
    			tree.addNode(new sap.ui.commons.TreeNode(sortedModel[i][TreeHelper.nodeAll], {text:sortedModel[i][TreeHelper.nodeAll], expanded: true}));
    			continue;
			}
    			
    		if(!TreeHelper.treeContainsNode(tree, sortedModel[i]))
    			//se agrega 'n' al id ya que no permite id numerico
    			tree.addNode(new sap.ui.commons.TreeNode("n" + sortedModel[i][TreeHelper.nodeId], {text:sortedModel[i][TreeHelper.nodeDesd], expanded: true}));
		};
		
		tree.collapseAll();
    	tree.setBusy(false);
	},
	
	sortModel: function(model)
	{
		var retModel = TreeHelper.insertAllNode(model);
		retModel.push(TreeHelper.insertMasterNode(model));
		
		TreeHelper.insertChildNodes(model,retModel);
		
		return retModel;
	},
	
	insertAllNode: function(origModel)
	{
		for(var m in origModel)
		{
			if(origModel[m][TreeHelper.nodeAll])
				return origModel.splice(m,1);
		}
	},
	
	insertMasterNode: function(origModel)
	{
		for(var m in origModel)
		{
			if(origModel[m][TreeHelper.nodeId].indexOf("60000000") > -1)
				return origModel.splice(m,1)[0];
		}
	},
	
	insertChildNodes: function(model, retModel)
	{
		for(var rm in retModel)
		{
			for(var m in model)
			{
				if(retModel[rm][TreeHelper.nodeId].indexOf(model[m][TreeHelper.nodeParent]) > -1)
					retModel.push(model.splice(m,1)[0]);
			}
		}
		
		if(model.length == 0)
			return true;
		else
		{
			TreeHelper.insertChildNodes(model, retModel);
		}
	},
	
	treeContainsNode: function(tree, node)
	{
		var nodes = tree.getNodes();
		var nId = "n" + node[TreeHelper.nodeParent];
		for(var n in nodes)
		{
			if(nodes[n].sId == nId)
			{
				nodes[n].addNode(new sap.ui.commons.TreeNode("n" + node[TreeHelper.nodeId], {text:node[TreeHelper.nodeDesd], expanded: true}));
				return true;
			}
			else if(nodes[n].getNodes().length > 0 && TreeHelper.treeContainsNode(nodes[n], node))
			{
				return true;
			}
		}
		
		return false;
	},

	recursiveSearch: function(id, treeNodes)
	{
		for(var n in treeNodes)
		{
			if(treeNodes[n].getText().toUpperCase().indexOf(id) > -1)
				return treeNodes[n];
				
			if(treeNodes[n].getNodes().length > 0)
			{
				var node = TreeHelper.recursiveSearch(id, treeNodes[n].getNodes());
				if(node)
					return node;
			}
		}
		
		return false;
	}
};
