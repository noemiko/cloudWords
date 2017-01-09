import { Point } from './Point';
import { Fonts } from './Fonts';

export class Word {
    public id:number;
    public size:number;
    public text:string;
    public color: string;
    public font:string;
    public width:number;
    public isRotated:boolean;
    public degrees:number;

    constructor(text:string) {
        this.text = text;
        this.size = this.getRandomSize();
        this.color = this.getRandomColor();
        this.font = Fonts.getRandomFont();
    }
    private getRandomSize(){
        return Math.floor(Math.random() * 30+10);
    }

    private getRandomColor() {
        var letters = '012345'.split('');
        var color = '#';        
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');
        for (var i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

} 