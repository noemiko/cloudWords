import { Point } from './Point';
import { Word } from './Word';

export class Words {
    private text:string;
    private words:Word[]

    constructor(text:string) {
        this.words = this.getTextStructure(text);
    }
    public getWords():Word[]{
        return this.words;
    }

private getTextStructure(text:string):Word[]{
    if (this.isTextCsv(text)){
          return this.getTextStructureWithSpecifiedSizes(text);
     }else{
         return this.getTextStructureWithRandomSizes(text)
     }
}

private isTextCsv(text){
    return text.indexOf(',') !== -1;
}

private getTextStructureWithSpecifiedSizes(text:string):Word[]{
    let wordsWithSize:Word[] = []
    let textRows:any[] = text.split('\n');

     textRows.forEach(wordRow =>{
       let wordWithSize = wordRow.split(',');
      wordsWithSize.push( new Word(wordWithSize[0],Number(wordWithSize[1]));
    })
    return wordsWithSize;
}

private getTextStructureWithRandomSizes(text:string):Word[]{
    let wordsWithSize:Word[]=[];
    let words:string[] = text.split(' ');
   
    words.forEach(word=>{
        let randomSize = Math.floor(Math.random() * 70+10);
        wordsWithSize.push( new Word(word,randomSize));
    })
    return wordsWithSize;   
}


}