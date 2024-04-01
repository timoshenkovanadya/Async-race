import { BaseComponent } from "../../../Components/Base-component/base-component";
import { apiController } from "../../../Controller/ApiController/apiController";
import { IQueryParam } from "../../../Controller/ApiController/apiController.types";
import createCarImg from "../../../utils/createCarImg";
import { ExtendedWinnersData, GetWinnersArgType, WinnersPropsType } from "./winners.types";

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
            tagName: "table",
            classNames: "winners-table",
            parentNode: this.element,
        });
        this.tableTitle = new BaseComponent({
            tagName: "tr",
            classNames: "table-title-wrap",
            parentNode: this.tableWrap.getElement(),
        });

        this.Number = new BaseComponent({
            tagName: "th",
            textContent: "Number",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });

        this.name = new BaseComponent({
            tagName: "th",
            textContent: "Name",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });

        this.carImg = new BaseComponent({
            tagName: "th",
            textContent: "Car",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });

        this.winsSortButton = new BaseComponent({
            tagName: "th",
            textContent: "Wins",
            classNames: "table-title",
            parentNode: this.tableTitle.getElement(),
        });
        this.winsSortButton.setAttribute({ name: "dataset.type", value: "wins" });

        this.timeSortButton = new BaseComponent({
            tagName: "th",
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
        this.getWinnersData({ _page: 1, _limit: 10 });
    }

    getWinnersData = async (params: GetWinnersArgType) => {
        const requestParams = Object.keys(params).map((key) => ({
            key,
            value: params[key as keyof GetWinnersArgType],
        }));
        const winnersData = await apiController.getWinnersCars(requestParams as IQueryParam[]);
        const extendedWinnersPromises = winnersData.map(async (winner) => {
            const carData = await apiController.getCar(winner.id);
            return { ...carData, ...winner };
        });
        const extendedWinnersData = await Promise.all(extendedWinnersPromises);
        this.renderLines(extendedWinnersData);
    };

    renderLines = (extendedWinnersData: ExtendedWinnersData[]) => {
        extendedWinnersData.forEach((data, index) => {
            this.getLine({ ...data, index });
        });
    };

    getLine = (data: ExtendedWinnersData & { index: number }) => {
        const { wins, time, name, color, index } = data;
        const tr = new BaseComponent({ tagName: "tr", parentNode: this.tableWrap.getElement() });
        new BaseComponent({ tagName: "td", textContent: (index + 1).toString(), parentNode: tr.getElement() });
        new BaseComponent({ tagName: "td", textContent: name, parentNode: tr.getElement() });
        const carTd = new BaseComponent({ tagName: "td", parentNode: tr.getElement() });
        const carImg = createCarImg(color, "80", "30");
        carTd.insertChild(carImg as unknown as HTMLElement);
        new BaseComponent({ tagName: "td", textContent: wins.toString(), parentNode: tr.getElement() });
        new BaseComponent({ tagName: "td", textContent: time.toString(), parentNode: tr.getElement() });
    };

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
