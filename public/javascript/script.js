const list = document.querySelectorAll('.list-item-desc');
const title = document.querySelectorAll('.list-item-general h4');
list.forEach((item) => {
    let sizeText = item.innerHTML.length;
    if (sizeText > 400) {
        item.textContent = item.textContent.substring(0, 400).trimEnd()+'...'
    };
});

title.forEach((item) => {
    let sizeText = item.innerHTML.length;
    if (sizeText > 35) {
        item.textContent = item.textContent.substring(0, 32).trimEnd()+'...'
    };
});

const sizeList = document.querySelectorAll('.list-item-rating').length;
document.getElementById('total').textContent = sizeList; 

let lastChange = document.querySelectorAll('.list-item-date span');
lastChange.forEach((date) => {
    let format = (new Date(parseInt(date.textContent))).toString();
    format = format.split('G')[0];
    date.innerHTML = format
});

function colorReview(rate) {
    var red;
    var green;
    var blue;
    var finalArray = [];
    if(rate > 80) {        
        red = Math.floor((rate - 100) * -5); /* 0 e 100 */
        green = Math.floor(((rate - 100) * -4.65) + 100); /* 128 e 221 deixei mais escuro, 100/128 */
        blue = (rate - 100) *-1; /* 0 a 0 */
    } else if(rate > 60) {
        red =  Math.floor((rate - 80) * -5.75) + 100; /* 100 e 255 */
        green = Math.ceil(((rate - 80) * -0.65) + 221); /* 221, 234 */
        blue =  Math.ceil((rate - 80) * -1);/*0 to 20 */
    } else if(rate > 40) {
        red = 255;
        green = Math.floor(234 - ((rate - 60) * -5));
        blue = 0;
    } else if(rate > 20) {
        red = Math.floor(255 - ((rate - 40) * -2));
        green = Math.ceil(134 - ((rate - 40) * -6.7));
        blue = 0;
    } else { 
        red = Math.ceil(215 - ((rate - 20) * -4));
        green = Math.floor((rate - 20) * -0.75);
        blue = Math.floor((rate - 20) * -0.75);
    }

    finalArray.push(red, green, blue);
    return finalArray;

}

const atualRateArray = document.querySelectorAll('.list-item-rate');
atualRateArray.forEach((item)=> {
    let rate = parseFloat(item.textContent) * 10;
    let fontColor = colorReview(rate);
    item.style = `color: rgb(${fontColor[0]}, ${fontColor[1]}, ${fontColor[2]})`
});


        // rgb(0,128,0) 100, 
        // rgb(100,221,23) 80, 
        // rgb(255,234,0) 60, 
        // rgb(255,134,0) 40,
        // rgb(215,0,0) 20,
        // rgb(135,15,15) 0);
