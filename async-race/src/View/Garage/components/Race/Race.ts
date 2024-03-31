import { BaseComponent } from "../../../../Components/Base-component/base-component";
import { apiController } from "../../../../Controller/ApiController/apiController";
import { CarStartParams } from "../../../../Controller/ApiController/apiController.types";
import { CarType } from "../../garage.types";
import { Track } from "../Track/Track";
import { RacePropsType, SelectCarType } from "./race.types";

export class Race extends BaseComponent {
    public raceTitle: BaseComponent;

    public pageNumber: BaseComponent;

    public prevButton: BaseComponent;

    public nextButton: BaseComponent;

    public carsData: CarType[];

    public trackInstances: Track[];

    public selectCar: SelectCarType;

    public currentPage: number;

    constructor(props: RacePropsType) {
        super(props);
        this.selectCar = props.selectCar;
        this.currentPage = 1;
        this.raceTitle = new BaseComponent({
            tagName: "h4",
            textContent: `Garage ()`,
            classNames: "race-title",
            parentNode: this.element,
        });

        this.pageNumber = new BaseComponent({
            tagName: "h5",
            textContent: "Page #1",
            classNames: "page-number",
            parentNode: this.element,
        });

        this.prevButton = new BaseComponent({
            tagName: "button",
            textContent: "Prev",
            classNames: "prev-button",
            parentNode: this.element,
        });

        this.prevButton.setOnclick(this.addPaginationPrev);

        this.nextButton = new BaseComponent({
            tagName: "button",
            textContent: "Next",
            classNames: "next-button",
            parentNode: this.element,
        });
        this.nextButton.setOnclick(this.addPaginationNext);
        this.carsData = [];
        this.trackInstances = [];
    }

    deleteTrack = (id: number) => {
        return () => {
            apiController.deleteCar(id).then(() => {
                this.renderTracksInRace();
            });
        };
    };

    renderTracks = (carsArr: CarType[]) => {
        this.carsData = carsArr;
        this.trackInstances = carsArr.map((car) => new Track({ parentNode: this.element, ...car }));
        this.trackInstances.forEach((track) => {
            track.removeButton.setOnclick(this.deleteTrack(track.carId));
            track.selectButton.setOnclick(this.selectCar(track.carData));
        });
    };

    renderTracksInRace = async () => {
        const page = this.currentPage;
        const { cars, count } = await apiController.getCars({ _limit: 7, _page: page });
        this.clearAllTracks();
        this.renderTracks(cars);
        this.changeCarsCount(count);
    };

    changeCarsCount = (count: string) => {
        this.raceTitle.setTextContent(`Garage (${count || 0})`);
    };

    clearAllTracks = () => {
        this.carsData = [];
        this.trackInstances.forEach((track) => track.destroy());
        this.trackInstances = [];
    };

    addPaginationPrev = () => {
        if (this.currentPage !== 1) {
            this.currentPage -= 1;
            // this.nextButton.setAttribute({ name: 'disabled', value: 'false' });
            this.renderTracksInRace();
            this.pageNumber.setTextContent(`Page #${this.currentPage}`);
        }
        if (this.currentPage === 1) {
            // this.prevButton.setAttribute({ name: 'disabled', value: 'true' });
        }
    };

    addPaginationNext = async () => {
        const carOnPage = 7;
        const StringNumOfCars = (await apiController.getCars({ _limit: 7, _page: 0 })).count;
        const NumOfCars = Number(StringNumOfCars);
        const LastPageNumber = Math.ceil(NumOfCars / carOnPage);
        if (this.currentPage !== LastPageNumber) {
            this.currentPage += 1;
            // this.prevButton.setAttribute({ name: 'disabled', value: 'false' });
            this.renderTracksInRace();
            this.pageNumber.setTextContent(`Page #${this.currentPage}`);
        }
        if (this.currentPage === LastPageNumber) {
            // this.nextButton.setAttribute({ name: 'disabled', value: 'true' });
        }
    };

}
