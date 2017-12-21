var roleFighter = {
    run: function(creep) {
        if(creep.room != Game.flags.Attack.room){
            creep.moveTo(Game.flags.Attack);
        }
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        var structure = creep.room.find(FIND_HOSTILE_STRUCTURES);
        if(target) {
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleFighter;