import { BaseComponent } from "../../Components/Base-component/base-component";
import { CreationForm } from "./components/Creation-form/CreationForm";
import { Race } from "./components/Race/Race";
import { GaragePropsType } from "./garage.types";
import { Autos } from "./components/Autos/Autos";
import createCarImg from '../../utils/createCarImg'

export class Garage extends BaseComponent {
    private creationForm: CreationForm;

    private race: Race;

    private autos: Autos;

    constructor(props: GaragePropsType) {
        super(props);
        this.creationForm = new CreationForm();
        this.creationForm.renderTo(this.getElement());
        this.race = new Race({ tagName: "div", parentNode: this.element });
        this.autos = new Autos({ tagName: "div", classNames: 'autos-container', parentNode: this.element })
        this.creationForm.createButton.addEventListener('click', this.createCar);

    }

    createCar = (): void => {
        new Autos({ tagName: "div", classNames: 'autos-container', parentNode: this.element });
        this.autos.carModel.setTextContent(this.creationForm.createInput.value);
        this.autos.svg = createCarImg("this.creationForm.createColorInput.value", "30", "100");
        this.autos.render(this.element);

    }
}
