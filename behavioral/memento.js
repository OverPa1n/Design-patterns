var Memento = /** @class */ (function () {
    function Memento() {
        this.entities = {};
    }
    Memento.prototype.saveState = function (entity) {
        this.entities[entity.entityInfo.id] = JSON.stringify(entity.entityInfo);
    };
    Memento.prototype.getPreviousState = function (entity) {
        return JSON.parse(this.entities[entity.entityInfo.id]);
    };
    return Memento;
}());
var Entity = /** @class */ (function () {
    function Entity(entityInfo) {
        this.entityInfo = entityInfo;
    }
    Entity.prototype.rollback = function (previousState) {
        this.entityInfo = previousState;
    };
    Entity.prototype.getEntityInfo = function () {
        console.log("Info about entity: ".concat(JSON.stringify(this.entityInfo)));
    };
    return Entity;
}());
var memento = new Memento();
var entity1 = new Entity({ id: 1, name: 'Robocop', type: 'Alien' });
var entity2 = new Entity({ id: 2, name: 'Dog', type: 'Animal' });
var entity3 = new Entity({ id: 3, name: 'Alex', type: 'Human' });
memento.saveState(entity1);
memento.saveState(entity2);
memento.saveState(entity3);
entity1.getEntityInfo();
entity2.getEntityInfo();
entity3.getEntityInfo();
entity2.entityInfo.name = 'LOOOOOOOL';
entity2.getEntityInfo();
var previousState = memento.getPreviousState(entity2);
entity2.rollback(previousState);
entity2.getEntityInfo();
