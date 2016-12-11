import { Point } from './Point';
import { Rectangle } from './Rectangle';

export class CloudGenerator {
    private canvas : CanvasRenderingContext2D;
 constructor(text:string, canvas:CanvasRenderingContext2D) { 
     this.canvas = canvas;
     let wordsStructure = this.getTextStructure(text);

     console.log(wordsStructure)
}

private getTextStructure(text:string):any[][]{
    if (this.isTextCsv(text)){
          return this.getTextStructureWithSpecifiedSizes(text);
     }else{
         return this.getTextStructureWithRandomSizes(text)
     }
}

private isTextCsv(text){
    return text.indexOf(',') !== -1;
}

private getTextStructureWithSpecifiedSizes(text:string):any[][]{
    let wordsWithSize:any[][] = []
    let textRows:any[] = text.split('\n');

     textRows.forEach(wordRow =>{
       let wordWithSize = wordRow.split(',');
      wordsWithSize.push([wordWithSize[0],Number(wordWithSize[1]));
    })
    return wordsWithSize;
}

private getTextStructureWithRandomSizes(text:string):any[][]{
    let wordsWithSize:any[][]=[];
    let words:string[] = text.split(' ');
   
    words.forEach(word=>{
        let randomSize = Math.floor(Math.random() * 70+10);
        wordsWithSize.push([word,randomSize]);
    })
    return wordsWithSize;   
}

} 

