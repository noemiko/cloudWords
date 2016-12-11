import { Point } from './Point';
import { Word } from './Word';
import { Words } from './Words';
import { Rectangle } from './Rectangle';

export class CloudGenerator {
    private canvas : CanvasRenderingContext2D;

 constructor(text:string, canvas:CanvasRenderingContext2D) { 
     this.canvas = canvas;
     let words = new Words(text);
     let wordsStructure = words.getWords();
     this.generateCloud(wordsStructure);
     console.log(wordsStructure)
}

private generateCloud(words:Word[]){
    let rotate =90 * (Math.PI / 180);

    words.forEach(word=>{

        this.setTextOptionsOnCanvas(word, this.canvas);

        word.width= this.canvas.measureText(word.text).width;
        let coordinations:Rectangle = this.getStartedCoordination(word, this.canvas)

         while(true){
            let newCordination = this.getNewCoordinationsWhenOccupied(coordinations, word , this.canvas);
            if (newCordination === null) { 
                break;
            }
            coordinations = newCordination;
        }
        this.canvas.save();  
        this.canvas.translate(coordinations.leftUp.x , coordinations.leftUp.y);
        if(word.isRotated ===true){
            this.canvas.textAlign = "left";
            this.canvas.textBaseline = "alphabetic";
            this.canvas.rotate(rotate);
        }
        this.canvas.fillText(word.text, 0, 0);  
        this.canvas.restore();
    })
}

public getImageUri(){
    return this.canvas.canvas.toDataURL();
}


private getNewCoordinationsWhenOccupied(coordination:Rectangle, word:Word, ctx:CanvasRenderingContext2D){
    let rectangleText = this.getTextAreaPixels(word,coordination,ctx)
    console.log(coordination)
    let row = 0;
    let column = 0;
    for(let pixel= 0;pixel < word.width * word.size* 4;pixel=pixel+4){
        column+=1;
        
       if(rectangleText.data[pixel]>0) {
           return this.getCoordinationsNextToColision(row, column, word, coordination, pixel); 
       }
    }
    return null;
}

private getTextAreaPixels(word:Word,coordination:Rectangle, ctx:CanvasRenderingContext2D){
   if(word.isRotated===true){
       return ctx.getImageData(coordination.leftUp.x, coordination.leftUp.y, word.size, word.width);
       }
    else{
       return ctx.getImageData(coordination.leftUp.x, coordination.leftUp.y, word.width, word.size);  
    }
}

private getCoordinationsNextToColision(row,column, word:Word, coordination:Rectangle, pixel:number){
    if(pixel/4 % word.width===0){
        row+= 1;
        column = 0;  
               }
    let change = 2;
               if(column<=word.width/2){
                   // kolizja z lewej
                    coordination.leftUp.x += change;
                    coordination.rightDown.x += change;
                }else{
                   // kolizja z prawej
                    coordination.leftUp.x -= 15;
                    coordination.rightDown.x -= 15;
                }
           
                if(row<=word.size/2 ){
                   //kolizja u góry
                    coordination.leftUp.y += change;
                    coordination.rightDown.y += change;
                }else{
                    //kolizja na dole
                     coordination.leftUp.y -= change;
                     coordination.rightDown.y -= change;
                }
    return coordination
};

private getStartedCoordination(word:Word, ctx:CanvasRenderingContext2D):Rectangle{
   let cos = Math.cos,
       sin = Math.sin,
       radius:number = 150;
    
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

    let x = pt_x+ 300;
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
    ctx.font = word.size+"px "+word.font;
    ctx.textAlign = "start";
    ctx.textBaseline = "hanging";
    ctx.fillStyle =word.color;
    ctx.scale(1,1)
}

} 

