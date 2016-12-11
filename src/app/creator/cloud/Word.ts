import { Point } from './Point';
export class Word {

    public size:number;
    public text:string;
    public color: string;
    public font:string;
    public width:number;

    constructor(text:string,size:number) {
        this.text = text;
        this.size = size * 0.9;
        this.color = this.setRandomColor();
        this.font = this.getRandomFont();
    }


    private setRandomColor() {
        var letters = '012345'.split('');
        var color = '#';        
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');
        for (var i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }


    private getRandomFont(){
        let fontType = [ "Arial", "Verdana", "Helvetica","Calibri"];
        return fontType[Math.floor(Math.random()*4)];
    }


} 