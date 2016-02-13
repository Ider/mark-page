// require(init.js)

(function(win) {
    var STORAGE_KEY_READ_PAGES = config.STORAGE_KEY_READ_PAGES;

    var storage = chrome.storage.local;

    /** 
        readPages = { 
            domain: {
                path: date_string,
                ... ...
            }
            ... ...
        }
    **/
    var readPages = null;
    var storageManager = {
        addRead: function(url) {
            if (readPages === null) {
                postAction(this.addRead, url);
                return;
            }

            var uri = formatUrl(url),
                domainPages = readPages[uri.domain];
            if (!domainPages) {
                domainPages = {};
                readPages[uri.domain] = domainPages;
            }

            if (domainPages[uri.path]) {
                return;
            }

            domainPages[uri.path] = new Date() + "";

            updateRead();
        },

        removeRead: function(url) {
            if (readPages === null) {
                postAction(this.removeRead, url);
                return;
            }

            var uri = formatUrl(url),
                domainPages = readPages[uri.domain];

            if (domainPages) {
                delete domainPages[uri.path];
            }

            updateRead();
        },

        toggleRead: function(url) {
            if (readPages === null) {
                postAction(this.toggleRead, url);
                return;
            }

            if (this.hasRead(url)) {
                this.removeRead(url);
            } else {
                this.addRead(url);
            }
        },

        hasRead: function(url, callback) {
            var outthis = this;
            if (readPages === null) {
                loadStorage(function() {
                    outthis.hasRead(url, callback);
                });
                return;
            }
            var uri = formatUrl(url),
                domainPages = readPages[uri.domain];

            var hasRead = ((!!domainPages) && (!!(domainPages[uri.path])));
            if (callback) {
                callback(hasRead);
            } else {
                return hasRead;
            }
        },

        getReadPages: function(callback) {
            if (readPages === null) {
                postAction(this.getReadPages, callback);
                return;
            }

            callback(readPages);
        }
    }


    function postAction(func, arg) {
        loadStorage(function() {
            func.call(storageManager, arg);
        });
    }

    function loadStorage(callback) {
        var key = STORAGE_KEY_READ_PAGES;
        storage.get([key], function(item) {
            // prevent from multiple get
            if (readPages === null) {
               readPages = item[key];
                if (!readPages) {
                    readPages = {};
                    updateRead();
                }

                if (callback) {
                    callback();
                }
            }
        });
    }

    function updateRead() {
        var data = {};
        data[STORAGE_KEY_READ_PAGES] = readPages;
        storage.set(data, function () {
            if (chrome.runtime.lastError) {
                log.e(chrome.runtime.lastError);
            } else {
                log.i('Read pages has been updated');
            }
        });
    }

    loadStorage();
    win.storageManager = storageManager;
})(window);



