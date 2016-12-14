import { Point } from './Point';
import { Word } from './Word';

export class Words {
    private text:string;
    private words:Word[]

constructor() {
       
    }
public generateStructure(text:string){
         this.words = this.setTextStructure(text);
    }
public getTextStructure():Word[]{
        return this.words;
    }

private setTextStructure(text:string):Word[]{
    text = this.cleanText(text);
    let textStructure:Word[];
    
    textStructure = this.getTextStructureWithRandomSizes(text)
    
    return this.setIsWordRotatedAndNumber(textStructure);
}

private cleanText(text:string):string{
    text = text.replace (/,/g, "");
    text = text.replace (/\r?\n|\r/, "");
    return text;
}

private setIsWordRotatedAndNumber(textStructure:Word[]):Word[]{
    let isRotate:boolean = false;
    let counter:number = 0
    textStructure.forEach(word=>{
        word.isRotated= isRotate;
        word.id = counter;
        if( isRotate){
             word.degrees = 90 * (Math.PI / 180);
        }else{
            word.degrees = 0;
        }
       
        isRotate =! isRotate;
        counter+=1;
    })
    return textStructure;
}

private getTextStructureWithRandomSizes(text:string):Word[]{
    let wordsWithSize:Word[]=[];
    let words:string[] = text.split(' ');
   
   words = words.filter(value => value.length !== 0);

    words.forEach(word=>{
        wordsWithSize.push( new Word(word));
    })
    return wordsWithSize;   
}

}