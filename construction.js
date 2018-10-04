var construction =
{
    extensions: function(RoomName)
    {
        var RoomMap = new Array(50);
        var i = 0;
        var j = 0;
        for(i = 0; i < 50; i++)
        {
            RoomMap[i] = new Array(50);
            for(j = 0; j < 50; j++)
            {
                RoomMap[i][j] = false;
            }
        }
        
        var seed = creep.pos.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                             return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN);
        }});
        
        i = 0;
        var queue;
        var tempX = 0;
        var tempY = 0;
        for(i = 0; i < seed.length; i++)
        {
            tempX = seed[i].RoomPosition.x;
            tempY = seed[i].RoomPosition.y;
            RoomMap[tempX][tempY] = true;
            queue.push(seed[i].RoomPosition)
        }
        
        var current;
        while(queue.length > 0)
        {
            current = queue.shift();
            checkTile(RoomMap, current.name, current.x-1, current.y-1);
            checkTile(RoomMap, current.name, current.x-1, current.y+1);
            checkTile(RoomMap, current.name, current.x+1, current.y-1);
            checkTile(RoomMap, current.name, current.x+1, current.y+1);
        }
    }
    ,
    checkTile: function(RoomMap, RoomName, x, y)
    {
        
        if(!RoomMap[x][y])
            {
                RoomMap[x][y] = true;
                temp = Game.rooms[RoomName].lookForAt(LOOK_STRUCTURES, x, y);
                for(i = 0; i < temp.length; i++)
                {
                    if(temp[i].type = 'structure')
                    {
                        if(temp[i].structure.structureType == STRUCTURE_RAMPART)
                        {
                            Game.rooms[current.name].createConstructionSite(x,y, STRUCTURE_RAMPART)
                        }
                    }
                }
            }
    }
}

module.exports = construction;