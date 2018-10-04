var roleRanger = {
    run: function(creep) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        var structure = creep.room.find(FIND_HOSTILE_STRUCTURES);
        if(target) { 
            creep.moveTo(target);
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.heal(creep);
            }
        }
        else
        {
            if(creep.hits < creep.hitsMax)
            {
                creep.heal(creep);
            }
            creep.moveTo(Game.flags.Attack);
        }
    }
};

module.exports = roleRanger;