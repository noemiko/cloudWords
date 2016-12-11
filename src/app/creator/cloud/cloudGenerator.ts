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
    let isRotate = true;
    words.forEach(word=>{
        this.setTextOptionsOnCanvas(word, this.canvas);

        word.width= this.canvas.measureText(word.text).width;
        this.getStartedCoordination(word, isRotate, this.canvas)
        isRotate =! isRotate;
    })
}

getStartedCoordination(word:Word,isRotate:boolean, ctx:CanvasRenderingContext2D):Rectangle{
   let cos = Math.cos,
       sin = Math.sin,
       text:string = word.text,
       size: number = word.size,
       width:number = word.width,
       radius:number = 150;
    
    var pt_angle = Math.random() * 2 * Math.PI;
    var pt_radius_sq = Math.random() * radius * radius;
    var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
    var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

    let x = pt_x+ctx.canvas.width / 2-100;
    let y = pt_y + ctx.canvas.height / 2-100;

    let x2;
    let y2;
    if(isRotate===true){
        y2 =Math.floor(y+size*0.8);
        x2 = Math.floor(x+width); 
        
    }else{
        y2 =Math.floor(y+width);
        x2 = Math.floor(x+size*0.8); 
    }

    return new Rectangle(new Point(x,y),new Point(x2,y2))
}

setTextOptionsOnCanvas(word:Word, ctx:CanvasRenderingContext2D){ 
    ctx.font = word.size+"px "+word.font;
    ctx.textAlign = "start";
    ctx.textBaseline = "hanging";
    ctx.fillStyle =word.color;
}

} 

