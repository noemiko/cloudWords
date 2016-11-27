function createCanvasWithWordCloud() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    createTextCloud(ctx);
};

function getTextWithSizeArray(numberOfIterations, maxSize, minSize){
    let array =[]
    for(let i=0;i<numberOfIterations;i+=1){
        
       array.push(['Text'+i,Math.random()*maxSize+minSize]) 
    }
    return array;
}
function createTextCloud(ctx){
    createWords(1, 70, 70, ctx);
    createWords(20,20, 20, ctx);
    createWords(40,15, 5, ctx);
}
function createWords(numberOfIterations, maxSize,minSize,ctx){
    let isRotate =true;
    let angle= 0,
        radius= 0;
    let userTexts = getTextWithSizeArray(numberOfIterations, maxSize,minSize);
    let startPoint = {x:ctx.canvas.width/2-150,
                      y:ctx.canvas.height/2-100}
    
    userTexts.forEach(textOptions=>{
        setTextOptionsOnCanvas(textOptions, ctx);
        angle += ((Math.PI * 2) /5);
        radius += 5;
        textOptions[2]= ctx.measureText(textOptions[0]).width;
        
        let coordinations = getSpiralCoordination(textOptions, isRotate, ctx);
        
         isRotate =! isRotate;
       rotate=90 * (Math.PI / 180);
        
        while(true){
            let newCordination = getNewCoordinationsWhenOccupied(coordinations, textOptions,isRotate, ctx);
            if (newCordination === null) { 
                break;
            }
            coordinations = newCordination;
        }
        
        ctx.save();  
     
    ctx.translate(coordinations.x , coordinations.y);
      if(isRotate===true){
     ctx.textAlign = "left";
     ctx.textBaseline = "alphabetic";
     ctx.rotate(rotate);
  
      }
     ctx.fillText(textOptions[0], 0, 0);  
    ctx.restore();
 
        
  // setRedPointsInTheCorners(coordinations.x, coordinations.y,coordinations.x2,coordinations.y2, ctx)
       
    });
}
function getNewCoordinationsWhenOccupied(coordination, textOptions,isRotate, ctx){
    let width = Math.floor(textOptions[2]);
    let size =  Math.floor(textOptions[1]);
    let rectangleText;
    if(isRotate===true){
       rectangleText = ctx.getImageData(coordination.x,coordination.y,size, width);
       }
    else{
       rectangleText = ctx.getImageData(coordination.x,coordination.y,width, size);  
    }
   
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
    let change = 5;
               if(column<=width/2){
                   // kolizja z lewej
                    coordination.x+= change;
                    coordination.x2+= change;
                }else{
                   // kolizja z prawej
                    coordination.x-= 15;
                    coordination.x2-= 15;
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

function getSpiralCoordination(textOptions,isRotate, ctx){
   let cos = Math.cos,
       sin = Math.sin,
       word = textOptions[0],
       size = textOptions[1]*0.9,
       width = textOptions[2],
       radius = 150;
    
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

    let x = pt_x+ctx.canvas.width / 2-100;
    let y = pt_y + ctx.canvas.height / 2-70
    let x2;
    let y2;
    console.log(isRotate);
    if(isRotate===true){
        y2 =Math.floor(y+size*0.8);
        x2 = Math.floor(x+width); 
        
    }else{
        y2 =Math.floor(y+width);
        x2 = Math.floor(x+size*0.8); 
    }

    return {x:x, y:y, x2:x2, y2:y2};
}



function setTextOptionsOnCanvas(textOptions,ctx){ 
    let size = textOptions[1];
    ctx.font = size+"px "+getRandomFont();
    ctx.textAlign = "start";
    ctx.textBaseline = "hanging";
    ctx.fillStyle ='red';
        //getRandomColor();
    let rotate=90 * (Math.PI / 180);
    
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