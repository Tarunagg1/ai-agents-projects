interface ISubscriber {
    update(name: string): void
}


interface IChannel {
    subscribe(subscriber: ISubscriber): void
    unsubscribe(observer: ISubscriber): void
    notifySubscribers(): void
}

class Channel implements IChannel {
    private subscribers: ISubscriber[] = [];
    private name: string;
    private latestVideo: string = "";


    constructor(aName: string) {
        this.name = aName;
    }

    subscribe(subscriber: ISubscriber): void {
        this.subscribers.push(subscriber);
    }

    unsubscribe(observer: ISubscriber): void {
        const index = this.subscribers.indexOf(observer);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }

    notifySubscribers(): void {
        for (const observer of this.subscribers) {
            observer.update(this.name)
        }
    }

    uploadVideo(title: string): void {
        this.latestVideo = title;
        console.log(`${this.name} uploaded ${title}`);
        this.notifySubscribers()
    }

    getVideoData(): string {
        return `Checkout our new Video: ${this.latestVideo}`;
    }
}



class Subscriber implements ISubscriber {
    private name: string;
    private channel: Channel;

    constructor(name: string, channel: Channel) {
        this.name = name;
        this.channel = channel
    }

    update(): void {
        console.log(`hey, ${this.name} ${this.channel.getVideoData()}`);

    }
}



function main() {
    console.log("hello in main");
    const channel = new Channel("Chan1");

    const sub1 = new Subscriber("tarun", channel)
    const sub2 = new Subscriber("varun", channel)

    channel.subscribe(sub1)
    channel.subscribe(sub2)

    channel.uploadVideo("Observer Pattern Tutorial");

    // Varun unsubscribes; Tarun remains subscribed
    channel.unsubscribe(sub1);

    // Upload another video: only Tarun is notified
    channel.uploadVideo("Decorator Pattern Tutorial");
}

main()