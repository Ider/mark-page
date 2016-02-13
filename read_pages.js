

(function(win) {
    var container = document.querySelector('#container');

    chrome.runtime.getBackgroundPage(function(bg) {
        bg.storageManager.getReadPages(function(pages) {
            generateReadPagesList(pages);
        });
    });

    function generateReadPagesList(readPages) {
        for (var domain in readPages){
            if (readPages.hasOwnProperty(domain)) {
                generateDomainPagesList(domain, readPages[domain]);
            }
        }

        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(readPages));

        var a = node('a');
            a.href = 'data:' + data;
            a.download = 'read_pages.json';
            a.text = 'download as JSON';
        container.appendChild(a);
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