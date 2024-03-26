import { BaseComponent } from "../../../../Components/Base-component/base-component";
import { CarType } from "../../garage.types";
import { Track } from "../Track/Track";
import { RacePropsType } from "./race.types";

export class Race extends BaseComponent {
    public raceTitle: BaseComponent;

    public pageNumber: BaseComponent;

    public prevButton: BaseComponent;

    public nextButton: BaseComponent;

    public carsData: CarType[];

    public trackInstances: Track[];

    constructor(props: RacePropsType) {
        super(props);
        this.raceTitle = new BaseComponent({
            tagName: "h4",
            textContent: `Garage ()`,
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
        this.carsData = [];
        this.trackInstances = [];
    }

    renderTracks = (carsArr: CarType[]) => {
        this.carsData = carsArr;
        this.trackInstances = carsArr.map((car) => new Track({ parentNode: this.element, ...car }));
    };

    changeCarsCount = (count: string) => {
        this.raceTitle.setTextContent(`Garage (${count || 0})`);
    };
}
