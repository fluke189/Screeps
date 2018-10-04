var allies = 
{
    addAlly: function(Name)
    {
        Memory.allies.Name = true;
    }
    ,
    filterOutAllies: function(enemies)
    {
        var i = 0;
        var enemiesSize = enemiez.length
        
        for(i = 0; i < enemiesSize; i++)
        {
            if(Memory.allies.enemies[i] == true)
            {
                enemies.splice(i, 1);
            }
        }
    }
    ,
    filterOutNotAllies: function(enemies)
    {
        var i = 0;
        var enemiesSize = enemiez.length
        
        for(i = 0; i < enemiesSize; i++)
        {
            if(Memory.allies.enemies[i] != true)
            {
                enemies.splice(i, 1);
            }
        }
    }
};

module.exports = allies;