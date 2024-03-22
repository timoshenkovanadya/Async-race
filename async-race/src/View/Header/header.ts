export class Header {
    private headerContainer: HTMLElement;
    
    private garageButton: HTMLButtonElement;

    private winnersButton: HTMLButtonElement;

    constructor () {
        this.headerContainer = document.createElement("div");
        this.headerContainer.className = 'header';
        this.garageButton = this.addHeaderButton('to garage');
        this.winnersButton = this.addHeaderButton('to winners');
    }

    addHeaderButton(text: string): HTMLButtonElement {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'header_button';
        button.textContent = text;
        this.headerContainer.appendChild(button);
        return button;
    }

    renderHeader(parent: HTMLElement): void {
        parent.appendChild(this.headerContainer);
    }

}
