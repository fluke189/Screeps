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
        
        if(Game.flags.Attack)
        {
            
            if(creep.room != Game.flags.Attack.room)
            {
                if(creep.memory.hasOwnProperty("checkpoint"))
                {
                    checkpoint = "checkpoint" + creep.memory.checkpoint;
                    
                    if(Game.flags[checkpoint])
                    {
                        if(creep.pos.x == Game.flags[checkpoint].pos.x && creep.pos.y == Game.flags[checkpoint].pos.y)
                        {
                            creep.memory.checkpoint++;
                        }
                        creep.moveTo(Game.flags[checkpoint]);
                    }
                    else
                    {
                        creep.moveTo(Game.flags.RallyZergRush);
                    }
                }
            }
            
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
        }
        
    }
};

module.exports = roleFighter;