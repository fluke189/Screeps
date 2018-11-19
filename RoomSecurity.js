var towers = require('towers');

var RoomSecurity = 
{
    lockRamparts: function(name)
    {
        var ramparts = Game.rooms[name].find(FIND_MY_STRUCTURES, {
            filter: (structure) => 
            {
                return structure.structureType == STRUCTURE_RAMPART;
            }
        })
        
        var length;
        var i = 0;
        
        if(ramparts)
        {
            length = ramparts.length
            for(i = 0; i < length; i++)
            {
                ramparts[i].setPublic(false);
            }
        }
    }
    ,
    unLockRamparts: function(name)
    {
        var ramparts = Game.rooms[name].find(FIND_MY_STRUCTURES, {
            filter: (structure) => 
            {
                return structure.structureType == STRUCTURE_RAMPART;
            }
        })
        
        var length;
        var i = 0;
        
        if(ramparts)
        {
            length = ramparts.length
            for(i = 0; i < length; i++)
            {
                ramparts[i].setPublic(true);
            }
        }
    }
    ,
    run: function()
    {
        var currentMem;
        var currentRoom;
        var hostiles
        
        towers.run();
        
        for(var name in Memory.rooms)
        {
            currentMem = Memory.rooms[name];
            currentRoom = Game.rooms[name];
            
            hostiles = currentRoom.find(FIND_HOSTILE_CREEPS, {
                filter: (structure) => 
                {
                    return !Memory.allies.hasOwnProperty(structure.owner.username)
                }
            })
            
            
            if(hostiles.length > 0)
            {
                if(currentMem.defcon == 5)
                {
                    currentMem.defcon = 4;
                    RoomSecurity.lockRamparts(name);
                }
            }
            else
            {
                if(currentMem.defcon == 4)
                {
                    currentMem.defcon = 5;
                    RoomSecurity.unLockRamparts(name);
                }
            }
        }
    }
};

module.exports = RoomSecurity;