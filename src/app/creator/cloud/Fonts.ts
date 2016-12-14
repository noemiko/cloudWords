export class Fonts {
    constructor() {
}

public static get FontsList():string[]{
    return [ "Arial", "Verdana", "Helvetica","Calibri","Open Sans", "Abril Fatface","Old Standard TT"];

}

public static getRandomFont():string{
    const fonts = this.FontsList;
    return fonts[Math.floor(Math.random()*fonts.length)];

} 
}