


(function(win) {
    var container = document.querySelector('#domains_list_container');

    var blackoutPaths;

    chrome.runtime.getBackgroundPage(function(bg) {
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

    function generateDomainPagesList(domain, domainPages) {
        var LINK_TARGET = '_blank';
        var h2 = node('h2'),
            ha = node('a');
        container.appendChild(h2);
        h2.appendChild(ha);
        ha.href = "http://" + domain;
        ha.text = domain;
        ha.target = LINK_TARGET

        var ul = node('ul');
        container.appendChild(ul);

        for (var path in domainPages) {
            if (domainPages.hasOwnProperty(path)) {
                var li = node('li'),
                    la = node('a');
                ul.appendChild(li);
                li.appendChild(la);
                la.href = "http://" + domain + path;
                la.text = path;
                la.target = LINK_TARGET;
            }
        }
    }

    // Helper methods
    function node(tagName) {
        return document.createElement(tagName);
    }
})(window);