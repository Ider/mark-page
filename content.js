// require(init.js)

NodeList.prototype.forEach = Array.prototype.forEach;

(function(win) {
    var STORAGE_KEY_READ_PAGES = config.STORAGE_KEY_READ_PAGES,
        STORAGE_KEY_BLACKOUT_PATHS = config.STORAGE_KEY_BLACKOUT_PATHS,
        STORAGE_KEYS = [STORAGE_KEY_READ_PAGES, STORAGE_KEY_BLACKOUT_PATHS];

    var storage = chrome.storage.local,
        winUri = formatUrl(window.location.href);

    storage.get(STORAGE_KEYS, function(item) {
        var blackoutPath = item[STORAGE_KEY_BLACKOUT_PATHS],
            blackList = blackoutPath[winUri.domain],
            path = winUri.path;

        for (var blackPath in blackList) {
            if (path.startsWith(blackPath)) {
                return;
            }
        }

        var readPages = item[STORAGE_KEY_READ_PAGES],
            domainPages = readPages && readPages[winUri.domain];
        if (domainPages) {
            setupLinks(domainPages);
        }
    });

    function setupLinks(domainPages) {
        var links = document.querySelectorAll('a');
        links.forEach(function (a) {
            var uri = formatUrl(a.href);
            if (winUri.domain == uri.domain) {
                if (domainPages[uri.path]) {
                    a.classList.add('ider-mark-read-page');
                }
            }
        });
    }
})(window);