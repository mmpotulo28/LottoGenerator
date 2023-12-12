const lottoNumbers = document.querySelectorAll( ".lotto-numbers" );
const lottoNumbersbonus = document.querySelector( ".lotto-numbers-bonus" );
const lottoType = document.querySelector( "#lotto-type" );
let genCount = 0;
let allNumbers = [];
let bonusNumbers = [];
let i = 1;
let best = [];
let bestBonus = [];

const generateBtn = document.querySelector( "#generate-btn" );
const tryCount = document.querySelector( "#try-count" );

generateBtn.addEventListener( "click", () => {
    generateNumbers( i );

    // reset
    i = 1;
    allNumbers = [];
    bonusNumbers = [];
    best = [];
    bonusBest = [];
    bestNums.forEach( bestNum => bestNum.textContent = "" );
    genCount = 0;
} );

function generateNumbers ( i ) {
    if ( i > lottoType.value ) {
        // change background color of lottoNumber
        lottoNumbers.forEach( lottoNumber => {
            lottoNumber.style.backgroundColor = "white";
            lottoNumber.style.color = "black";
        } );
        // call bestNumbers
        bestNumbers( allNumbers, bonusNumbers );
        return;
    }

    let numbers = [];
    let bonuss = [];

    for ( let i = 0; i < 6; i++ ) {
        let number = Math.floor( Math.random() * 52 ) + 1;
        let bonus = Math.floor( Math.random() * 52 ) + 1;

        if ( numbers.indexOf( number ) === -1 && ( bonuss.indexOf( bonus ) === -1 ) ) {
            numbers.push( number );
            bonuss.push( bonus );
        } else {
            i--;
        }
    }

    console.log( numbers );
    console.log( bonuss );

    numbers.sort( ( a, b ) => a - b );
    bonuss.sort( ( a, b ) => a - b );

    lottoNumbers.forEach( ( lottoNumber, index ) => {
        setTimeout( () => {
            // change background color of lottoNumber
            lottoNumber.style.backgroundColor = "yellow";
            // change text of lottoNumber
            lottoNumber.style.color = "white";
            lottoNumber.style.transform = "rotate(-360deg)";
        }, 100 * index );
    } );

    setTimeout( () => {
        lottoNumbersbonus.style.backgroundColor = "red";
        lottoNumbersbonus.style.transform = "rotate(-360deg)";
    }, 200 );


    lottoNumbers.forEach( ( lottoNumber, index ) => {
        setTimeout( () => {
            // change background color of lottoNumber
            lottoNumber.style.backgroundColor = "green";
            lottoNumber.textContent = numbers[ index ];
            // rotate 360deg
            lottoNumber.style.transform = "rotate(360deg)";
        }, 300 * index );
    } );

    setTimeout( () => {
        lottoNumbersbonus.textContent = bonuss[ 0 ];
        lottoNumbersbonus.style.transform = "rotate(360deg)";
    }, 100 );

    lottoNumbers.forEach( ( lottoNumber, index ) => {
        setTimeout( () => {
            // change background color of lottoNumber
            lottoNumber.style.backgroundColor = "red";
        }, 100 * index );
    } );

    setTimeout( () => {
        lottoNumbersbonus.style.backgroundColor = "violet";
        lottoNumbersbonus.style.color = "white";
    }, 200 );

    // add numbers to allNumbers
    allNumbers.push( ...numbers );
    bonusNumbers.push( ...bonuss );
    tryCount.textContent = i;

    // recall 
    setTimeout( () => {
        generateNumbers( i + 1 );
    }, 1000 );
}

// check for number chosen multiple times
const bestNums = document.querySelectorAll( ".best-nums" );
const bestNumsBonus = document.querySelector( ".best-nums-bonus" );

function bestNumbers ( numbers, bonuses ) {
    best = [];
    bestBonus = [];

    // check which 6 numbers are duplicated most
    const counts = {};
    const bonusCounts = {};

    numbers.forEach( ( x ) => {
        counts[ x ] = ( counts[ x ] || 0 ) + 1;
    } );

    bonuses.forEach( ( x ) => {
        bonusCounts[ x ] = ( bonusCounts[ x ] || 0 ) + 1;
    } );

    // add those 6 number to arr best
    for ( let i = 0; i < 6; i++ ) {
        let max = Math.max.apply( null, Object.values( counts ) );
        let key = Object.keys( counts ).find( key => counts[ key ] === max );
        // check if best already has key
        if ( best.indexOf( key ) !== -1 ) {
            max = Math.max.apply( null, Object.values( counts ) );
            key = Object.keys( counts ).find( key => counts[ key ] === max );
        } else {
            best.push( key );
            delete counts[ key ];
        }
    }

    // add the number that is duplicated most to bestBonus
    let max = Math.max.apply( null, Object.values( bonusCounts ) );
    let key = Object.keys( bonusCounts ).find( key => bonusCounts[ key ] === max );
    bestBonus.push( key );

    // sort bestBonus array
    bestBonus.sort( ( a, b ) => a - b );

    // sort best array
    best.sort( ( a, b ) => a - b );

    // assign best numbers to bestNums
    bestNums.forEach( ( bestNum, index ) => {
        setTimeout( () => {
            bestNum.textContent = best[ index ];
        }, 500 * index );
    } );

    // assign best bonus number to bestNumsBonus
    setTimeout( () => {
        bestNumsBonus.textContent = bestBonus[ 0 ];
    }, 2500 );

}