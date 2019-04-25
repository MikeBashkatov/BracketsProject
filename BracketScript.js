let buildBrackets = document.getElementById('StartTournament');
let bracketInner; // DIV element where we store our bracket that has a class equals to the weight category
let itemOption; // variable that stores weigh class value retrieved from Options of a select box
let select = document.getElementById('bracketsList'); // variable that stores select box of hide-show brackets

buildBrackets.addEventListener("click", brackets);

select.addEventListener("change", showBrakets);

function brackets(){

    // creating brackets accordign to the weighclasses


    let bracketMain = document.createElement('DIV');
    bracketMain.classList.add('BracketsVisual')
    select.parentNode.insertBefore(bracketMain, select.nextSibling); //inserting main Brackets DIV right after the Brackets Select

    let inputs = document.getElementsByClassName('weight');

    // CHECKING IF WE HAVE AT LEAST ONE WEIGHT cLASS ENTERED

    if(inputs.length >= 1 && inputs[0].value !== ""){


        // removing ALL options so we can insert new ones
        for(let i = select.options.length - 1 ; i > 0 ; i--)
        {
            select.options.remove(i);
        }

        // Inserting new options from input elements
        for (let i = 0; i < inputs.length; i++) {

            let itemText = inputs[i].value;

            let option = document.createElement('option');
            option.textContent = itemText;
            option.value = itemText;
            option.id = itemText;

            select.appendChild(option);

        }
        //insert brackets into newely created divs
        for(let i = select.options.length - 1 ; i > 0 ; i--)
        {
            itemOption = select.options[i].innerText;

            bracketInner = document.createElement('DIV');
            bracketInner.classList.add(itemOption, 'hiddenDiv');
            bracketMain.appendChild(bracketInner);

            var bigData = {
                teams: [
                    ["Team 1", "Team 2"],
                    ["Team 3", "Team 4"],
                    ["Team 5", "Team 6"],
                    ["Team 7", "Team 8"],
                    ["Team 9", "Team 10"],
                    ["Team 11", "Team 12"],
                    ["Team 13", "Team 14"],
                    ["Team 15", "Team 16"]
                ],
                results: [[[[]]], [], []] // minimal array to initialize DE bracket
            }

            $(function () {
                $(`.${itemOption}`).bracket(
                    {
                        init: bigData,
                        save: function () {
                        },
                        disableToolbar: true,
                        disableTeamEdit: true,
                        skipConsolationRound: true,
                        centerConnectors: true
                    }
                )
            })
        }
    }
}

function showBrakets(){
    
}