interface FileSystemItem {
    ls(): void;
    openAll(): void;
    getSize(): number;
    FileSystemItem(name: string): void | null;
    getName(): string;
    isFolder(): boolean;
}


class File implements FileSystemItem {
    name: string;
    size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }

    ls(): void {
        console.log(` ${name} `);
    }

    openAll(): void {
        console.log(` ${name} `);
    }

    getSize(): number {
        return this.size;
    }

    FileSystemItem(name: string): void | null {
        return null;
    }

    getName(): string {
        return this.name
    }

    isFolder(): boolean {
        return false;
    }

}


class Folder implements FileSystemItem {
    name: string;
    childrens: FileSystemItem[] = []

    constructor(name: string) {
        this.name = name;
    }

    add(item: FileSystemItem) {
        this.childrens.push(item)
    }

    ls(): void {
        for (const child of this.childrens) {
            if (child.isFolder()) {
                console.log(` folder-${child.getName()} `);
            } else {
                console.log(` file-${child.getName()} `);
            }
        }
    }

    openAll(): void {
        console.log(` ${this.name} `);
        for (const element of this.childrens) {
            element.openAll()
        }
    }

    getSize(): number {
        let total: number = 0;

        for (const element of this.childrens) {
            total += element.getSize();
        }

        return total
    }

    FileSystemItem(name: string): void | null {
        for (const child of this.childrens) {
            if (this.isFolder() && child.getName() == name) {
                return null
            }
        }
        return null
    }

    getName(): string {
        return this.name;
    }

    isFolder(): boolean {
        return true
    }

}

