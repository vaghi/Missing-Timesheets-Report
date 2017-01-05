jQuery.sap.require("HCMMissingTimesheets.utils.GaugeChartHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.PieChartHelper");

sap.ui.controller("HCMMissingTimesheets.views.Detail.Results.ChartView.ChartView", {

    onAfterRendering: function ()
    {
    	//crea gauge para status
    	GaugeChartHelper.buildGauge();
        //crea chart para status
        PieChartHelper.buildChart();
        
        //crea la navegación hacia la tabla
        NavigationHelper.AttachNavToTable();
        
        StyleHelper.updateTextSize();
    },

    updateCharts: function ()
    {
        PieChartHelper.updateData();
        GaugeChartHelper.updateGauge();
    }
});
