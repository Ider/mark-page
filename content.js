
NodeList.prototype.forEach = Array.prototype.forEach;


onStorageReady = function() {
    var links = document.querySelectorAll('a'),
        windowUrl = formatUrl(window.location.href);

    links.forEach(function (a) {
        var url = formatUrl(a.href);
        if (url.origin == windowUrl.origin) {
            a.classList.add('this-page');
        } else if (hasRead(a.href)) {
            a.classList.add('read-page');
        }
    });
};

