import { Tool } from '../Tool';
import { Rectangle } from '../../figures/Rectangle';


export class RectangleTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Rectangle Tool';
        this.onset = new createjs.Point();
    }

    onMouseDown (event) {
        this.onset.setValues(event.stageX, event.stageY);
        this.rectangle = new Rectangle(this.onset.x, this.onset.y);
    }

    onMouseMove (event) {
        if (this.rectangle) {
            this.rectangle.x = (event.stageX - this.onset.x) < 0 ? event.stageX : this.onset.x;
            this.rectangle.y = (event.stageY - this.onset.y) < 0 ? event.stageY : this.onset.y;
            this.rectangle.width = Math.abs(this.onset.x - event.stageX);
            this.rectangle.height = Math.abs(this.onset.y - event.stageY);
            this.rectangle.redraw();
        }
    }

    onMouseUp (event) {
        this.rectangle = null;
    }

    onToolDisable (event) { }

    onToolEnable (event) { }

}
