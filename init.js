

(function(win) {
    // TODO: Create NOP log for production
    var log = {
        d: function(str) {
            console.debug(str);
        },
        e: function(str) {
            console.error(str);
        },
        i: function(str) {
            console.info(str)
        },
        v: function(str) {
            console.log(str);
        },
        w: function(str) {
            console.warn(str);
        }
    };
    win.log = log;

    // URL to URI formatter
    var linkNode = document.createElement("a");
    win.formatUrl = function(url) {
        if (!url) {
            return {
                scheme: '',
                domain: '',
                path: '',
            }
        }
        
        linkNode.href = url;
        return {
            scheme: linkNode.protocol,
            domain: linkNode.hostname,
            path: linkNode.pathname,
            // TODO: add query/fragment
        }
    }

    win.config = {
        STORAGE_KEY_READ_PAGES: "key_read_pages",
        COMMAND_TOGGLE_READ: "command-toggle-read",
    };
})(window);