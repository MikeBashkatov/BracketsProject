//Right now if you add only 2 participants brackets plugin does not want to accept it in DE version
let buildBrackets = document.getElementById('StartTournament');
let bracketInner; // DIV element where we store our bracket that has a class equals to the weight category
let itemOption; // variable that stores weigh class value retrieved from Options of a select box
let select = document.getElementById('bracketsList'); // variable that stores select box of hide-show brackets
let selectElimType = document.getElementById('StartBrackets');
let eliminationType;

buildBrackets.addEventListener("click", brackets);

selectElimType.addEventListener("click",  pick_elimination);

select.addEventListener("change", showBrakets);

function pick_elimination(){
    let selectedElimType = $("#PickElimination").val();
    if(selectedElimType == 'Single elimination'){
        eliminationType = [];
    }
    else if(selectedElimType == 'Double elimination'){
        eliminationType = [[[[]]], [], []];
    }
    else if(selectedElimType == 'Triple elimination'){
        eliminationType = [];
    }
    else{
        alert("Please select elimination type");
    }
}

function brackets(){

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
    }

    let hiddenDivs = document.querySelectorAll('#page-2 > .hiddenDiv').length; // get the number of hidden divs on page2
    let partisipantName;// contains all info about participants in a div #i
    var hugeData = [];
    for (let i = 0; i < hiddenDivs; i++){
        partisipantName = document.querySelectorAll(`.p${i} > .participants`);

        var mediumData = [];
        let smallData = [];

        for(let i = 0; i < partisipantName.length; i++){
            if(i != 0 && i%2 == 0){ // here we are controlling the push so it is made every 2! itterations
                mediumData.push(smallData);
                smallData = [];
            }
            smallData.push(partisipantName[i].childNodes[0].value + ' ' + partisipantName[i].childNodes[1].value);

            if((i+1)==partisipantName.length){ // here we checks if the loop got to the last element we are making last push to the hugeData array and end working on this weight class
                if(smallData.length%2 != 0){ // here we checks if last small data class contains just one participant (number of participants might not be  even) we are adding NULL so brackets can work with it
                    smallData.push(null);
                }
                mediumData.push(smallData);
                smallData = [];

                }
            }
            hugeData.push(mediumData);
                    //insert brackets into newely created divs
                    itemOption = select.options[i+1].innerText;

                    bracketInner = document.createElement('DIV');
                    bracketInner.classList.add(itemOption, 'hiddenDiv');
                    bracketMain.appendChild(bracketInner);
        
                    var bigData = {
                        teams: hugeData[i],
                        results: eliminationType // minimal array to initialize DE bracket
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

function showBrakets(){
    let hiddenDivs = document.querySelectorAll('.BracketsVisual > .hiddenDiv'); // get all divs with class Hidden from a parent div of Brackets
    let selectedOptionIndex = select.options[select.selectedIndex]; // get an index of selected option

    for (let index = 0; index < hiddenDivs.length; index++){
        if(hiddenDivs[index].classList.item(0) == selectedOptionIndex.id ){
            let selectedDiv = hiddenDivs[index];
            selectedDiv.classList.add('showDiv');
        }
        else{
            hiddenDivs[index].classList.remove('showDiv');
        }
    }
}
