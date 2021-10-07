// import * as $ from 'jquery';

// adding classes to checkbox elements
export function addCheckboxClass() {
    let rings = document.querySelectorAll(".bv-no-focus-ring");
    rings.forEach( ring => {
        ring.classList.add("row", "items-row")
    })
    //$('.bv-no-focus-ring').addClass(['row', 'items-row']);

    let check1s = document.querySelectorAll("input[id*='check1']");
    check1s.forEach( check1 => {
        let parent = check1.parentNode;
        parent.classList.add("col-12", "items-col");
    })
    // var check1= $( "input[id*='check1']" );
    // check1.parent().addClass(['col-12', 'items-col']);
    
    let check2s = document.querySelectorAll("input[id*='check2']");
    check2s.forEach( check2 => {
        let parent = check2.parentNode;
        parent.classList.add("col-6", "items-col");
    })
    // var check2= $( "input[id*='check2']" );
    // check2.parent().addClass(['col-6', 'items-col']);
}