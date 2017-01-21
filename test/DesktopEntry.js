module.exports = {
  "Desktop Entry": {
    "comment": " inlineee",
    "precedingComment": "\n\n# normal comment\n",
    "entries": {
      "Version": {
        "value": "1.0",
        "comment": "",
        "precedingComment": ""
      },
      "Type": {
        "value": "Application",
        "comment": "",
        "precedingComment": ""
      },
      "Name": {
        "value": "Foo Viewer",
        "comment": " inline comment",
        "precedingComment": "# precedingComment of an entry\n"
      },
      "Comment": {
        "value": "The best viewer for Foo objects available!",
        "comment": "",
        "precedingComment": ""
      },
      "TryExec": {
        "value": "fooview",
        "comment": "",
        "precedingComment": ""
      },
      "Exec": {
        "value": "fooview %F",
        "comment": "",
        "precedingComment": ""
      },
      "Icon": {
        "value": "fooview",
        "comment": "",
        "precedingComment": ""
      },
      "MimeType": {
        "value": "image/x-foo",
        "comment": "",
        "precedingComment": ""
      },
      "Actions": {
        "value": [
          "Gallery",
          "Create"
        ],
        "comment": "",
        "precedingComment": ""
      }
    }
  },
  "Desktop Action Gallery": {
    "comment": "",
    "precedingComment": "\n",
    "entries": {
      "Exec": {
        "value": "fooview --gallery",
        "comment": "",
        "precedingComment": ""
      },
      "Name": {
        "value": "Browse Gallery",
        "comment": "",
        "precedingComment": ""
      }
    }
  },
  "Desktop Action Create": {
    "comment": "",
    "precedingComment": "\n",
    "entries": {
      "Exec": {
        "value": "fooview --create-new",
        "comment": "",
        "precedingComment": ""
      },
      "Name": {
        "value": "Create a new Foo!",
        "comment": "",
        "precedingComment": ""
      },
      "Icon": {
        "value": "fooview-new",
        "comment": "",
        "precedingComment": ""
      }
    }
  }
}
