import { BaseComponent } from "../../../Components/Base-component/base-component";
import { apiController } from "../../../Controller/ApiController/apiController";
import { ICar, IQueryParam, IWinner } from "../../../Controller/ApiController/apiController.types";
import createCarImg from "../../../utils/createCarImg";
import { WinnersPropsType } from "./winners.types";

export class Winners extends BaseComponent {
    public tableWrap: BaseComponent;

    public winnersTitle: BaseComponent;

    public tableTitle: BaseComponent;

    public pageTitle: BaseComponent;

    public winnersPrevButton: BaseComponent;

    public winnersNextButton: BaseComponent;

    public name: BaseComponent;

    public carImg: BaseComponent;

    public Number: BaseComponent;

    public timeSortButton: BaseComponent;

    public winsSortButton: BaseComponent;

    public currentPage: number;

    public orderType: string;

    public sortType: string;

    public totalNumOfCars: number;

    constructor(props: WinnersPropsType) {
        super(props);

        this.currentPage = 1;
        this.orderType = "";
        this.sortType = "";
        this.totalNumOfCars = 0;

        this.winnersTitle = new BaseComponent({
            tagName: "h4",
            textContent: "Winners (9)",
            classNames: "winners-title",
            parentNode: this.element,
        });

        this.pageTitle = new BaseComponent({
            tagName: "h5",
            textContent: "Page #1",
            classNames: "winners-page",
            parentNode: this.element,
        });

        this.tableWrap = new BaseComponent({
            tagName: "div",
            classNames: "winners-table",
            parentNode: this.element,
        });
        this.tableTitle = new BaseComponent({
            tagName: "div",
            classNames: "table-title-wrap",
            parentNode: this.tableWrap.getElement(),
        });

        this.Number = new BaseComponent({
            tagName: "div",
            textContent: "Number",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });

        this.name = new BaseComponent({
            tagName: "div",
            textContent: "Name",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });

        this.carImg = new BaseComponent({
            tagName: "div",
            textContent: "Car",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });

        this.winsSortButton = new BaseComponent({
            tagName: "div",
            textContent: "Wins",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });
        this.winsSortButton.setAttribute({ name: "dataset.type", value: "wins" });

        this.timeSortButton = new BaseComponent({
            tagName: "div",
            textContent: "Best time (seconds)",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });
        this.timeSortButton.setAttribute({ name: "dataset.type", value: "time" });

        this.winnersPrevButton = new BaseComponent({
            tagName: "button",
            textContent: "Prev",
            classNames: "prev-button",
            parentNode: this.element,
        });

        this.winnersNextButton = new BaseComponent({
            tagName: "button",
            textContent: "Next",
            classNames: "next-button",
            parentNode: this.element,
        });
    }

    addPaginationPrev = () => {
        if (this.currentPage !== 1) {
            this.currentPage -= 1;
            // this.nextButton.setAttribute({ name: 'disabled', value: 'false' });
            // this.renderTracksInRace();
            this.pageTitle.setTextContent(`Page #${this.currentPage}`);
        }
        if (this.currentPage === 1) {
            // this.prevButton.setAttribute({ name: 'disabled', value: 'true' });
        }
    };

    addPaginationNext = async () => {
        const carOnPage = 10;
        const LastPageNumber = Math.ceil(this.totalNumOfCars / carOnPage);
        if (this.currentPage !== LastPageNumber) {
            this.currentPage += 1;
            // this.prevButton.setAttribute({ name: 'disabled', value: 'false' });
            // this.renderTracksInRace();
            this.pageTitle.setTextContent(`Page #${this.currentPage}`);
        }
        if (this.currentPage === LastPageNumber) {
            // this.nextButton.setAttribute({ name: 'disabled', value: 'true' });
        }
    };

}

    

