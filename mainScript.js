const electron = require('electron');
const{ipcRenderer} = electron;
window.onload = function(){
    function $(item){
        let id = document.getElementById(item);
        return id;
    }


    let addButton = $("addWeightClass");
    const regEx = /^\d{3}-\d{3}$/;
    const errorMsg = 'Please enter weight classes according to the example: 150-175 . Thank you';

    addButton.onclick =  function(){

        let itemClass = document.getElementsByClassName("weightClass");
        let item = itemClass[itemClass.length - 1 ]; // get the last element of array ItemClass

        let clone = item.cloneNode(true); // making a clone OF WHOLE DIV (not just input)

        let child = clone.querySelector('.weightClass > .weight'); // taking input with our class name from a div with a class name


        if(child.value.match(regEx)){
            child.value = null; // cleaning value and text content of clonning element (so they have clean input value)
            child.textContent = '';
            item.parentNode.insertBefore(clone, item.nextSibling); // inserting cloned element after the last added element

            clone.addEventListener("click",function(e) {
                // e.target was the clicked element
                if (e.target.nodeName == "I") {
                    e.target.parentNode.remove();
                }
            });
        }

        else{
            alert(errorMsg);
        }
    }

    let startButton = $("start");

    startButton.onclick = function(){
        let select = $('weightList');
        let inputs = document.getElementsByClassName("weight");
        let main = $('page-2');

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

                if (itemText.match(regEx)) {  // check that all fields are filled with content
                    let option = document.createElement('option');
                    option.textContent = itemText;
                    option.value = itemText;
                    option.id = itemText;

                    select.appendChild(option);

                    //alert(`Class ${option.value} added successfully`);  - for checking purposes
                    let flag = false;
                    for (let i = 0; i < main.childNodes.length; i++){ // take children inside PAGE-2 and check for duplicates in divs ID's (if div already there we don't need to create extra one)
                        if (main.childNodes[i].id == itemText) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag !== true) {
                    // creating inner div with inputs + assigning them IDs same as text in options for identification
                    let innerDiv = document.createElement('DIV');
                    innerDiv.id = itemText;
                    innerDiv.className = 'hiddenDiv';

                    let participantDiv = document.createElement('DIV');
                    participantDiv.className = 'participants';

                    let createFirstNameInput = document.createElement('input');
                    createFirstNameInput.placeholder = 'First Name';
                    createFirstNameInput.className = 'participantInfo';

                    let createLastNameInput = document.createElement('input');
                    createLastNameInput.placeholder = 'Last Name';
                    createLastNameInput.className = 'participantInfo';

                    let createCityInput = document.createElement('input');
                    createCityInput.placeholder = 'City';
                    createCityInput.className = 'participantInfo';

                    let createProvinceInput = document.createElement('input');
                    createProvinceInput.placeholder = 'Province';
                    createProvinceInput.className = 'participantInfo';

                    let deleteElement = document.createElement('I');
                    deleteElement.className = 'fas fa-times-circle';

                    main.appendChild(innerDiv);


                        let participantsInfo = document.querySelectorAll('#page-2 > .hiddenDiv'); // cheking if selector already have a div created inside
                        for (let i = 0; i < participantsInfo.length; i++) {
                            if (participantsInfo[i].innerHTML == '') {
                                innerDiv.appendChild(participantDiv);
                                participantDiv.append(createFirstNameInput, createLastNameInput, createCityInput, createProvinceInput, deleteElement);
                            }
                        }
                    }
                }
                else {
                        alert(errorMsg);
                        break;
                    }

            }// END OF FOR LOOP


            $('main').className = 'hiddenDiv';
            $('page-2').className = 'showDiv';
        }
        else{
            alert("Please enter at least one weight class");
        }
    }

// BACK button funtionality

    let backButton = $('back');

    backButton.onclick = function(){
        $('main').className = 'showDiv';
        $('page-2').className = 'hiddenDiv';
    }



    let hiddenDivs = document.getElementsByClassName('hiddenDiv');
    let select = $('weightList');

    function selectChange(){

        let selectedOptionIndex = select.options[select.selectedIndex]; // get an index of selected option

        for (let index = 0; index < hiddenDivs.length; index++){
            if(hiddenDivs[index].id == selectedOptionIndex.id ){
                let selectedDiv = hiddenDivs[index];
                selectedDiv.classList.add('showDiv');
            }
            else{
                hiddenDivs[index].classList.remove('showDiv');
            }
        }
    } // selectChange FUNCTION END

    select.onchange = selectChange;

// Adding more participants to weightclass

    let addParticipants = $("addParticipants");
    addParticipants.onclick =  function(){

        let participantsInfo = document.querySelectorAll(".showDiv > .participants"); // getting the direct children of a showDiv class and ADD participants ONLY to that div
        let lastParticipant = participantsInfo[participantsInfo.length - 1 ]; // get the last element of array participantsInfo

        let clone = lastParticipant.cloneNode(true); // making a clone OF WHOLE DIV (not just input)

        let child = clone.querySelectorAll('.participants > .participantInfo'); // taking ALL inputs with our class name from a div with a class name

        for(let i = 0; i < child.length; i++){
            child[i].value = null; // cleaning values and text content of cloning element (so they have clean inputs value)
            child[i].textContent = '';
        }
        lastParticipant.parentNode.insertBefore(clone, lastParticipant.nextSibling); // inserting cloned element after the last added element

        clone.addEventListener("click",function(e) {
            // e.target was the clicked element
            if (e.target.nodeName == "I") {
                e.target.parentNode.remove();
            };
        });
    }; // END addParticipants FUNCTION


    // Creating select box to choose weight class bracket!

    let buildBrackets = $('StartTournament');

    // creating brackets accordign to the weighclasses

    function buildBracket(){
        let select = $('bracketsList');
        let bracketMain = document.createElement('DIV');
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
            let options = select.options.item;
            for(let i = select.options.length - 1 ; i > 0 ; i--)
            {
                let itemText = options[i].text;

                let bracketInner = document.createElement('DIV');
                bracketInner.classList = itemText;
                bracketMain.appendChild(bracketInner);


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
                    results : [[[[]]], [], []] // minimal array to initialize DE bracket
                }

                $(function() { $(`${itemText}`).bracket(
                    {
                        init: bigData,
                        save: function(){},
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

    buildBrackets.onclick = buildBracket;





// const ul = document.querySelector('ul');
//
// //Add items
// ipcRenderer.on('item:add',function (e, item) {
//     const li = document.createElement('li');
//     const itemText = document.createTextNode(item);
//     li.appendChild(itemText);
//     ul.appendChild(li);
// });
//
// //clear items
// ipcRenderer.on('item:clear',function () {
//     ul.innerHTML = '';
// });
//
// //remove item
// ul.addEventListener('dblclick',removeItem);
//
// function removeItem(e){
//     e.target.remove();
// }
};

