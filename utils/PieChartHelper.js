jQuery.sap.declare("HCMMissingTimesheets.views.Detail.Results.ChartView.PieChartHelper");

var PieChartHelper = {

    _chartControlId: "pieChart",
    _chart: null,

    _title: null,
    _missingLegend: null,
    _underDayLegend: null,
    _underLegend: null,

    buildChart: function ()
    {
        //inicializa
        PieChartHelper._title = i18nTranslationHelper.getTranslation("MissingHours");
        PieChartHelper._missingLegend = i18nTranslationHelper.getTranslation("Missing");
        PieChartHelper._underDayLegend = i18nTranslationHelper.getTranslation("UnderDay");
        PieChartHelper._underLegend = i18nTranslationHelper.getTranslation("Under");
        //crea chart
        PieChartHelper._chart = c3.generate({
            bindto: "#" + PieChartHelper._chartControlId,
            data: {
                type: "donut",
                columns: [
		            [PieChartHelper._missingLegend, 0],
		            [PieChartHelper._underDayLegend, 0],
		            [PieChartHelper._underLegend, 0]
                ]
            },
            donut: {
                title: PieChartHelper._title
            },
            color: {
                pattern: ["#2C2C2C", "#F04D4C", "#FFA938"]
            },

            transition: {
                duration: 1000
            },
            
        });
        PieChartHelper.updateData();
    },

    updateData: function ()
    {
        //verifica que este el grafico creado
        if (!PieChartHelper._chart)
            return;
        //obtiene datos
        var model = sap.ui.getCore().byId("App").getModel("Results");
        var summary = model.getData().Summary;

        //actualiza chart
        PieChartHelper._chart.load({
            columns: [
                [PieChartHelper._missingLegend, summary.Digest[0].Value],
                [PieChartHelper._underDayLegend,  summary.Digest[1].Value],
                [PieChartHelper._underLegend,  summary.Digest[2].Value]
            ]
        });

        var pieChart = sap.ui.getCore().byId(PieChartHelper._chartControlId);

        if(!summary.TotalMissingHours > 0)
            pieChart.addStyleClass("invisible");
        else
            if (pieChart.hasStyleClass("invisible"))
                pieChart.removeStyleClass("invisible");
    }

};
