var roleHauler =
{
    run: function(creep)
    {
        //If creep carry capacity is full, drop off rescources
        if(creep.carry == creep.carryCapacity)
        {
            //target for spawns and extensions
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                         return (structure.structureType == STRUCTURE_EXTENSION ||
                                 structure.structureType == STRUCTURE_SPAWN ||) 
                                 && (structure.energy < structure.energyCapacity);
                    }
            });
            //target for storage structures
            var mainStorage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                         return (structure.structureType == STRUCTURE_STORAGE) 
                                && (structure.store < structure.storeCapacity);
                    }
            });
            
            if(target)
        }
        //If creep carry capacity is not full, find dropped rescources to pickup
        else
        {
            //closest dropped rescources
            var targets = creep.room.find(FIND_DROPPED_RESOURCES);
            //if dropped rescources are found, go pick them up
            if(targets.length > 0)
            {
                targets.sort((a,b) => b.hits - a.hits);
                if(creep.pickup(targets[0]) == -9) //if creep is out of pickup range move to target
                {
                    creep.moveTo(targets[0]);
                }
            }
             
            //if no targets in room
             
            else
            {
                //move to another room?
            }
        }
         
    }
};

module.exports = roleHauler;