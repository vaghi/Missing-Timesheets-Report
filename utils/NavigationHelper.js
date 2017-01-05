jQuery.sap.declare("HCMMissingTimesheets.utils.NavigationHelper");

NavigationHelper = {

    _appId: "app",
    _app: null,

    _getPageName: function (pageId)
    {
        var pageParts = pageId.split(".");
        return pageParts[pageParts.length - 1];
    },

    _getPageInstance: function (pageId, pageName, isMaster)
    {
        //verifica si ya instancio esa pagina
        var view = sap.ui.getCore().byId(pageName);
        if (!view)
        {
            //creates view
            view = sap.ui.jsview(pageName, pageId);
            //adds view to split app
            sap.ui.getCore().byId(this._appId).addPage(view, isMaster);
        }
        return view;
    },

    //options: objeto con pageId, context, model, transitionName
    to: function (options)
    {
        var pageName = this._getPageName(options.pageId);
        var isMaster = (options.isMaster !== undefined) ? options.isMaster : false;
        //gets view
        var view = this._getPageInstance(options.pageId, pageName, isMaster);
        //modelo
        if (options.model)
        {
            view.setModel(options.model);
        }
        //contexto
        if (options.context)
        {
            view.setBindingContext(options.context);
        }
        //navigates
        sap.ui.getCore().byId(this._appId).to(pageName, options.transitionName);
    },

    destroyPage: function (pageId)
    {
        var view = sap.ui.getCore().byId(pageId);
        //destruye vista
        view.destroy();
    },

    back: function (pageName, destroy)
    {
        //pagina actual
        var currentPageId = sap.ui.getCore().byId(this._appId).getCurrentPage().getId();
        //back
        sap.ui.getCore().byId(this._appId).backToPage(pageName);
        //se fija si debe eliminar la pagina actual
        if (destroy)
            this.destroyPage(currentPageId);
    },

    AttachNavToTable: function()
    {
        var resultsController = sap.ui.getCore().byId("Results").getController();

        var objs = document.getElementsByClassName("navToTable");
        
        var charts = document.getElementById("Results").getElementsByClassName("c3-arc");

        for(var i = 0; i < objs.length; i++)
        {
            objs[i].addEventListener('click', function (event) {
                resultsController.onShowTableView();
            });
        }

        for(var i = 0; i < charts.length; i++)
        {
            charts[i].addEventListener('click', function (event) {
                resultsController.onShowTableView();
            });
        }
    }
};