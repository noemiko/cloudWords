import { Point } from './Point';
import { Word } from './Word';
import { Words } from './Words';
import { Rectangle } from './Rectangle';

export class CloudGenerator {
    private canvas : CanvasRenderingContext2D;

 constructor(wordsStructure:Word[], canvas:CanvasRenderingContext2D) { 
     this.canvas = canvas;
     this.generateCloud(wordsStructure, this.canvas);
}

private generateCloud(words:Word[], canvas:CanvasRenderingContext2D){
    this.cleanCanvas(canvas);

    words.forEach(word=>{

        this.setTextOptionsOnCanvas(word, canvas);

        word.width= canvas.measureText(word.text).width;
        
        let coordinates:Rectangle= this.getEmptyCoordinatesAtCanvas(word, canvas)
        this.drawWordOnCanvas(canvas, coordinates, word);

    })
}

private cleanCanvas(canvas:CanvasRenderingContext2D){
  canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
}

private drawWordOnCanvas (canvas:CanvasRenderingContext2D, coordinates:Rectangle, word:Word ):void{
    canvas.save();  
    canvas.translate(coordinates.leftUp.x , coordinates.leftUp.y);
    if(word.degrees >0){
        canvas.rotate(word.degrees);
    }
    canvas.fillText(word.text, 0, 0);  
    canvas.restore();
}

private getEmptyCoordinatesAtCanvas(word:Word, canvas:CanvasRenderingContext2D):Rectangle{
    let coordinates:Rectangle = this.getStartedCoordinates(word, canvas)
    
        return this.getEmptyCoordinates(coordinates,word, canvas);
        
        //if(!this.isOutOfCanvas(coordinates, canvas)){
          //  return coordinates;
        //}else{
         //   return this.getEmptyCoordinatesAtCanvas(word, canvas);
        //}    
}

private getEmptyCoordinates(coordinates, word, canvas){
    while(true){
            let newCordinates = this.getNewCoordinatesWhenOccupied(coordinates, word , canvas);

            if (newCordinates === null) { 
                break;
            }
            coordinates = newCordinates;
        }
        return coordinates
}
private isOutOfCanvas(coordinates:Rectangle,ctx:CanvasRenderingContext2D):boolean{
    if(coordinates.leftUp.x<0||coordinates.leftUp.y<0||
        coordinates.leftUp.x>ctx.canvas.width||coordinates.leftUp.y>ctx.canvas.height){
        return true;
    }
    else if(coordinates.rightDown.x<0||coordinates.rightDown.y<0||
        coordinates.rightDown.x>ctx.canvas.width||coordinates.rightDown.y>ctx.canvas.height){
            return true;
        }
        return false;
}
public getImageUri(){
    return this.canvas.canvas.toDataURL();
}

private getNewCoordinatesWhenOccupied(coordinates:Rectangle, word:Word, ctx:CanvasRenderingContext2D){
    let rectangleText = this.getTextAreaPixels(word,coordinates,ctx)
    let row = 0;
    let column = 0;
    for(let pixel= 0;pixel < word.width * word.size* 4;pixel=pixel+4){
        column+=1;
        
       if(rectangleText.data[pixel]>0) {
           return this.getCoordinatesNextToColision(row, column, word, coordinates, pixel); 
       }
    }
    return null;
}

private getTextAreaPixels(word:Word,coordinates:Rectangle, ctx:CanvasRenderingContext2D){
   if(word.isRotated===true){
       return ctx.getImageData(coordinates.leftUp.x, coordinates.leftUp.y, word.size, word.width);
       }
    else{
       return ctx.getImageData(coordinates.leftUp.x, coordinates.leftUp.y, word.width, word.size);  
    }
}

private getCoordinatesNextToColision(row,column, word:Word, coordinates:Rectangle, pixel:number){
    if(pixel/4 % word.width===0){
        row+= 1;
        column = 0;  
               }
    let change = 2;
               if(column<=word.width/2){
                   // kolizja z lewej
                    coordinates.leftUp.x += 20;
                    coordinates.rightDown.x += 20;
                }else{
                   // kolizja z prawej
                    coordinates.leftUp.x -= 20;
                    coordinates.rightDown.x -= 20;
                }
                if(row<=word.size/2 ){
                   //kolizja u góry
                    coordinates.leftUp.y += change;
                    coordinates.rightDown.y += change;
                }else{
                    //kolizja na dole
                     coordinates.leftUp.y -= change;
                     coordinates.rightDown.y -= change;
                }
    return coordinates
};

private getStartedCoordinates(word:Word, ctx:CanvasRenderingContext2D):Rectangle{
   let cos = Math.cos,
       sin = Math.sin,
       radius:number = 150;
    
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

    let x = pt_x+ 400;
    let y = pt_y + 300;

    let x2;
    let y2;
    if(word.isRotated===true){
        y2 =Math.floor(y+word.size*0.8);
        x2 = Math.floor(x+word.width); 
        
    }else{
        y2 =Math.floor(y+word.width);
        x2 = Math.floor(x+word.size*0.8); 
    }
    return new Rectangle(new Point(x,y),new Point(x2,y2))
}

private setTextOptionsOnCanvas(word:Word, ctx:CanvasRenderingContext2D){ 
    if(word.degrees>0){
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
    }else{
        ctx.textAlign = "start";
        ctx.textBaseline = "hanging";
    }
    ctx.font = word.size+"px "+word.font;
    ctx.fillStyle =word.color;
}

} 

