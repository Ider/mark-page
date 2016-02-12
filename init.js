


(function (win) {
	// TODO: Create NOP log for production
	var log = {
		e: function(str) {
			console.error(str);
		},
		d: function(str) {
			console.debug(str);
		},
		v: function(str) {
			console.log(str);
		}
	}
	win.log = log;

	// URL to URI formatter
	var linkNode = document.createElement("a");
	win.formatUrl = function(url) {
		linkNode.href = url;
		return {
			scheme: linkNode.protocol,
			domain: linkNode.hostname,
			path: linkNode.pathname,
			// TODO: add query/fragment
		}
	}
})(window);