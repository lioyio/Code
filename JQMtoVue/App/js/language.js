function LoadLanguage(lag) {
	var lgpack = ((!gVar['lgpack'] || (gVar['lgpack']=="normal"))?"":("_"+gVar['lgpack']));
	gVar.Ajax({
		type: "GET",
		url: "./lg"+lgpack+"/" + lag + "/strings.xml",
		suc: function success(data, state) {
            jQuery(data).children().each(function () {
                lg[jQuery(this).attr("name")] = jQuery(this).text();
            });
		},
		err: function(data, state) {
			//ShowDebugView("can't find the " + lag + "'s xml!");
			LoadLanguage('en');
		}
	})
}