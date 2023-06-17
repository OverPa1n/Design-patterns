/*
    The Memento pattern provides temporary storage as well as restoration of an object.
    The mechanism in which you store the object’s state depends on the required duration of persistence, which may vary.
 */
interface MementoInterface {
    saveState: Function;
    getPreviousState: Function;
    entities: {[key: string]: {}};
}

interface EntityInterface {
    rollback: Function;
    getEntityInfo: Function;
    entityInfo: {
        id: number;
        name: string;
        type: string;
    };
}

class Memento implements MementoInterface {
    entities = {};

    saveState(entity) {
        this.entities[entity.entityInfo.id] = JSON.stringify(entity.entityInfo);
    }

    getPreviousState(entity) {
        return JSON.parse(this.entities[entity.entityInfo.id]);
    }
}

class Entity implements EntityInterface {
    entityInfo;

    constructor(entityInfo) {
        this.entityInfo = entityInfo;
    }

    rollback(previousState) {
        this.entityInfo = previousState;
    }

    getEntityInfo() {
        console.log(`Info about entity: ${JSON.stringify(this.entityInfo)}`);
    }
}

const memento = new Memento();
const entity1 = new Entity({id: 1, name: 'Robocop', type: 'Alien'});
const entity2 = new Entity({id: 2, name: 'Dog', type: 'Animal'});
const entity3 = new Entity({id: 3, name: 'Alex', type: 'Human'});

memento.saveState(entity1);
memento.saveState(entity2);
memento.saveState(entity3);

entity1.getEntityInfo();
entity2.getEntityInfo();
entity3.getEntityInfo();

entity2.entityInfo.name = 'LOOOOOOOL';
entity2.getEntityInfo();

const previousState = memento.getPreviousState(entity2);
entity2.rollback(previousState);
entity2.getEntityInfo();
