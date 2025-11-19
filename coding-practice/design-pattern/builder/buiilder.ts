class URLBuilder {
    private protocol: string = "http";
    private domain: string = "";
    private port?: number;
    private path: string = "";
    private queryParams: Record<string, string> = {};


    setProtocol(protocol: string): URLBuilder {
        this.protocol = protocol;
        return this;
    }

    setDomain(domain: string): URLBuilder {
        this.domain = domain;
        return this;
    }

    setPort(port: number): URLBuilder {
        this.port = port;
        return this;
    }

    setPath(path: string): URLBuilder {
        this.path = path;
        return this;
    }

    addQueryParam(key: string, value: string): URLBuilder {
        this.queryParams[key] = value;
        return this;
    }

    build(): string {
        let url = `${this.protocol}://${this.domain}`;

        if (this.port) {
            url += `:${this.port}`;
        }

        if (this.path) {
            url += `/${this.path}`;
        }

        Object.entries(this.queryParams).forEach((data, index) => {
            const [key, value] = data;
            url += `${index === 0 ? '?' : '&'}${key}=${value}`;
        });

        return url;
    }

}



const url = new URLBuilder()
    .setProtocol('https')
    .setDomain('api.example.com')
    .setPort(443)
    .setPath('users/123')
    .addQueryParam('tab', 'profile')
    .addQueryParam('limit', '20')
    .build();



console.log(url);
