var PixelArt = require('pixel-art');


// var nyan = PixelArt.art(`\
//                   BBBBBBBBBBBBBBBBB
//                  B-----------------B
//                 B--**************---B
//     rrrr    rrrrB--******@**@*****--B
// rrrrrrrrrrrrrrrrB-**@**************-B
// rrrroooorrrrooooB-**********BB*@***-B BB
// ooooooooooooooooB-*********B..B****-BB..B
// ooooyyyyooBBBByyB-******@**B...B***-B...B
// yyyyyyyyyyB..BByB-*********B....BBBB....B
// yyyyggggyyBB..BBB-***@*****B............B
// gggggggggggBB..BB-********B..............B
// ggggbbbbggggBB..B-*@******B...^B.....^B..B
// bbbbbbbbbbbbbBBBB-******@*B...BB...B.BB..B
// bbbbmmmmbbbbmmmBB-********B.**.........**B
// mmmmmmmmmmmmmmmmB--*@*****B.**.B..B..B.**B
// mmmm    mmmm    B---*******B...BBBBBBB..B
//                BBB----------B..........B
//               B...BBBBBBBBBBBBBBBBBBBBB
//               B..BB B..B     B..B B..B
//               BBBBB BBB       BBB  BB\
// `)
// // each letter should have its own distinct colour
// // procedurally generating a pallette is a cool thing to do
//   .palette({
//     'r': 'red',
//     'o': 'orange',
//     'y': 'yellow',
//     'g': '#0f0',
//     'b': '#55f',
//     'm': '#909',
//     'B': 'black',
//     '.': '#ddd',
//     '-': '#ffa',
//     '*': '#f8e',
//     '@': '#b09',
//     '^': 'white'
//   })
//   .pos({ x: 0, y: 0 })
//   .scale(6)
//   .draw(canvas.getContext('2d'));


// var nyanCode = ' 18B17{} 17B-17B{} 16B-2*14-3B{} 4r4 4r4B-2*6@*2@*5-2B{}r16B-*2@*14-B{}r4o4r4o4B-*10B2*@*3-B B2{}o16B-*9B.2B*4-B2.2B{}o4y4o2B4y2B-*6@*2B.3B*3-B.3B{}y10B.2B2yB-*9B.4B4.4B{}y4g4y2B2.2B3-*3@*5B.12B{}g11B2.2B2-*8B.14B{}g4b4g4B2.2B-*@*6B.3^B.5^B.2B{}b13B4-*6@*B.3B2.3B.B2.2B{}b4m4b4m3B2-*8B.*2.9*2B{}m16B-2*@*5B.*2.B.2B.2B.*2B{}m4 4m4 4B-3*7B.3B7.2B{} 15B3-10B.10B{} 14B.3B21{} 14B.2B2 B.2B 5B.2B B.2B{} 14B5 B3 7B3 2B2[]r(red)o(orange)y(yellow)g(#0f0)b(#55f)m(#909)B(black).(#ddd)-(#ffa)*(#f8e)@(#b09)^(white)'
// nyanCode was generated with `nyan.toString()`

// Loading decoded string to image
// nyan = new PixelArt().fromString(nyanCode).pos({ x: 0, y: 0 }).scale(6);
// var image = document.createElement('img')
// image.src = nyan.export();
// document.querySelector('#image').appendChild(image);


// todo: come up with a nicer palette
let defaultPalette = {
    'r': 'red',
    'o': 'orange',
    'y': 'yellow',
    'g': '#0f0',
    'b': '#55f',
    'm': '#909',
    // 'B': 'black',
    '.': '#ddd',
    '-': '#ffa',
    '*': '#f8e',
    '@': '#b09',
    '^': 'white'
}

let bwPalette = {
    '1': 'black',
    '0': 'white'
}

let chosenPalette = defaultPalette;

let stripPunctuation = (inputString) => {
    // console.log('stripPunctuation', inputString);
    return inputString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}

// takes in song lyrics as an array of words
// outputs a string with each word mapped to a letter from the palette
// (i.e. input to drawPixelArt)
// e.g. [players, gonna, play, play, play, play, play] =>
// 'royyyyy'
let crunchWords = (words) => {
    // console.log('crunchWords', words);
    let paletteIndex = 0;
    let palette = Object.keys(chosenPalette);
    // console.log('palette', palette);
    let pixelMap = [];
    // generate mapping of words => letters
    for (let word of words){
        if (!pixelMap[word]){
            pixelMap[word] = palette[paletteIndex];
            paletteIndex = (paletteIndex + 1) % palette.length; 
            // loop back around once you run out of colours
        }
    }
    // iterate over lyrics, applying mapping
    // console.log('crunchWords pixelmap: ', pixelMap)
    return words.map(word => {
        // console.log('crunchWords mapping: ', word, pixelMap[word]);
        return pixelMap[word]
    }).join('');
}

// given a string, e.g. 'abcdacdc'
// returns a square with the same string along the top and sides:
// abcdacdc
// b
// c
// d
// a
// c
// d
// c

// fills the square in wherever the letter along the top and along the side match
// i.e.
// a
//  b
//   c  c c
//    d  d
//     a
//   c  c d
//    d  d
//   c  c c

// question: leave original word along top/side?
let stringToSquare = (word) => {
    // console.log('stringToSquare', word);
    let length = word.length;
    let box = new Array(length);
    for (let i = 0; i < length; i++){
        box[i] = new Array(length);
    }

    for (let i = 0; i < length; i++){
        for (let j = 0; j < length; j++){
            if (word[i] === word[j]){
                box[i][j] = word[i];
            } else {
                box[i][j] = ' ';
            }
        }
    }

    boxAsString = '';
    for (let i = 0; i < length; i++){
        boxAsString = boxAsString.concat(box[i].join(''));
        boxAsString = boxAsString.concat('\n');
    }
    return boxAsString;
}

let drawPixelArt = (word) => {
    // console.log('drawPixelArt: ', word);

    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    let testbox = PixelArt.art(stringToSquare(word)).palette(chosenPalette)
        .pos({ x: 0, y: 0 }).scale(4).draw(canvas.getContext('2d'));
    
    // var image = document.createElement('img')
    // image.src = testbox.export();
    // document.querySelector('#image').appendChild(image);
}

// adds pixels to the screen
// problem: doesn't remove them afterwards, so they just pile up
let randomTest = () => {
    chosenPalette = defaultPalette;
    let possibleLetters = "roybgm";
    let randomWord = "";
    for (let i = 0; i < 32; i++){
        randomWord = randomWord.concat(possibleLetters.substr(Math.floor(Math.random() * possibleLetters.length)), 1);
    }
    drawPixelArt(randomWord);
}

let runTests = () => {
    let tests = [
        unitTest('stringSquare base case', () => {
            return stringToSquare('a')
        }, 'a\n'),
        
        unitTest('stringSquare 2x2', () => {
            return stringToSquare('ab')
        }, 'a \n b\n'),
        
        unitTest('stringSquare 3x3 1 repeat', () => {
            return stringToSquare('aba')
        }, 'a a\n b \na a\n'),
        
        unitTest('shake default', () => {
            chosenPalette = defaultPalette;
            return crunchWords(['players', 'gonna', 'play', 'play', 'play', 'play', 'play']);
        }, 'royyyyy'),
        
        unitTest('shake bw', () => {
            chosenPalette = bwPalette;
            return crunchWords(['players', 'gonna', 'play', 'play', 'play', 'play', 'play']);
        }, '0100000')
    ]

    let allTestsPass = tests.reduce((acc, cur)=>acc && cur);
    if (allTestsPass){
        console.log('all unit tests pass!');
    }
}

// given a test (function), with a name and an expected value,
// executes the test, then prints an error message if the expected value
// differs from the result
// test must take no parameters (can be wrapped in an arrow function prior to being sent to unitTest)
let unitTest = (name, test, expected) => {
    if (test() !== expected){
        console.error(`Unit test ${name} failed, result "${test()}" differs from expected result "${expected}"`);
        return false;
    }
    return true;
}

let bindUIElements = () => {
    document.getElementById("clickMe").addEventListener("click", randomTest, false);
    document.getElementById("start").addEventListener("click", go, false);
}

let go = () => {
    let lyrics = document.getElementById("lyrics").value;
    drawPixelArt(crunchWords(stripPunctuation(lyrics.toUpperCase()).split(' ')));
}

runTests();

chosenPalette = defaultPalette;
bindUIElements();
