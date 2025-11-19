var TextElement = /** @class */ (function () {
    function TextElement(text) {
        this.text = text;
    }
    TextElement.prototype.render = function () {
        return this.text;
    };
    return TextElement;
}());
var ImageElement = /** @class */ (function () {
    function ImageElement(text) {
        this.image = text;
    }
    ImageElement.prototype.render = function () {
        return "[Image: ".concat(this.image);
    };
    return ImageElement;
}());
// NewLineElement represents a line break in the document.
var NewLineElement = /** @class */ (function () {
    function NewLineElement() {
    }
    NewLineElement.prototype.render = function () {
        return "\n";
    };
    return NewLineElement;
}());
;
// NewLineElement represents a line break in the document.
var TabSpaceElement = /** @class */ (function () {
    function TabSpaceElement() {
    }
    TabSpaceElement.prototype.render = function () {
        return "\n";
    };
    return TabSpaceElement;
}());
;
var Documentt = /** @class */ (function () {
    function Documentt() {
        this.documentElements = [];
    }
    Documentt.prototype.addElement = function (ele) {
        this.documentElements.push(ele);
    };
    Documentt.prototype.renderDocument = function () {
        var result = "";
        for (var _i = 0, _a = this.documentElements; _i < _a.length; _i++) {
            var element = _a[_i];
            result += element.render();
        }
        return result;
    };
    return Documentt;
}());
var DBStorage = /** @class */ (function () {
    function DBStorage() {
    }
    DBStorage.prototype.save = function (data) {
        console.log("Saved in db");
    };
    return DBStorage;
}());
var FileStorage = /** @class */ (function () {
    function FileStorage() {
    }
    FileStorage.prototype.save = function (data) {
        console.log("Saved in file");
    };
    return FileStorage;
}());
var DocumentEditor = /** @class */ (function () {
    function DocumentEditor(document, persistence) {
        this.document = document;
        this.persistence = persistence;
        // private document: Documentt;
        // private persistence: Persistence;
        this.renderedDocument = "";
    }
    DocumentEditor.prototype.addText = function (text) {
        this.document.addElement(new TextElement(text));
    };
    DocumentEditor.prototype.addImage = function (text) {
        this.document.addElement(new ImageElement(text));
    };
    DocumentEditor.prototype.addNewLine = function () {
        this.document.addElement(new NewLineElement());
    };
    DocumentEditor.prototype.addTabSpace = function () {
        this.document.addElement(new TabSpaceElement());
    };
    DocumentEditor.prototype.renderDocument = function () {
        if (!this.renderedDocument) {
            this.renderedDocument = this.document.renderDocument();
        }
        return this.renderedDocument;
    };
    DocumentEditor.prototype.saveDcoument = function () {
        this.persistence.save(this.renderDocument());
    };
    return DocumentEditor;
}());
function main() {
    var newDoc = new Documentt();
    var persistence = new FileStorage();
    var editore = new DocumentEditor(newDoc, persistence);
    editore.addText("Hello, world!");
    editore.addNewLine();
    editore.addImage("Real workd image");
    console.log(editore.renderDocument());
    editore.saveDcoument();
}
main();
