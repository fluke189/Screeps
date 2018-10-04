var roleFighter = {
    run: function(creep) 
    {
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                });
        //var structure = creep.room.find(FIND_HOSTILE_STRUCTURES);
        if(!target)
        {
            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                });
        }
        
        if(target) 
        {
            var test = creep.attack(target);
            creep.moveTo(target);
            if(test == 0)
            {
                creep.say("💥", true);
            }
        }
        
        
        
        else if(Game.flags.Attack)
        {
            
            if(creep.room != Game.flags.Attack.room){
                creep.moveTo(Game.flags.Attack);
            }
        }
        
    }
};

module.exports = roleFighter;