import { Point } from './Point';
export class Rectangle {
    public leftUp:Point;
    public rightDown:Point;

    constructor(leftUp:Point, rightDown:Point){
        this.leftUp = leftUp;
        this. rightDown = rightDown;

    }
}