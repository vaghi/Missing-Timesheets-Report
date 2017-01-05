jQuery.sap.declare("HCMMissingTimesheets.views.Detail.Results.ChartView.GaugeChartHelper");

var GaugeChartHelper = {
	
	_chartId: "gaugeMissingHours",
	_gauge: null,
	_legend: "",
	
	buildGauge:function() {
		//inicializa
		GaugeChartHelper._legend = i18nTranslationHelper.getTranslation("MissingHours");
		//crea chart
		GaugeChartHelper._gauge = c3.generate({
    		bindto: "#" + GaugeChartHelper._chartId,
		    data: {
		        columns: [
		            [GaugeChartHelper._legend, 0]
		        ],
		        type: "gauge"
		    },
		    gauge: {
		        /*label: {
		            format: function(value, ratio) {
		                return value;
		            }
		            //show: false // to turn off the min/max labels.
		        },*/
			    min: 0,
			    max: 100,
			    //units: " " + unit,
			    width: 39 // for adjusting arc thickness
		    },
		    color: {
		    	pattern: ['#FF0000','#F6C600','#60B044'],
		        threshold: {
//		            unit: 'value', // percentage is default
//		            max: 200, // 100 is default
		            values: [90, 100]
		        }
		    },
		    // size: {
		    //     height: 180
		    // },
            transition: {
                duration: 1000
            }
		});
		GaugeChartHelper.updateGauge();
	},
	
	updateGauge: function() {
    	if (!GaugeChartHelper._gauge) {
    		return;
    	}
        //verifica modelo
        var model = sap.ui.getCore().byId("App").getModel("Results");
        if (!model) {
            return;
        }
        //toma datos
        var modelData = model.getData();
        var summary = modelData.Summary;
        var percentage = summary.TotalHours > 0 ? ((summary.TotalHours - summary.TotalMissingHours) / summary.TotalHours * 100).toFixed(1) : 0;
		//var percentage = (summary.TotalCompleted / summary.TotalHours * 100).toFixed(1);
		GaugeChartHelper._gauge.load({
	        columns: [
              	[GaugeChartHelper._legend, percentage],
	        ]
	    });
	},

	//fix para mal renderizado del gauge
	flushGauge: function() {
		GaugeChartHelper._gauge.flush();
	}
	
};