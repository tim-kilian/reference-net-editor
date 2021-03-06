import { Tool } from '../Tool';
import { Rectangle } from '../../figures/Rectangle';
import { Point } from '../../util/Point';


export class RectangleTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Rectangle Tool';
        this.onset = new Point();
    }

    onMouseDown (event) {
        this.onset.setValues(event.stageX, event.stageY);
        this.rectangle = new Rectangle(this.onset.x, this.onset.y);
        this.rectangle.x -= 21;
        this.rectangle.y -= 14;
        this.rectangle.width = 42;
        this.rectangle.height = 28;
    }

    onMouseMove (event) {
        if (this.rectangle) {
            let leftOf = (event.stageX - this.onset.x) < 0;
            let topOf = (event.stageY - this.onset.y) < 0;
            this.rectangle.x = leftOf ? event.stageX : this.onset.x;
            this.rectangle.y = topOf ? event.stageY : this.onset.y;
            this.rectangle.width = Math.abs(this.onset.x - event.stageX);
            this.rectangle.height = Math.abs(this.onset.y - event.stageY);
            this.rectangle.redraw();
        }
    }

    onMouseUp (event) {
        this.rectangle.redraw();
        this.rectangle = null;
    }

    onToolDisable (event) { }

    onToolEnable (event) { }

}
