import { BaseComponent } from "../../../../Components/Base-component/base-component";
import createCarImg from "../../../../utils/createCarImg";
import { CarType } from "../../garage.types";
import { TrackPropsType } from "./track.types";

export class Track extends BaseComponent {
    public svg: SVGSVGElement;

    public selectButton: BaseComponent;

    public removeButton: BaseComponent;

    public startButton: BaseComponent;

    public stopButton: BaseComponent;

    public carModel: BaseComponent;

    public carId: number;

    public carData: CarType;

    constructor({ id, color, name, ...props }: TrackPropsType) {
        super({ tagName: "div", ...props });

        this.carId = id;

        this.carData = { id, color, name };

        this.element.className = "track-container";

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

        this.svg = createCarImg(color, "80", "30");
        this.insertChild(this.svg as unknown as HTMLElement);
    }
}
