# Freedesktop Destop Entry

This package allows you to read and write Desktop Entry files.

With this package you can;
* serialize the opened Desktop Entry files to JSON.
* make changes to entry file
* overwrite the orginal file or save to another location
* preserve comments

##### constructor
```JSON.parse(JSON.stringify(value)) ``` is used to clone passed object.

```javascript
module.exports = {
  "Desktop Entry": {
    "comment": "inline comment",
    "precedingComment": ["preceding multiline comment", "second line"],
    "entries": {
      "Type": { "value": "Application", "comment": "", "precedingComment": [] },
      "Name": { "value": "Foo Viewer", "comment": " inline comment", "precedingComment": ["precedingComment of an entry"] },
      "Exec": { "value": "fooview %F", "comment": "", "precedingComment": [] },
      "Icon": { "value": "fooview", "comment": "", "precedingComment": [] }
    }
  }
}

let desktopEntry = new DesktopEntry(obj);
let desktopEntry = new DesktopEntry("/usr/share/applications/DesktopEntry.desktop");
```

##### get JSON
```javascript
console.log(JSON.stringify(desktopEntry.JSON, null, 2));
```
##### setValue
"Categories=Network;WebBrowser" => "Categories=Game"
```javascript
desktopEntry.setValue("Desktop Entry", "Categories", "Game")
```

##### addValue
Adds value to entry: "Categories=Network;WebBrowser" => "Categories=Network;WebBrowser;Game"
```javascript
desktopEntry.addValue("Desktop Entry", "Categories", "Game")
```

##### setComment
```javascript
desktopEntry.setComment("Desktop Entry", "Exec", "Beware!!")
```

##### setPrecedingComment
```javascript
desktopEntry.setPrecedingComment("Desktop Entry", ["Comment preceding this entry", "Second line"])
```

##### save
Returns a promise
```javascript
desktopEntry.save()
```

##### saveTo
Returns a promise
```javascript
desktopEntry.saveTo("/new/path/newfile.desktop")
```

Used some parts of code from [node-file-parser](https://github.com/Skelware/node-file-parser)
