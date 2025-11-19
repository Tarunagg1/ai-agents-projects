interface DocumentElement {
    render(): string;
}


class TextElement implements DocumentElement {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    render(): string {
        return this.text;
    }
}

class ImageElement implements DocumentElement {
    private image: string;

    constructor(text: string) {
        this.image = text;
    }

    render(): string {
        return `[Image: ${this.image}`;
    }

}

// NewLineElement represents a line break in the document.
class NewLineElement implements DocumentElement {
    render(): string {
        return "\n";
    }
};

// NewLineElement represents a line break in the document.
class TabSpaceElement implements DocumentElement {
    render(): string {
        return "\n";
    }
};





class Documentt {
    private documentElements: DocumentElement[] = [];

    addElement(ele: DocumentElement) {
        this.documentElements.push(ele)
    }

    renderDocument(): string {
        let result: string = "";

        for (const element of this.documentElements) {
            result += element.render();
        }
        return result;
    }
}


interface Persistence {
    save(data: string): void;
}



class DBStorage implements Persistence {
    save(data: string) {
        console.log("Saved in db");

    }
}



class FileStorage implements Persistence {
    save(data: string) {
        console.log("Saved in file");

    }
}



class DocumentEditor {
    // private document: Documentt;
    // private persistence: Persistence;
    private renderedDocument: string = "";

    constructor(private document: Documentt, private persistence: Persistence) { }

    addText(text: string) {
        this.document.addElement(new TextElement(text));
    }

    addImage(text: string) {
        this.document.addElement(new ImageElement(text));
    }


    addNewLine() {
        this.document.addElement(new NewLineElement());
    }


    addTabSpace() {
        this.document.addElement(new TabSpaceElement());
    }



    renderDocument(): string {
        if (!this.renderedDocument) {
            this.renderedDocument = this.document.renderDocument();
        }
        return this.renderedDocument;
    }

    saveDcoument() {
        this.persistence.save(this.renderDocument())
    }
}


function main() {
    const newDoc = new Documentt();
    const persistence = new FileStorage();


    const editore = new DocumentEditor(newDoc, persistence);

    editore.addText("Hello, world!")
    editore.addNewLine()
    editore.addImage("Real workd image")

    console.log(editore.renderDocument());

    editore.saveDcoument()
}

main()