import { BaseComponent } from "../../../Components/Base-component/base-component";
import { WinnersPropsType } from "./winners.types";


export class WinnersContainer extends BaseComponent {
    constructor(props: WinnersPropsType) {
        super(props);
        new BaseComponent({
            tagName: "h4",
            textContent: "Winners (9)",
            classNames: "winners-title",
            parentNode: this.element,
        });

        new BaseComponent({
            tagName: "h5",
            textContent: "Page #1",
            classNames: "winners-page",
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
