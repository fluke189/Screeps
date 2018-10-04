var roleZergling =
{
    run: function(creep)
    {
        if(creep.memory.rally && Game.flags.RallyZergRush)
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
            if(creep.room == Game.flags.RallyZergRush.room)
            {
                var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                });
                //var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
                
                if(target)
                {
                    if(creep.attack(target) == 0)
                    {
                        creep.say("💥", true);
                    }
                    creep.moveTo(target);
                }
            }
        }
        else if(!creep.memory.Rally && Game.flags.ZergRush)
        {
            creep.moveTo(Game.flags.ZergRush);
            var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                    filter: (structure) => 
                    {
                        return !Memory.allies.hasOwnProperty(structure.owner.username)
                    }
            });
            
            if(creep.room == Game.flags.ZergRush.room)
            {
                var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                });
                var structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                });
                var tower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (hostile) => {
                        return (hostile.structureType  == STRUCTURE_TOWER && !Memory.allies.hasOwnProperty(hostile.owner.username))
                    }
                });
                
                if(tower)
                {
                    if(creep.attack(tower) == 0)
                    {
                        //creep.say("💥", true);
                    }
                    creep.moveTo(tower);
                }
                
                else if(target)
                {
                    if(creep.attack(target) == 0)
                    {
                        //creep.say("💥", true);
                    }
                    creep.moveTo(target);
                }
                
                else if(structure)
                {
                    if(creep.attack(structure) == 0 )
                    {
                        //creep.say("💣", true);
                    }
                    creep.moveTo(structure);
                }
            }
        }
        
        
    }
};

module.exports = roleZergling;