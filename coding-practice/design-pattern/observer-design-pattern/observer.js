var Channel = /** @class */ (function () {
    function Channel(aName) {
        this.subscribers = [];
        this.latestVideo = "";
        this.name = aName;
    }
    Channel.prototype.subscribe = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    Channel.prototype.unsubscribe = function (observer) {
        var index = this.subscribers.indexOf(observer);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    };
    Channel.prototype.notifySubscribers = function () {
        for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.name);
        }
    };
    Channel.prototype.uploadVideo = function (title) {
        this.latestVideo = title;
        console.log("".concat(this.name, " uploaded ").concat(title));
        this.notifySubscribers();
    };
    Channel.prototype.getVideoData = function () {
        return "Checkout our new Video: ".concat(this.latestVideo);
    };
    return Channel;
}());
var Subscriber = /** @class */ (function () {
    function Subscriber(name, channel) {
        this.name = name;
        this.channel = channel;
    }
    Subscriber.prototype.update = function () {
        console.log("hey, ".concat(this.name, " ").concat(this.channel.getVideoData()));
    };
    return Subscriber;
}());
function main() {
    console.log("hello in main");
    var channel = new Channel("Chan1");
    var sub1 = new Subscriber("tarun", channel);
    var sub2 = new Subscriber("varun", channel);
    channel.subscribe(sub1);
    channel.subscribe(sub2);
    channel.uploadVideo("Observer Pattern Tutorial");
    // Varun unsubscribes; Tarun remains subscribed
    channel.unsubscribe(sub1);
    // Upload another video: only Tarun is notified
    channel.uploadVideo("Decorator Pattern Tutorial");
}
main();
