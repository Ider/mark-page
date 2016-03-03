// require(init.js)

(function(win) {
    var STORAGE_KEY_READ_PAGES = config.STORAGE_KEY_READ_PAGES,
        STORAGE_KEY_BLACKOUT_PATHS = config.STORAGE_KEY_BLACKOUT_PATHS,
        STORAGE_KEYS = [STORAGE_KEY_READ_PAGES, STORAGE_KEY_BLACKOUT_PATHS];

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

    /**
        blackoutPaths = {
            domain: {
                path: date_string,
            }
        }
    **/
    var blackoutPaths = null;
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

                this.blackoutPath(uri.domain, uri.path);
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
            if (readPages === null) {
                postAction(this.hasRead, url, callback);
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
        },

        getBlackoutPaths: function(callback) {
            if (blackoutPaths === null) {
                postAction(this.getBlackoutPaths, callback);
                return;
            }

            callback(blackoutPaths);
        },

        blackoutPath: function(domain, path) {
            if (blackoutPaths === null) {
                postAction(this.getBlackoutPaths, domain, path);
                return;
            }

            var pathList = blackoutPaths[domain];

            if (!pathList) {
                pathList = {}
                blackoutPaths[domain] = pathList;
            }
            if (path) {
                pathList[path] = new Date() + "";
            }

            updateBlackout();
        },

        lightupPath: function(domain, path) {
            if (blackoutPaths === null) {
                postAction(this.lightupPath, domain, path);
                return;
            }

            var pathList = blackoutPaths[domain];
            if (pathList) {
                delete pathList[path];
            }

            updateBlackout();
        }
    }
    /**
     * @params func, args_for_func...
     */
    function postAction() {
        var args = arguments,
            func = args[0];
        args.shift();
        loadStorage(function() {
            func.apply(storageManager, args);
        });
    }

    function loadStorage(callback) {
        storage.get(STORAGE_KEYS, function(item) {
            // prevent from multiple get
            if (readPages === null) {
               readPages = item[STORAGE_KEY_READ_PAGES];
                if (!readPages) {
                    readPages = {};
                    updateRead();
                }
            }

            if (blackoutPaths === null) {
                blackoutPaths = item[STORAGE_KEY_BLACKOUT_PATHS];
                if (!blackoutPaths) {
                    blackoutPaths = {};
                    updateBlackout();
                }
            }

            if (callback) {
                callback();
            }
        });
    }

    function updateRead() {
        updateStorage(STORAGE_KEY_READ_PAGES, readPages);
    }

    function updateBlackout() {
        updateStorage(STORAGE_KEY_BLACKOUT_PATHS, blackoutPaths);
    }

    function updateStorage(key, info) {
        var data = {};
        data[key] = info;
        storage.set(data, function () {
            if (chrome.runtime.lastError) {
                log.e(chrome.runtime.lastError);
            } else {
                log.i(key + ' has been updated');
            }
        });
    }

    loadStorage();
    win.storageManager = storageManager;
})(window);



