let chai = require('chai');
let expect = chai.expect;
let DesktopEntry = require('freedesktop-desktop-entry');

let desktopFilePath = __dirname + "/DesktopEntry.desktop";
let obj = {
  'Desktop Entry': {
    comment: "",
    precedingComment: "",
    entries: {
      'Name': {value: "Test App", comment: "", precedingComment: ""}
    }
  }
}

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
});
