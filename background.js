
// require(init.js)
// require(storage_manager.js)


chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(tab) {
        updatePageIcon(tab);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    updatePageIcon(tab);
});


chrome.pageAction.onClicked.addListener(function(tab) {
    storageManager.toggleRead(tab.url);
    updatePageIcon(tab);
});

function updatePageIcon(tab) {
    storageManager.hasRead(tab.url, function(hasRead) {
        var iconInfo = {
                path: (hasRead ? 'checked.png' : 'mark.png'), 
                tabId: tab.id
            };
        chrome.pageAction.setIcon(iconInfo);
        chrome.pageAction.show(tab.id);
    });
}

chrome.commands.onCommand.addListener(function(command) {
    if (command == config.COMMAND_TOGGLE_READ) {
        chrome.tabs.query({active: true, currentWindow: true}, 
            function(tabs) {
                if (tabs.length > 0) {
                    var tab = tabs[0];
                    storageManager.toggleRead(tab.url);
                    updatePageIcon(tab);
                }
        });
    }
});