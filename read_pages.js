

(function(win) {
    var container = document.querySelector('#container');
    
    var storageManager;

    chrome.runtime.getBackgroundPage(function(bg) {
        storageManager = bg.storageManager;
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
        var hasReadPage = false;

        for (var path in domainPages) {
            if (domainPages.hasOwnProperty(path)) {
                hasReadPage = true;
                var li = node('li'),
                    la = node('a');
                ul.appendChild(li);
                li.appendChild(la);
                la.href = "http://" + domain + path;
                la.text = path;
                la.target = LINK_TARGET;
            }
        }

        if (hasReadPage) {
            container.appendChild(ul);
        } else {
            var span = node('span');
            span.innerText = 'x';
            h2.appendChild(span);
        }

    }

    container.addEventListener("click", function(e){
        if (e.target.tagName != 'SPAN') return;

        var h2 = e.target.parentNode;
        var domain = h2.childNodes[0].innerText;
        storageManager.removeDomain(domain);
        container.removeChild(h2);
    });

    // Helper methods
    function node(tagName) {
        return document.createElement(tagName);
    }
})(window);