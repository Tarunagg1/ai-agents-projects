interface Subject {
    request(): void;
}

class RealSubject implements Subject {
    request() {
        console.log("Real request processing");
    }
}



class ProxyC implements Subject {
    private realSubject: RealSubject | null = null;

    request(): void {
        if (this.realSubject === null) {
            this.realSubject = new RealSubject();
        }
        console.log("Proxy request processing");
        this.realSubject.request();
    }
}


const proxy = new ProxyC();
proxy.request(); // Proxy controls access -> Real request processing

