var zergRush = 
{
    run: function()
    {
        if(Game.flags.ZergRush && Game.flags.RallyZergRush)
        {
            var zergRushRoom = Game.flags.ZergRush.room;
            var zergRushRallyRoom = Game.flags.RallyZergRush.room;
            
            if(zergRushRallyRoom)
            {
                var rallyCreeps = zergRushRallyRoom.find(FIND_MY_CREEPS);
                if(rallyCreeps.length > 9)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
    
};

module.exports = zergRush;