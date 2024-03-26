import { Garage } from "../View/Garage/Garage";
import { Header } from "../View/Header/header";
import { Winners } from "../View/Winners/Winners-Container/Winners";

export class App {
    private header: Header;

    private parent: HTMLElement;

    private garage: Garage;

    private appContainer: HTMLElement;

    private winners: Winners;

    constructor(parent: HTMLElement) {
        this.appContainer = document.createElement("div");
        this.appContainer.className = "app-container";
        this.parent = parent;
        this.garage = new Garage({ tagName: "div", parentNode: this.appContainer });
        this.header = new Header();
        this.winners = new Winners({ tagName: "div", parentNode: this.appContainer });
        this.header.garageButton.addEventListener('click', () => {
            this.renderGarage();
        });
        this.header.winnersButton.addEventListener('click', () => {
            this.renderWinners();
        })
        
    }

    start = () => {
        this.header.renderHeader(this.parent);
        this.parent.append(this.appContainer);
    };

    renderGarage = (): void => {
        this.appContainer.innerHTML = "";
        this.garage.render(this.appContainer);
        // this.appContainer.append(this.garage as unknown as HTMLElement);
    };

    renderWinners = (): void => {
        this.appContainer.innerHTML = "";
        this.winners.render(this.appContainer);
        // this.appContainer.append(this.garage as unknown as HTMLElement);
    };
}
