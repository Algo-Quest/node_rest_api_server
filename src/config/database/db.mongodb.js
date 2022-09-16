class MongoDbConfig {
    constructor() {
        this.databaseName = process.env.DATABASE_NAME;
        this.databasePort = process.env.DATABASE_PORT;
        this.databaseURL = process.env.DATABASE_URL;
    }
}

export { MongoDbConfig };
