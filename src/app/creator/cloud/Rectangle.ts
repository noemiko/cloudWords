import { Point } from './Point';
export class Rectangle {
    public leftUp:Point;
    public rightUp:Point;
    public leftDown:Point;
    public rightDown:Point;

    constructor(leftUp:Point,rightUp:Point, leftDown:Point, rightDown:Point) {
        this.leftDown = leftUp;
        this.rightUp = rightUp;
        this.leftDown = leftDown;
        this. rightDown = rightDown;
    }
} 