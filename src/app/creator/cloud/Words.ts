import { Point } from './Point';
import { Word } from './Word';

export class Words {
    private text:string;
    private words:Word[]

    constructor(text:string) {
        this.words = this.setTextStructure(text);
    }
    public getTextStructure():Word[]{
        return this.words;
    }

private setTextStructure(text:string):Word[]{
    let textStructure:Word[];
    if (this.isTextCsv(text)){
          textStructure = this.getTextStructureWithSpecifiedSizes(text);
     }else{
         textStructure = this.getTextStructureWithRandomSizes(text)
     }
     return this.setIsWordRotated(textStructure);
}

private setIsWordRotated(textStructure:Word[]):Word[]{
    let isRotate = false;
    textStructure.forEach(word=>{
        word.isRotated= isRotate;
        if( isRotate){
             word.degrees = 90 * (Math.PI / 180);
        }else{
            word.degrees = 0;
        }
       
        isRotate =! isRotate;
    })
    return textStructure;
}

private isTextCsv(text){
    return text.indexOf(',') !== -1;
}

private getTextStructureWithSpecifiedSizes(text:string):Word[]{
    let wordsWithSize:Word[] = []
    let textRows:any[] = text.split('\n');

     textRows.forEach(wordRow =>{
       let wordWithSize = wordRow.split(',');
      wordsWithSize.push( new Word(wordWithSize[0],Number(wordWithSize[1])));
    })
    return wordsWithSize;
}

private getTextStructureWithRandomSizes(text:string):Word[]{
    let wordsWithSize:Word[]=[];
    let words:string[] = text.split(' ');
   
   words = words.filter(value => value.length !== 0);

    words.forEach(word=>{
        let randomSize = Math.floor(Math.random() * 70+10);
        wordsWithSize.push( new Word(word,randomSize));
    })
    return wordsWithSize;   
}

}