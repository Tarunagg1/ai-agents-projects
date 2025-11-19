var URLBuilder = /** @class */ (function () {
    function URLBuilder() {
        this.protocol = "http";
        this.domain = "";
        this.path = "";
        this.queryParams = {};
    }
    URLBuilder.prototype.setProtocol = function (protocol) {
        this.protocol = protocol;
        return this;
    };
    URLBuilder.prototype.setDomain = function (domain) {
        this.domain = domain;
        return this;
    };
    URLBuilder.prototype.setPort = function (port) {
        this.port = port;
        return this;
    };
    URLBuilder.prototype.setPath = function (path) {
        this.path = path;
        return this;
    };
    URLBuilder.prototype.addQueryParam = function (key, value) {
        this.queryParams[key] = value;
        return this;
    };
    URLBuilder.prototype.build = function () {
        var url = "".concat(this.protocol, "://").concat(this.domain);
        if (this.port) {
            url += ":".concat(this.port);
        }
        if (this.path) {
            url += "/".concat(this.path);
        }
        Object.entries(this.queryParams).forEach(function (data, index) {
            var key = data[0], value = data[1];
            url += "".concat(index === 0 ? '?' : '&').concat(key, "=").concat(value);
        });
        return url;
    };
    return URLBuilder;
}());
var url = new URLBuilder()
    .setProtocol('https')
    .setDomain('api.example.com')
    .setPort(443)
    .setPath('users/123')
    .addQueryParam('tab', 'profile')
    .addQueryParam('limit', '20')
    .build();
console.log(url);
