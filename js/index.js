function createCanvasWithWordCloud(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    createTextCloud(ctx);
};

function getTextWithSizeArray(){
    let array =[]
    for(let i=0;i<50;i+=1){
        
       array.push(['Marek'+i,Math.random()*50+8]) 
    }
    return array;
    
}

function createTextCloud(ctx){
    
    let angle= 0,
        radius= 0;
    let userTexts = getTextWithSizeArray();
    let startPoint = {x:ctx.canvas.width/2-150,
                      y:ctx.canvas.height/2-100}
    
    userTexts.forEach(textOptions=>{
        setTextOptionsOnCanvas(textOptions, ctx);
        angle += ((Math.PI * 2) /5);
        radius += 5;
        textOptions[2]= ctx.measureText(textOptions[0]).width;
        
        let coordinations = getSpiralCoordination(startPoint, textOptions, angle, radius,ctx);
        
        while(true){
            let new_cor = isOccupied(coordinations, textOptions, ctx);
            if (new_cor === null) { 
                break;
            }
            coordinatons = isOccupied(coordinations, textOptions, ctx);
        }
      //  setRedPointsInTheCorners(coordinations.x, coordinations.y,coordinations.x2,coordinations.y2, ctx)
        ctx.fillText(textOptions[0], coordinations.x, coordinations.y); 
    });
}
function isOccupied(coordination, textOptions, ctx){
    let width = Math.floor(textOptions[2]);
    let size =  Math.floor(textOptions[1]);
    let rectangleText = ctx.getImageData(coordination.x,coordination.y,width, size);
    let row = 0;
    let column = 0;
    for(let i= 0;i < width * size*4;i=i+4){
        column+=1;
        
       if(rectangleText.data[i]) {

           return getCoordinationsNextToCOlision(row,column,width,size,coordination,i); 
       }
    }
    return null;
}

function getCoordinationsNextToCOlision(row,column,width,size,coordination,i){
    if(i/4%width===0){
        row+= 1;
        column = 0;
                  // console.log(row);
                   //console.log('piksel'+i/4)    
               }
    let change = 1;
               if(column<=width/2){
                   // kolizja z lewej
                    coordination.x+= change;
                    coordination.x2+= change;
                }else{
                   // kolizja z prawej
                    coordination.x-= change;
                    coordination.x2-= change;
                }
           
                if(row<=size/2 ){
                   //kolizja u góry
                    coordination.y+= change;
                    coordination.y2+= change;
                }else{
                    //kolizja na dole
                     coordination.y-= change;
                     coordination.y2-= change;
                }
    return coordination
};

function setRedPointsInTheCorners(x, y,endX,endY, ctx){
    point(x, y, ctx);
    point(x+1, y, ctx);
    point(x, y+1, ctx);
    point(x, y+2, ctx);
    point(x+2, y, ctx);
    point(endX, endY, ctx);
    point(endX+1, endY, ctx);
    point(endX, endY+1, ctx);
}


function point(x, y, canvas){
  canvas.beginPath();
  canvas.moveTo(x,y);
  canvas.lineTo(x+1,y+1);
  canvas.strokeStyle = '#ff0000';
  canvas.stroke();
}

function getProbablyEmptyCoordinations(coordinatons,ctx){
    let text = textOptions[0];
    let sizeText = textOptions[1];

    let coordinations = getEmptyCoordinations(textOptions, ctx);
     return {x:20,y:20}
}

function getSpiralCoordination(startPoint, textOptions, angle, radius,ctx){
   let cos = Math.cos,
       sin = Math.sin,
       word = textOptions[0],
       size = textOptions[1]*0.9,
       width = textOptions[2];

    let x = startPoint.x+ radius * Math.cos(angle);
    let y = startPoint.y+ radius * Math.sin(angle);
    
    let x2 =x + width;
    let y2 =y + size;
    //setRedPointsInTheCorners(x, y,x2,y2, ctx)
    return {x:x, y:y, x2:x2, y2:y2};
}



function setTextOptionsOnCanvas(textOptions,ctx){ 
    let size = textOptions[1];
    ctx.font = size+"px "+getRandomFont();
    ctx.textAlign = "start";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = getRandomColor();
    let      rotate=90 * (Math.PI / 180);
    
}

function getRandomColor(){
   let r = Math.floor(Math.random() * 255) + 50;
   let g = Math.floor(Math.random() * 255) + 50;
   let b = Math.floor(Math.random() * 255) + 50;

   return 'rgba(' + r + ',' + g + ',' + b +',1.0)';
}

function getRandomFont(){
    let fontType = [ "Arial", "Verdana", "Helvetica","Calibri"];
    return fontType[Math.floor(Math.random()*4)];
}
