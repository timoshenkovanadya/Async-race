import { BaseComponent } from "../../../../Components/Base-component/base-component";
import createCarImg from "../../../../utils/createCarImg";
import { AutosPropsType } from "./autos.types";

export class Autos extends BaseComponent {
    private svg: SVGSVGElement;

    constructor(props: AutosPropsType) {
        super(props);

        new BaseComponent({
            tagName: "button",
            textContent: "Select",
            classNames: "select-button",
            parentNode: this.element,
        });
        new BaseComponent({
            tagName: "button",
            textContent: "Remove",
            classNames: "remove-button",
            parentNode: this.element,
        });
        new BaseComponent({
            tagName: "button",
            textContent: "A",
            classNames: "start-button",
            parentNode: this.element,
        });
        new BaseComponent({
            tagName: "button",
            textContent: "B",
            classNames: "stop-button",
            parentNode: this.element,
        });

        new BaseComponent({
            tagName: "h6",
            textContent: "Tesla",
            classNames: "car-model",
            parentNode: this.element,
        });

        this.svg = createCarImg("#fff", "30", "100");
        this.insertChild(this.svg as unknown as HTMLElement);
    }
}
