var PixelArt = require('pixel-art');

// todo: figure out how to put this in a separate file
let stringToSquare = (word) => {
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



// map each word to a character
// make a grid
var nyan = PixelArt.art(`\
                  BBBBBBBBBBBBBBBBB
                 B-----------------B
                B--**************---B
    rrrr    rrrrB--******@**@*****--B
rrrrrrrrrrrrrrrrB-**@**************-B
rrrroooorrrrooooB-**********BB*@***-B BB
ooooooooooooooooB-*********B..B****-BB..B
ooooyyyyooBBBByyB-******@**B...B***-B...B
yyyyyyyyyyB..BByB-*********B....BBBB....B
yyyyggggyyBB..BBB-***@*****B............B
gggggggggggBB..BB-********B..............B
ggggbbbbggggBB..B-*@******B...^B.....^B..B
bbbbbbbbbbbbbBBBB-******@*B...BB...B.BB..B
bbbbmmmmbbbbmmmBB-********B.**.........**B
mmmmmmmmmmmmmmmmB--*@*****B.**.B..B..B.**B
mmmm    mmmm    B---*******B...BBBBBBB..B
               BBB----------B..........B
              B...BBBBBBBBBBBBBBBBBBBBB
              B..BB B..B     B..B B..B
              BBBBB BBB       BBB  BB\
`)
// each letter should have its own distinct colour
// procedurally generating a pallette is a cool thing to do
  .palette({
    'r': 'red',
    'o': 'orange',
    'y': 'yellow',
    'g': '#0f0',
    'b': '#55f',
    'm': '#909',
    'B': 'black',
    '.': '#ddd',
    '-': '#ffa',
    '*': '#f8e',
    '@': '#b09',
    '^': 'white'
  })
  .pos({ x: 0, y: 0 })
  .scale(6)
  .draw(canvas.getContext('2d'));

let defaultPalette = {
    'r': 'red',
    'o': 'orange',
    'y': 'yellow',
    'g': '#0f0',
    'b': '#55f',
    'm': '#909',
    'B': 'black',
    '.': '#ddd',
    '-': '#ffa',
    '*': '#f8e',
    '@': '#b09',
    '^': 'white'
}

// var nyanCode = ' 18B17{} 17B-17B{} 16B-2*14-3B{} 4r4 4r4B-2*6@*2@*5-2B{}r16B-*2@*14-B{}r4o4r4o4B-*10B2*@*3-B B2{}o16B-*9B.2B*4-B2.2B{}o4y4o2B4y2B-*6@*2B.3B*3-B.3B{}y10B.2B2yB-*9B.4B4.4B{}y4g4y2B2.2B3-*3@*5B.12B{}g11B2.2B2-*8B.14B{}g4b4g4B2.2B-*@*6B.3^B.5^B.2B{}b13B4-*6@*B.3B2.3B.B2.2B{}b4m4b4m3B2-*8B.*2.9*2B{}m16B-2*@*5B.*2.B.2B.2B.*2B{}m4 4m4 4B-3*7B.3B7.2B{} 15B3-10B.10B{} 14B.3B21{} 14B.2B2 B.2B 5B.2B B.2B{} 14B5 B3 7B3 2B2[]r(red)o(orange)y(yellow)g(#0f0)b(#55f)m(#909)B(black).(#ddd)-(#ffa)*(#f8e)@(#b09)^(white)'
// nyanCode was generated with `nyan.toString()`

// Loading decoded string to image
// nyan = new PixelArt().fromString(nyanCode).pos({ x: 0, y: 0 }).scale(6);
// var image = document.createElement('img')
// image.src = nyan.export();
// document.querySelector('#image').appendChild(image);

let drawPixelArt = (word) => {
    let testbox = PixelArt.art(stringToSquare(word)).palette(defaultPalette)
        .pos({ x: 0, y: 0 }).scale(6).draw(canvas.getContext('2d'));
    
    var image = document.createElement('img')
    image.src = testbox.export();
    document.querySelector('#image').appendChild(image);
}

drawPixelArt("roryboy");

// todo: condense lyrics (words) into a mash of letters
// give it a nice UI