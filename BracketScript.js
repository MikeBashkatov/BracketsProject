var bigData = {
    teams : [
        ["Team 1",  "Team 2" ],
        ["Team 3",  "Team 4" ],
        ["Team 5",  "Team 6" ],
        ["Team 7",  "Team 8" ],
        ["Team 9",  "Team 10"],
        ["Team 11", "Team 12"],
        ["Team 13", "Team 14"],
        ["Team 15", "Team 16"]
    ],
    results : []
}

$(function() { $('.demo').bracket(
    {
        init: bigData,
        save: function(){},
        
    }
    )
})