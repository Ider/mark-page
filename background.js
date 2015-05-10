
var lastTab = 0;

chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(tab) {
        lastTab = tab;
        updatePageIcon(tab);
        log('onActivated');
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  lastTab = tab;
  updatePageIcon(tab);
  log('onUpdated');
});


var curTab;
chrome.pageAction.onClicked.addListener(function(tab) {
    curTab = tab;
    if (hasRead(tab.url)) {
        removeRead(tab.url);
    } else {
        addRead(tab.url);
    }
    updatePageIcon(tab);
});


function updatePageIcon(tab) {
    var iconInfo = {path: "", tabId: tab.id};
    iconInfo.path = hasRead(tab.url)? 'checked.png' : 'mark.png';
    chrome.pageAction.setIcon(iconInfo);
    chrome.pageAction.show(tab.id);
}