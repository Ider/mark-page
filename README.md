# Mark Page #

This is a Chrome Extension used to mark a page with certain state.

Currently it only toggles the page to be marked as read, and in the each page 
the extension would look up the links to check if the link has been marked, if
so it put extra style to indicate it has been read.


## Install the extension ##

This project is still in very early age, so it's not yet available on Chrome 
store. You are welcome to download it from the repository, turn on the 
"Developer Mode" on your Chrome app, and try it out.

Please feel free to provide your feedback to improve this extension.

You can find the way turn on the "Developer Mode" belwo:
- [Introduction To Chrome Extension Development](http://blog.iderzheng.com/introduction-to-chrome-extension-development/)
- [How can I set up Chrome for extension development?](https://developer.chrome.com/extensions/faq#faq-dev-01)


## Mark Page as Read ##

After you installed this extension, you can find a checkbox in your Chrome 
toolbar. Simply click on the checkbox to toggle the read state of the page
you are visiting.

![Mark Page as Read](docs/mark-page-as-read.png?raw=true "Mark Page as Read")

When you marked page as read, the other pages in **the same domain** would 
display the indicators beside the links: "✓" for read page; "☞" for the page
anchor.

The read state is not visible on cross-domain page, because the purpose of this
extension is helping you when you are self-studying the online documents. You
mark the pages as read, so you know your progress.

The anchor mark is not visible until you mark a page in that domain as read,
which you indicate that you start to learn the documents.

## Option Menu ##

You can open the options page in Chrome "Manager Extensions" page

![Mark Page Options](docs/options-page.png?raw=true "Mark Page Options")


### View Read Pages ###

All marked pages are stored in the extension's local storage, you can visit
them in the option page, they are grouped by the domain:

![Read Pages](docs/read-pages.png?raw=true "Read Pages")

You can also download the progress as a json file, in case the Chrome clears
the extension data. 

### Manage Blackout Paths ###

The marked pages are domain based, however, there might be some paths you 
don't want to show the indicators, e.g: the forum, the data diagram.

For those cases, you can add the sub paths in the "Blackout Paths" list:

![Blackout Paths](docs/blackout-paths.png?raw=true "Blackout Paths")

The path in the certain domain would not show the indicator if it starts
with any blackout path.    
We will support wildcard in the future for more complicated situations.


## Keybard Shortcut ##
`Ctrl + R`: Toggle the read state of the page you are visitin


## FAQ ##
- How do I remove a domain if I accidentally mark a page as read?     
Right now we don't have a option to delete a domain, you can add "/" to the
blackout paths to that domain, so no indicators show.

- Can I import that read page json file?    
We will support the file import to update the progress cross different 
computers in future.     
The json file will also contain the blackout paths.

- Can I use specify the blackout path as "contains"?    
To be simply, it currently checks "starts with" only, we can support wildcard
in future.

- I only need the checkmark, I don't want to see the anchor indicate, can I
turn it off?    
Not yet, but we will make the options pages more friendly.

