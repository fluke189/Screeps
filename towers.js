var allies = require('allies');

var towers = 
{
    run: function()
    {
        //find all towers in Game.structures
        var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
        var i = 0;
        var len = towers.length;
        
        //for every tower in towers
        while(i < len)
        {
            //current tower
            var tower = towers[i];
            //if tower object is valid find and attack any hostile creeps in room
            if(tower) 
            {
                var Owner;
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                        filter: (structure) => 
                        {
                            return !Memory.allies.hasOwnProperty(structure.owner.username)
                        }
                });      
                             
                
                if(closestHostile) 
                {
                    tower.attack(closestHostile);
                }
                //if no hostile creeps are in room and tower is above 900 energy look for structures to repair
                else 
                {
                    if(tower.energy > 900)
                    {
                        var closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax * 3/4});
                        //if structures in need of repair are found repair the one with the least hit points
                        if(closestDamagedStructure) 
                        {
                            closestDamagedStructure.sort((a,b) => a.hits - b.hits);
        	 	            tower.repair(closestDamagedStructure[0]);
                        }
                    }
                }
            }
            i++;
        }
    }
}

module.exports = towers;