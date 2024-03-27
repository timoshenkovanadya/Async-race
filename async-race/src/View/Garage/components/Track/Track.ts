import { BaseComponent } from "../../../../Components/Base-component/base-component";
import createCarImg from "../../../../utils/createCarImg";
import { TrackPropsType } from "./track.types";

export class Track extends BaseComponent {
    public svg: SVGSVGElement;

    public selectButton: BaseComponent;

    public removeButton: BaseComponent;

    public startButton: BaseComponent;

    public stopButton: BaseComponent;

    public carModel: BaseComponent;

    public carId?: number;

    constructor({ id, color, name, ...props }: TrackPropsType) {
        super({ tagName: "div", ...props });

        this.carId = id;

        this.selectButton = new BaseComponent({
            tagName: "button",
            textContent: "Select",
            classNames: "select-button",
            parentNode: this.element,
        });
        this.removeButton = new BaseComponent({
            tagName: "button",
            textContent: "Remove",
            classNames: "remove-button",
            parentNode: this.element,
        });
        this.startButton = new BaseComponent({
            tagName: "button",
            textContent: "A",
            classNames: "start-button",
            parentNode: this.element,
        });
        this.stopButton = new BaseComponent({
            tagName: "button",
            textContent: "B",
            classNames: "stop-button",
            parentNode: this.element,
        });

        this.carModel = new BaseComponent({
            tagName: "h6",
            textContent: name,
            classNames: "car-model",
            parentNode: this.element,
        });

        this.svg = createCarImg(color, "30", "100");
        this.insertChild(this.svg as unknown as HTMLElement);
    }
}
