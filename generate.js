const lottoNumbers = document.querySelectorAll( ".lotto-numbers" );
const lottoType = document.querySelector( "#lotto-type" );
let genCount = 0;
let allNumbers = [];
let i = 1;
let best = [];

const generateBtn = document.querySelector( "#generate-btn" );
const tryCount = document.querySelector( "#try-count" );

generateBtn.addEventListener( "click", () => {
    generateNumbers( i );

    // reset
    i = 1;
    allNumbers = [];
    best = [];
    bestNums.forEach( bestNum => bestNum.textContent = "" );
    genCount = 0;
} );

function generateNumbers ( i ) {
    if ( i > lottoType.value ) {
        // call bestNumbers
        bestNumbers( allNumbers );
        return;
    }

    let numbers = [];

    for ( let i = 0; i < 6; i++ ) {
        let number = Math.floor( Math.random() * 52 ) + 1;

        if ( numbers.indexOf( number ) === -1 ) {
            numbers.push( number );
        } else {
            i--;
        }
    }

    console.log( numbers );

    numbers.sort( ( a, b ) => a - b );

    lottoNumbers.forEach( ( lottoNumber, index ) => {
        setTimeout( () => {
            // change background color of lottoNumber
            lottoNumber.style.backgroundColor = "green";
            // change text of lottoNumber
            lottoNumber.style.color = "white";
            lottoNumber.textContent = numbers[ index ];
        }, 200 * index );
    } );

    lottoNumbers.forEach( ( lottoNumber, index ) => {
        setTimeout( () => {
            // change background color of lottoNumber
            lottoNumber.style.backgroundColor = "red";
            lottoNumber.textContent = numbers[ index ];
        }, 300 * index );
    } );

    lottoNumbers.forEach( ( lottoNumber, index ) => {
        setTimeout( () => {
            // change background color of lottoNumber
            lottoNumber.style.backgroundColor = "yellow";
            lottoNumber.textContent = numbers[ index ];
        }, 100 * index );
    } );



    // add numbers to allNumbers
    allNumbers.push( ...numbers );
    tryCount.textContent = i;

    // recall 
    setTimeout( () => {
        generateNumbers( i + 1 );
    }, 1000 );
}

// check for number chosen multiple times
const bestNums = document.querySelectorAll( ".best-nums" );

function bestNumbers ( numbers ) {
    best = [];

    // check which 6 numbers are duplicated most
    const counts = {};

    numbers.forEach( ( x ) => {
        counts[ x ] = ( counts[ x ] || 0 ) + 1;
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

    // sort best array
    best.sort( ( a, b ) => a - b );

    // assign best numbers to bestNums
    bestNums.forEach( ( bestNum, index ) => {

        setTimeout( () => {
            bestNum.textContent = best[ index ];
        }, 500 * index );
    } );
}