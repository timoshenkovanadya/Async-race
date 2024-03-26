import { BaseComponent } from "../../../../Components/Base-component/base-component";
import createCarImg from "../../../../utils/createCarImg";
import { AutosPropsType } from "./autos.types";

export class Autos extends BaseComponent {
    public svg: SVGSVGElement;

    public selectButton: BaseComponent;

    public removeButton: BaseComponent;

    public startButton: BaseComponent;

    public stopButton: BaseComponent;

    public carModel: BaseComponent;


    constructor(props: AutosPropsType) {
        super(props);

       this.selectButton = new BaseComponent({
            tagName: "button",
            textContent: "Select",
            classNames: "select-button",
            parentNode: this.element,
        });
       this.removeButton =  new BaseComponent({
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
            textContent: "Tesla",
            classNames: "car-model",
            parentNode: this.element,
        });

        this.svg = createCarImg("#fff", "30", "100");
        this.insertChild(this.svg as unknown as HTMLElement);
    }
}
