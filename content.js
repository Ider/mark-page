// require(init.js)

NodeList.prototype.forEach = Array.prototype.forEach;

(function(win) {
    var key = config.STORAGE_KEY_READ_PAGES,
        storage = chrome.storage.local,
        winUri = formatUrl(window.location.href);

    storage.get([key], function(item) {
        var readPages = item[key];
        var domainPages = readPages && readPages[winUri.domain];
        if (domainPages) {
            setupLinks(domainPages);
        }
    });

    function setupLinks(domainPages) {
        var links = document.querySelectorAll('a');
        links.forEach(function (a) {
            var uri = formatUrl(a.href);
            if (winUri.domain == uri.domain) {
                if (winUri.path == uri.path) {
                    a.classList.add('ider-mark-this-page');
                } else if (domainPages[uri.path]) {
                    a.classList.add('ider-mark-read-page');
                }
            }
        });
    }
})(window);