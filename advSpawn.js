var advSpawn = 
{
    worker: function(Spawn, Name, Role)
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
        
        Spawn.spawnCreep(body, Name, {memory: {role: Role}});
    }
    ,
    melee: function(Spawn, Name, Role)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 5/14 * roomEnergy;
        var toughEnergy = 1/14 * roomEnergy;
        var attackEnergy = 8/14 * roomEnergy;
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
        Spawn.spawnCreep(body, Name, {memory: {role: Role}});
    }
    ,
    tank: function(Spawn, Name, Role)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 50/70 * roomEnergy;
        var toughEnergy = 20/70 * roomEnergy;
        var body = [TOUGH];
        var parts = 1;
        toughEnergy -= 10;
        
        while(toughEnergy > 9 && parts < 34)
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
        Spawn.spawnCreep(body, Name, {memory: {role: Role}});
    }
    ,
    healer: function(Spawn, Name, Role)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 50/550 * roomEnergy;
        var healEnergy = 500/550 * roomEnergy;
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
        Spawn.spawnCreep(body, Name, {memory: {role: Role}});
    }
    ,
    ranged: function(Spawn, Name, Role)
    {
        var roomEnergy = Spawn.room.energyAvailable;
        var moveEnergy = 50/210 * roomEnergy;
        var toughEnergy = 10/210 * roomEnergy;
        var attackEnergy = 150/210 * roomEnergy;
        var body = [TOUGH];
        var parts = 1;
        toughEnergy -= 10;
        
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
        while(attackEnergy > 149 && parts < 51)
        {
            body.push(RANGED_ATTACK);
            attackEnergy -= 150;
            parts++;
        }
        Spawn.spawnCreep(body, Name, {memory: {role: Role}});
    }
}

module.exports = advSpawn;