var READ_PAGE_KEY = "read_page_key";
var storage = chrome.storage.local;

var readPage;

function log(str) {
    // console.log(str);
}

var onStorageReady;

storage.get([READ_PAGE_KEY], function(item) {
    readPage = item[READ_PAGE_KEY];
    if (!readPage) {
        readPage = {};
        updateRead();
    }

    if (onStorageReady) {
        onStorageReady();
    }
});

function updateRead() {
    var data = {};
    data[READ_PAGE_KEY] = readPage;
    storage.set(data, function () {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else {
            log('Read pages has been updated');
        }
    });
}

function addRead(url) {
    url = formatUrl(url);
    var domainPages = readPage[url.domain];

    if (!domainPages) {
        domainPages = {};
        readPage[url.domain] = domainPages;
    }

    if (domainPages[url.origin]) {
        return;
    }

    domainPages[url.origin] = new Date() + "";

    updateRead();
}

function removeRead(url) {
    url = formatUrl(url);
    var domainPages = readPage[url.domain];

    if (domainPages) {
        delete domainPages[url.origin];
    }

    updateRead();
}

function hasRead(url) {
    url = formatUrl(url);
    var domainPages = readPage[url.domain];

    return ((!!domainPages) && (!!(domainPages[url.origin])));
}

function formatUrl(url) {
    url = url.replace(/#.+$/, '');
    var domain = url.split('/')[2];
    return {
        origin: url,
        domain: domain
    };
}




