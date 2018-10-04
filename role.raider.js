var roleRaider = 
{
    run: function(creep) 
    {
        var target;
        var tower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
            filter: (hostile) => {
                return (hostile.structureType  == STRUCTURE_TOWER && !Memory.allies.hasOwnProperty(hostile.owner.username))
            }
        });
        
        
        target = tower;
        
        var enemyCreep = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                filter: (structure) => 
                {
                    return !Memory.allies.hasOwnProperty(structure.owner.username)
                }
        });
        var spawn;
        var walls;
        var miscStructures;
        var i = 0;
        var wallFound = false;
        var numWalls = 0;
        var checkpoint;
        
        if(!tower && enemyCreep)
        {
            target = enemyCreep;
        }
        
        if(!target)
        {
            spawn = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => 
                {
                    return (!Memory.allies.hasOwnProperty(structure.owner.username) && structure.structureType == STRUCTURE_SPAWN)
                }
            });
            
            target = spawn;
            
        }
        
        if(!target)
        {
            miscStructures = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => 
                {
                    return (!Memory.allies.hasOwnProperty(structure.owner.username) && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_CONTROLLER && structure.structureType != STRUCTURE_POWER_BANK)
                }
            });
            
            target = miscStructures;
        }
        
        if(!target)
        {
            walls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => 
                {
                    return ((structure.structureType == STRUCTURE_RAMPART && !Memory.allies.hasOwnProperty(structure.owner.username)) || structure.structureType == STRUCTURE_WALL)
                }
            });
            
            walls.sort((a,b) => a.hits - b.hits);
            numWalls = walls.length;
            var pathToWall;
            
            console.log(numWalls);
            
            while(!wallFound && i < numWalls)
            {
                pathToWall = PathFinder.search(creep.pos, walls[i], {maxCost: 75});
                if(pathToWall)
                {
                    wallFound = true;
                }
                else
                {
                    i++;
                }
            }
            
            target = walls[i];
        }
        
        if(creep.hits < creep.hitsMax)
        {
            creep.heal(creep);
        }
        
        if(creep.hits < creep.hitsMax * .7)
        {
            if(enemyCreep)
            {
                creep.attack(enemyCreep);
                creep.rangedAttack(enemyCreep);
            }
            if(Game.flags.RaidCamp)
            {
                creep.moveTo(Game.flags.RaidCamp);
            }
            else
            {
                creep.moveTo(Game.rooms[Memory.creeps[creep.name].home].controller);
            }
        }
        
        else if(Game.flags.Raid && creep.room == Game.flags.Raid.room)
        {
            console.log("here");
            if(!target)
            {
                creep.moveTo(Game.flags.Raid);
            }
            else
            {
                console.log(target)
                creep.moveTo(target);
                if(creep.rangedAttack(target) == -9)
                {
                    creep.rangedAttack(enemyCreep);
                    creep.attack(enemyCreep);
                }
                creep.attack(target);
            }
        }
        else if(Game.flags.Raid)
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
                    creep.moveTo(Game.flags.Raid);
                }
            }
            
            if(enemyCreep)
            {
                creep.rangedAttack(enemyCreep);
                creep.attack(enemyCreep);
            }
        }
    }
};

module.exports = roleRaider;