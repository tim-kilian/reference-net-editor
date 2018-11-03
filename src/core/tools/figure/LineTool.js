import Tool from '../Tool';
import Line from '../../figures/Line';

export default class LineTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Line Tool';
        this.line = null;
    }

    onMouseDown (event) {
        let point = new createjs.Point(event.stageX, event.stageY);
        this.line = new Line(point, point);
    }

    onMouseMove (event) {
        if (this.line) {
            this.line.setDest(new createjs.Point(event.stageX, event.stageY));
            this.line.repaint();
        }
    }

    onMouseUp (event) {
        this.line = null;
    }

}
