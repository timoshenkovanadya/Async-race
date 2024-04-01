import { BaseComponent } from "../../Components/Base-component/base-component";
import { apiController } from "../../Controller/ApiController/apiController";
import { getRandomCarColor, getRandomCarName } from "../../utils/generateRandomCars";
import { CreationForm } from "./components/Creation-form/CreationForm";
import { Race } from "./components/Race/Race";
import { WinnerPromiseType } from "./components/Track/track.types";
import { CarType, CreateCarType, GaragePropsType } from "./garage.types";
// import { Autos } from "./components/Autos/Autos";
// import createCarImg from '../../utils/createCarImg'

export class Garage extends BaseComponent {
    private creationForm: CreationForm;

    private race: Race;

    private modal: BaseComponent;

    constructor(props: GaragePropsType) {
        super(props);
        this.creationForm = new CreationForm();
        this.creationForm.renderTo(this.getElement());
        this.race = new Race({ tagName: "div", parentNode: this.element, selectCar: this.selectCar });
        this.race.renderTracksInRace();
        this.creationForm.generateCarsButton.addEventListener("click", this.generateRandomCars);
        this.creationForm.createButton.addEventListener("click", this.createCar);
        this.creationForm.updButton.addEventListener("click", this.updateCar);
        this.creationForm.raceButton.addEventListener("click", this.raceHandler);
        this.creationForm.resetButton.addEventListener("click", this.resetHandler);
        this.modal = new BaseComponent({
            tagName: "div",
            textContent: "Hello",
            classNames: ["modal", "invisible"],
            parentNode: this.element,
        });
    }

    selectCar = (carData: CarType) => () => {
        this.creationForm.setSelectedCar(carData);
    };

    updateCar = () => {
        this.creationForm.updateCarInForm().then(() => {
            this.race.renderTracksInRace();
        });
    };

    raceHandler = () => {
        this.creationForm.resetButton.disabled = false;
        this.creationForm.raceButton.disabled = true;
        const promisesArr: Promise<WinnerPromiseType>[] = [];
        this.race.trackInstances.forEach((track) => {
            const promise = track.startEngine();
            promisesArr.push(promise);
        });
        Promise.race(promisesArr).then((prop) => {
            const { id, time } = prop;
            this.modal.setTextContent(`winner id ${id}, time ${(time / 1000).toFixed(2)}s`);
            this.showModal();
        });
    };

    showModal = () => {
        this.modal.removeClassName("invisible");
        setTimeout(() => {
            this.modal.setClassName("invisible");
        }, 3000);
    };

    resetHandler = () => {
        this.creationForm.resetButton.disabled = true;
        this.creationForm.raceButton.disabled = false;
        this.race.trackInstances.forEach((track) => {
            track.stopEngine();
        });
    };

    generateRandomCars = () => {
        const promiseArr = [];
        for (let i = 0; i < 100; i += 1) {
            const car: CreateCarType = {
                name: getRandomCarName(),
                color: getRandomCarColor(),
            };
            const promise = apiController.addCar(car);
            promiseArr.push(promise);
        }
        Promise.all(promiseArr).then(() => {
            this.race.renderTracksInRace();
        });
    };

    createCar = (): void => {
        const Car: CreateCarType = {
            name: `${this.creationForm.createInput.value}`,
            color: `${this.creationForm.createColorInput.value}`,
        };
        apiController.addCar(Car);
        this.race.renderTracksInRace();
        this.creationForm.createInput.value = "";
        this.creationForm.createColorInput.value = "";
    };
}
