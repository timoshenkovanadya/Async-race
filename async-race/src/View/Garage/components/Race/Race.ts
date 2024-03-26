import { BaseComponent } from "../../../../Components/Base-component/base-component";
import { RacePropsType } from "./race.types";


export class Race extends BaseComponent {

    public raceTitle: BaseComponent;

    public pageNumber: BaseComponent;

    public prevButton: BaseComponent;

    public nextButton: BaseComponent;

    constructor(props: RacePropsType) {
        super(props);
        this.raceTitle = new BaseComponent({
            tagName: "h4",
            textContent: "Garage (9)",
            classNames: "race-title",
            parentNode: this.element,
        });

        this.pageNumber = new BaseComponent({
            tagName: "h5",
            textContent: "Page #1",
            classNames: "pageNumber",
            parentNode: this.element,
        });

        this.prevButton = new BaseComponent({
            tagName: "button",
            textContent: "Prev",
            classNames: "prev-button",
            parentNode: this.element,
        });
        
       this.nextButton = new BaseComponent({
            tagName: "button",
            textContent: "Next",
            classNames: "next-button",
            parentNode: this.element,
        });
     
        
         }
}
