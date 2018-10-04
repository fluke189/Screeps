var advSpawn = 
{
    worker: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var body = [MOVE];
        var spawn = false;
        var parts = 1;
        var test;
        if(roomEnergy > 199)
        {
            spawn = true;
            roomEnergy -= 50;
            while(roomEnergy > 99 && parts < 50)
            {
                if(roomEnergy > 99 && parts < 50)
                {
                    body.push(WORK);
                    roomEnergy -= 100;
                    parts++;
                }
                if(roomEnergy > 49 && parts < 50)
                {
                    body.push(CARRY);
                    roomEnergy -= 50;
                    parts++;
                }
                if(roomEnergy > 49 && parts < 50)
                {
                    body.push(MOVE);
                    roomEnergy -= 50;
                    parts++;
                }
            }
        }
        if(spawn)
        {
            test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home, isHarvesting: false, isBuilding: false, path: 0}});
            
            if(test == 0)
            {
                
                if(Game.rooms[Home].memory)
                {
                    if(Role == 'harvester')
                    {
                        Game.rooms[Home].memory.numHarvesters++;
                    }
                    else if(Role == 'upgrader')
                    {
                        Game.rooms[Home].memory.numUpgraders++;
                    }
                    else if(Role == 'builder')
                    {
                        Game.rooms[Home].memory.numBuilders++;
                    }
                }
                
            }
            return test;
        }
        else
        {
            return 1; //no valid spawns available
        }
    }
    ,
    melee: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 10/19 * roomEnergy + 50;
        var toughEnergy = 1/19 * roomEnergy - 25;
        var attackEnergy = 8/19 * roomEnergy - 25;
        var body = [TOUGH];
        var parts = 1;
        toughEnergy -= 10;
        
        while(toughEnergy > 9 && parts < 12)
        {
            body.push(TOUGH);
            toughEnergy -= 10;
            parts++;
        }
        moveEnergy += toughEnergy;
        while(moveEnergy > 49 && parts < 37)
        {
            body.push(MOVE);
            moveEnergy -= 50;
            parts++;
        }
        attackEnergy += moveEnergy;
        while(attackEnergy > 79 && parts < 50)
        {
            body.push(ATTACK);
            attackEnergy -= 80;
            parts++;
        }
        var test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home, path: 0}});
        
        return test;
    }
    ,
    tank: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 50/60 * roomEnergy;
        var toughEnergy = 10/60 * roomEnergy;
        var body = [TOUGH];
        var parts = 1;
        toughEnergy -= 10;
        
        while(toughEnergy > 9 && parts < 33)
        {
            body.push(TOUGH);
            toughEnergy -= 10;
            parts++;
        }
        moveEnergy += toughEnergy;
        while(moveEnergy > 49 && parts < 51)
        {
            body.push(MOVE);
            moveEnergy -= 50;
            parts++;
        }
        var test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
        
        return test;
    }
    ,
    healer: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 50/300 * roomEnergy;
        var healEnergy = 250/300 * roomEnergy;
        var body = [MOVE];
        var parts = 1;
        moveEnergy -= 50;
        
        while(moveEnergy > 49 && parts < 26)
        {
            body.push(MOVE);
            moveEnergy -= 50;
            parts++;
        }
        healEnergy += moveEnergy;
        while(healEnergy > 249 && parts < 51)
        {
            body.push(HEAL);
            healEnergy -= 250;
            parts++;
        }
        var test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home, checkpoint: 0}});
        return test;
    }
    ,
    ranged: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable - 300;
        var moveEnergy = 100/260 * roomEnergy + 50;
        var toughEnergy = 10/260 * roomEnergy;
        var attackEnergy = 150/260 * roomEnergy - 50;
        var body = [TOUGH];
        var parts = 1;
        toughEnergy -= 10;
        
        while(toughEnergy > 9 && parts < 12)
        {
            body.push(TOUGH);
            toughEnergy -= 10;
            parts++;
        }
        moveEnergy += toughEnergy;
        while(moveEnergy > 49 && parts < 36)
        {
            body.push(MOVE);
            moveEnergy -= 50;
            parts++;
        }
        attackEnergy += moveEnergy;
        while(attackEnergy > 149 && parts <48)
        {
            body.push(RANGED_ATTACK);
            attackEnergy -= 150;
            parts++;
        }
        body.push(HEAL);
        body.push(MOVE);
        var test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home, checkpoint: 0}});
    }
    ,
    claimer: function(Spawn, Name, Role, Home)
    {
        var body = [CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE];
        var test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
        return test;
    }
    ,
    zergling: function(Spawn, Name, Role, Home)
    {
        var body = [ATTACK, MOVE];
        var test = Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home, rally: true, checkpoint: 0}});
        return test;
    }
}

module.exports = advSpawn;