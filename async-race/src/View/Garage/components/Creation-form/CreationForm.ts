import { apiController } from "../../../../Controller/ApiController/apiController";
import { CarType } from "../../garage.types";

export class CreationForm {
    public formContainer: HTMLElement;

    public createContainer: HTMLElement;

    public updContainer: HTMLElement;

    public createInput: HTMLInputElement;

    public updInput: HTMLInputElement;

    public createButton: HTMLButtonElement;

    public updButton: HTMLButtonElement;

    public createColorInput: HTMLInputElement;

    public updColorInput: HTMLInputElement;

    public raceButton: HTMLButtonElement;

    public resetButton: HTMLButtonElement;

    public generateCarsButton: HTMLButtonElement;

    public updateId: number | undefined;

    constructor() {
        this.formContainer = document.createElement("div");
        this.formContainer.className = "form-container";
        this.createContainer = document.createElement("form");
        this.createContainer.className = "create-container";
        this.formContainer.append(this.createContainer);

        this.updContainer = document.createElement("form");
        this.updContainer.className = "create-container";
        this.formContainer.append(this.updContainer);

        this.createInput = this.addInput("Create", this.createContainer);
        this.updInput = this.addInput("Update", this.updContainer);

        this.createColorInput = this.addColorInput("create", this.createContainer);
        this.updColorInput = this.addColorInput("update", this.updContainer);

        this.createButton = this.addButton("create", this.createContainer);
        this.updButton = this.addButton("update", this.updContainer);

        this.raceButton = this.addButton("race", this.formContainer);
        this.resetButton = this.addButton("reset", this.formContainer);
        this.generateCarsButton = this.addButton("generate", this.formContainer);

        this.resetButton.disabled = true;

        this.setDisabledUpdate(true);
    }

    addInput(inputName: string, parent: HTMLElement): HTMLInputElement {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "text-input";
        input.name = inputName;
        parent.appendChild(input);

        return input;
    }

    updateCarInForm = async () => {
        if (!this.updateId) return;
        apiController
            .updateCar({ id: this.updateId, name: this.updInput.value, color: this.updColorInput.value })
            .then(() => {
                this.unselectCar();
            });
    };

    setDisabledUpdate = (isDisabled: boolean) => {
        this.updInput.disabled = isDisabled;
        this.updColorInput.disabled = isDisabled;
        this.updButton.disabled = isDisabled;
    };

    addButton(text: string, parent: HTMLElement): HTMLButtonElement {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "create-button";
        button.textContent = text;
        parent.appendChild(button);
        return button;
    }

    addColorInput(inputName: string, parent: HTMLElement): HTMLInputElement {
        const input = document.createElement("input");
        input.type = "color";
        input.className = "color-input";
        input.name = inputName;
        parent.appendChild(input);

        return input;
    }

    setSelectedCar = ({ id, color, name }: CarType) => {
        this.updInput.value = name;
        this.updColorInput.value = color;
        this.updateId = id;
        this.setDisabledUpdate(false);
    };

    unselectCar = () => {
        this.updInput.value = "";
        this.updColorInput.value = "";
        this.updateId = undefined;
        this.setDisabledUpdate(true);
    };

    renderTo(parent: HTMLElement): void {
        parent.appendChild(this.formContainer);
    }
}
