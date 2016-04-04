


(function(win) {
    var container = document.querySelector('#domains_list_container'),
        pathsTitle = document.querySelector('#blackout_paths_title');


    var addPathContainer = document.querySelector('#add_path_container'),
        inputPath = document.querySelector('#input_path'),
        buttonAdd = document.querySelector('#button_add_path');

    var pathList = document.querySelector('#blackout_paths_list');

    var storageManager,
        blackoutPaths;

    var currentDomain;

    chrome.runtime.getBackgroundPage(function(bg) {
        storageManager = bg.storageManager;
        bg.storageManager.getBlackoutPaths(function(paths) {
            blackoutPaths = paths;
            generateDomainList(paths);
        });
    });

    function generateDomainList(readPages) {
        var ul = node('ul');
        container.appendChild(ul);
        for (var domain in readPages){
            if (readPages.hasOwnProperty(domain)) {
                var li = node('li');
                ul.appendChild(li);
                li.innerText = domain;
            }
        }
    }

    function generatePathList(domain, domainPaths) {
        pathsTitle.innerText = domain;
        pathList.innerHTML = '';

        for (var path in domainPaths) {
            if (domainPaths.hasOwnProperty(path)) {
                addBlackoutPathToList(path);
            }
        }
    }

    function addBlackoutPathToList(path) {
        if (!currentDomain) return;

        var li = node('li');
        pathList.appendChild(li);
        li.innerText = path;

        var span = node('span');
        span.innerText = 'x';
        li.appendChild(span);
    }

    container.addEventListener("click", function(e){
        if (e.target.tagName != 'LI') return;

        var domain = e.target.innerText;
        generatePathList(domain, blackoutPaths[domain]);
        currentDomain = domain;
    });

    pathList.addEventListener('click', function(e) {
        if (e.target.tagName != 'SPAN') return;

        var li = e.target.parentNode;
        var path = li.childNodes[0].nodeValue;
        storageManager.lightupPath(currentDomain, path);
        pathList.removeChild(li);
    })

    buttonAdd.addEventListener('click', function(e) {
        var path = inputPath.value;

        if (path.charAt(0) != '/') {
            path = '/' + path;
        }
        storageManager.blackoutPath(currentDomain, path);
        addBlackoutPathToList(path);
    });

    // Helper methods
    function node(tagName) {
        return document.createElement(tagName);
    }
})(window);