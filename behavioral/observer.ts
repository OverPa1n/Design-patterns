/*
    An observer is an object that receives updates from another object known as a subject.
    A subject is able to send updates out to many observers much like a weather station is able to
    send out text and email alerts to people who have subscribed to receive them.
 */

interface Observer {
    update();
}

class MasterSwitch {
    observers = [];
    state: boolean;

    notifyObservers() {
        for (const o of this.observers) {
            o.update();
        }
    }

    addObserver(o) {
        this.observers.push(o);
    }

    flip(state) {
        this.state = state;
        this.notifyObservers();
    }

    getState() {
        return this.state;
    }
}

abstract class ElectricalObject implements Observer {
    subject;
    isOn;

    protected constructor(subject) {
        this.subject = subject;
        subject.addObserver(this);
    }

    update() {
        this.setSwitch(this.subject.getState());
    }

    abstract setSwitch(state: boolean);
}

class CeilingFan extends ElectricalObject {
    constructor(subject) {
        super(subject);
    }

    setSwitch(state: boolean) {
        if (this.isOn !== state) {
            this.isOn = state;
            console.log(`Fan turned ${this.isOn ? 'on' : 'off'}`);
        }
    }
}

const masterSwitch = new MasterSwitch();
const lamp = new CeilingFan(masterSwitch);

masterSwitch.flip(true);
masterSwitch.flip(false);
