let chai = require('chai');
let expect = chai.expect;
let DesktopEntry = require('freedesktop-desktop-entry');

let desktopFilePath = __dirname + "/DesktopEntry.desktop";
let obj = require("./DesktopEntry.js")

describe('DesktopEntry', function() {
  it('constructor() should encode to _rawData if an object passed in', function() {
    let desktopEntry = new DesktopEntry(obj);
    expect(desktopEntry._rawData).to.be.a("string");
  });

  it('constructor() should decode to JSON if a path passed in', function() {
    let desktopEntry = new DesktopEntry(desktopFilePath);
    expect(desktopEntry.JSON).to.be.a("object");
  });

  it('should have a _path variable if a path passed in to constructor()', function() {
    let desktopEntry = new DesktopEntry(desktopFilePath);
    expect(desktopEntry._path).to.exist;
  });

  it('should not have a _path variable if an object passed in to constructor()', function() {
    let desktopEntry = new DesktopEntry(obj);
    expect(desktopEntry._path).to.not.exist;
  });

  it('should have a _data variable', function() {
    let desktopEntry = new DesktopEntry(desktopFilePath);
    expect(desktopEntry._data).to.exist;
  });

  it('should have a _rawData variable if a path passed in to constructor()', function() {
    let desktopEntry = new DesktopEntry(desktopFilePath);
    expect(desktopEntry._rawData).to.exist;
  });

  it('setValue(group, key, value) should create key in group and set its value if doesnt exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setValue("Desktop Entry", "Keywords", "Game");
    expect(desktopEntry.JSON["Desktop Entry"].entries["Keywords"].value).to.equal("Game");
  });

  it('setValue(group, key, value) should change value of the key from group if it already exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setValue("Desktop Entry", "Name", "New Name");
    expect(desktopEntry.JSON["Desktop Entry"].entries["Name"].value).to.equal("New Name");
  });

  it('setComment(group, key, comment) should create key in group and set its comment if doesnt exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setComment("Desktop Entry", "Exec", "runs the app");
    expect(desktopEntry.JSON["Desktop Entry"].entries["Exec"].comment).to.equal("runs the app");
  });

  it('setComment(group, key, comment) should change comment of the key from group if it already exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setComment("Desktop Entry", "Name", "new comment");
    expect(desktopEntry.JSON["Desktop Entry"].entries["Name"].comment).to.equal("new comment");
  });

  it('setComment(group, comment) should create group and set its comment if doesnt exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setComment("Desktop Action Gallery", "group comment");
    expect(desktopEntry.JSON["Desktop Action Gallery"].comment).to.equal("group comment");
  });

  it('setComment(group, comment) should change comment of the group if it already exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setComment("Desktop Entry", "new group comment");
    expect(desktopEntry.JSON["Desktop Entry"].comment).to.equal("new group comment");
  });

  it('setPrecedingComment(group, key, comment) should create key in group and set its precedingComment if doesnt exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setPrecedingComment("Desktop Entry", "Exec",  "preceding comment");
    expect(desktopEntry.JSON["Desktop Entry"].entries["Exec"].precedingComment).to.equal("preceding comment");
  });

  it('setPrecedingComment(group, key, comment) should change precedingComment of the key from group if it already exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setPrecedingComment("Desktop Entry", "Name", "new preceding comment");
    expect(desktopEntry.JSON["Desktop Entry"].entries["Name"].precedingComment).to.equal("new preceding comment");
  });

  it('setPrecedingComment(group, comment) should create group and set its precedingComment if doesnt exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setPrecedingComment("Desktop Action Gallery", "preceding group comment");
    expect(desktopEntry.JSON["Desktop Action Gallery"].precedingComment).to.equal("preceding group comment");
  });

  it('setPrecedingComment(group, comment) should change precedingComment of the group if it already exists', function() {
    let desktopEntry = new DesktopEntry(obj);
    desktopEntry.setPrecedingComment("Desktop Entry", "new preceding group comment");
    expect(desktopEntry.JSON["Desktop Entry"].precedingComment).to.equal("new preceding group comment");
  });
});
