import DrawingEvent from '../drawing/DrawingEvent';
import { DrawingShape } from '../drawing/DrawingShape';
import { FigureSelector } from '../handles/selectors/FigureSelector';
import { SelectionTool } from '../tools/general/SelectionTool';


/**
 * @abstract
 */
export class Figure extends DrawingShape {

    constructor (x, y) {
        super();

        this.handles = [];
        this.selector = new FigureSelector(this);
        this.connectors = [];
        this.connections = [];

        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
        this.lineColor = 'black';
        this.fillColor = 'white';

        this.updatePosition(x, y);

        DrawingEvent.on('enable connectors', this.enableConnectors.bind(this));
        DrawingEvent.on('disable connectors', this.disableConnectors.bind(this));
    }

    destructor () {
        this.handles.forEach(handle => handle.destructor());
        this.connectors.forEach(handle => handle.destructor());
        this.connections.forEach(connection => connection.destructor());
        super.destructor();
    }

    move (dx, dy) {
        this.updatePosition(this.x + dx, this.y + dy);
        this.onMove();
    }

    adjustScale (dx, dy) {
        this.width = Math.max(0, this.width + dx);
        this.height = Math.max(0, this.height + dy);
        this.redraw();
    }

    stretch (east, south, west, north) {
        this.x = this.x + west;
        this.y = this.y + north;
        this.width = Math.max(0, this.width + east - west);
        this.height = Math.max(0, this.height + south - north);

        this.redraw();
    }

    updateConnections () {
        this.connections.forEach((connection) => connection.redraw());
    }

    updateConnectors () {
        this.connectors.forEach(connector => connector.updatePosition());
    }

    enableConnectors () {
        this.connectors.forEach(connector => connector.show());
    }

    disableConnectors () {
        this.connectors.forEach(connector => connector.hide());
    }

    updateHandles () {
        this.handles.forEach(handle => handle.updatePosition());
    }

    showHandles () {
        this.handles.forEach((handle) => handle.show());
    }

    hideHandles () {
        this.handles.forEach((handle) => handle.hide());
    }

    onSelect () {
        this.showHandles();
        this.selector.show();
    }

    onMove () {
        this.updateHandles();
        this.updateConnectors();
        this.updateConnections();
        this.selector.updatePosition();
    }

    onDeselect () {
        this.hideHandles();
        this.selector.hide();
    }

    onClick (event) { }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onMouseMove (event) { }

    onPressMove (event) {
        if (this.parent.activeTool instanceof SelectionTool) {
            this.parent.activeTool.selection.move(event.stageX - this.mx, event.stageY - this.my);
        }
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) { }

    onDoubleClick (event) { }

    onMouseOut (event) { }

    onMouseOver (event) { }

    onShow () { }

    onHide () { }
}
