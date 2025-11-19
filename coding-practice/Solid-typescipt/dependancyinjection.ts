interface Database {
    save(data: string): void;
}

class MySQLDatabase implements Database {
    save(data: string) {
        console.log(`Saving ${data} to MySQL`);
    }
}

class MongoDatabase implements Database {
    save(data: string) {
        console.log(`Saving ${data} to MongoDB`);
    }
}

class UserService1 {
    constructor(private db: Database) { }

    addUser(user: string) {
        this.db.save(user);
    }
}

// Usage
const service = new UserService1(new MySQLDatabase());
service.addUser("Tarun");
