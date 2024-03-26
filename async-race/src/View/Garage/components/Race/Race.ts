import { BaseComponent } from "../../../../Components/Base-component/base-component";
import { RacePropsType } from "./race.types";


export class Race extends BaseComponent {
    constructor(props: RacePropsType) {
        super(props);
        new BaseComponent({
            tagName: "h4",
            textContent: "Garage (9)",
            classNames: "race-title",
            parentNode: this.element,
        });

        new BaseComponent({
            tagName: "h5",
            textContent: "Page #1",
            classNames: "race-title-page",
            parentNode: this.element,
        });

        new BaseComponent({
            tagName: "button",
            textContent: "Prev",
            classNames: "prev-button",
            parentNode: this.element,
        });
        
        new BaseComponent({
            tagName: "button",
            textContent: "Next",
            classNames: "next-button",
            parentNode: this.element,
        });
     
        
         }
}
