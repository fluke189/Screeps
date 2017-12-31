var advSpawn = 
{
    worker: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var body = [WORK,CARRY,MOVE];
        if(roomEnergy > 199)
        {
            roomEnergy -= 200;
            while(roomEnergy > 99)
            {
                if(roomEnergy > 99)
                {
                    body.push(WORK);
                    roomEnergy -= 100;
                }
                if(roomEnergy > 49)
                {
                    body.push(CARRY);
                    roomEnergy -= 50;
                }
                if(roomEnergy > 49)
                {
                    body.push(MOVE);
                    roomEnergy -= 50;
                }
            }
        }
        
        if(Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}}) == 0)
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
    }
    ,
    melee: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 10/19 * roomEnergy;
        var toughEnergy = 1/19 * roomEnergy;
        var attackEnergy = 8/19 * roomEnergy;
        var body = [TOUGH];
        var parts = 1;
        toughEnergy -= 10;
        
        console.log(roomEnergy);
        console.log(toughEnergy);
        console.log(moveEnergy);
        console.log(attackEnergy);
        
        
        while(toughEnergy > 9 && parts < 17)
        {
            body.push(TOUGH);
            toughEnergy -= 10;
            parts++;
        }
        moveEnergy += toughEnergy;
        while(moveEnergy > 49 && parts < 34)
        {
            body.push(MOVE);
            moveEnergy -= 50;
            parts++;
        }
        attackEnergy += moveEnergy;
        while(attackEnergy > 79 && parts < 51)
        {
            body.push(ATTACK);
            attackEnergy -= 80;
            parts++;
        }
        Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
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
        Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
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
        
        while(moveEnergy > 49 && parts < 17)
        {
            body.push(MOVE);
            toughEnergy -= 10;
            parts++;
        }
        moveEnergy += toughEnergy;
        while(healEnergy > 249 && parts < 51)
        {
            body.push(HEAL);
            healEnergy -= 250;
            parts++;
        }
        Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
    }
    ,
    ranged: function(Spawn, Name, Role, Home)
    {
        var roomEnergy = Spawn.room.energyAvailable - 250;
        var moveEnergy = 100/260 * roomEnergy + 50;
        var toughEnergy = 10/260 * roomEnergy;
        var attackEnergy = 150/260 * roomEnergy - 50;
        var body = [TOUGH];
        var parts = 2;
        toughEnergy -= 10;
        
        while(toughEnergy > 9 && parts < 16)
        {
            body.push(TOUGH);
            toughEnergy -= 10;
            parts++;
        }
        moveEnergy += toughEnergy;
        while(moveEnergy > 49 && parts < 35)
        {
            body.push(MOVE);
            moveEnergy -= 50;
            parts++;
        }
        attackEnergy += moveEnergy;
        while(attackEnergy > 149 && parts < 51)
        {
            body.push(RANGED_ATTACK);
            attackEnergy -= 150;
            parts++;
        }
        body.push(HEAL);
        Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
    }
    ,
    claimer: function(Spawn, Name, Role, Home)
    {
        var body = [CLAIM, MOVE, MOVE];
        
        Spawn.spawnCreep(body, Name, {memory: {role: Role, home: Home}});
    }
}

module.exports = advSpawn;