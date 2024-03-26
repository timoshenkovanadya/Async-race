import { Garage } from "../View/Garage/Garage";
import { Header } from "../View/Header/header";

export class App {
    private header: Header;

    private parent: HTMLElement;

    private garage: Garage;

    private appContainer: HTMLElement;

    constructor(parent: HTMLElement) {
        this.appContainer = document.createElement("div");
        this.appContainer.className = "app-container";
        this.parent = parent;
        this.garage = new Garage({ tagName: "div", parentNode: this.appContainer });
        this.header = new Header();
        
    }

    start = () => {
        this.header.renderHeader(this.parent);
        this.parent.append(this.appContainer);
    };
}
