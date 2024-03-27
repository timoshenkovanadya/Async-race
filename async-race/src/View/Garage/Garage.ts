import { BaseComponent } from "../../Components/Base-component/base-component";
import { apiController } from "../../Controller/ApiController/apiController";
import { getRandomCarColor, getRandomCarName } from "../../utils/generateRandomCars";
import { CreationForm } from "./components/Creation-form/CreationForm";
import { Race } from "./components/Race/Race";
import { CarType, GaragePropsType } from "./garage.types";
// import { Autos } from "./components/Autos/Autos";
// import createCarImg from '../../utils/createCarImg'

export class Garage extends BaseComponent {
    private creationForm: CreationForm;

    private race: Race;

    constructor(props: GaragePropsType) {
        super(props);
        this.creationForm = new CreationForm();
        this.creationForm.renderTo(this.getElement());
        this.race = new Race({ tagName: "div", parentNode: this.element });
        this.renderTracksInRace();
        this.creationForm.generateCarsButton.addEventListener("click", this.generateRandomCars);
        this.creationForm.createButton.addEventListener("click", this.createCar);
    }

    renderTracksInRace = async () => {
        const { cars, count } = await apiController.getCars({ _limit: 7, _page: 0 });
        this.race.clearAllTracks();
        this.race.renderTracks(cars);
        this.race.changeCarsCount(count);
        this.race.changePageCount(count);
    };

    generateRandomCars = () => {
        const promiseArr = [];
        for (let i = 0; i < 100; i += 1) {
            const car: CarType = {
                name: getRandomCarName(),
                color: getRandomCarColor(),
            };
            const promise = apiController.addCar(car);
            promiseArr.push(promise);
        }
        Promise.all(promiseArr).then(() => {
            this.renderTracksInRace();
        });
    };

    createCar = (): void => {
        const Car: CarType = {
            name: `${this.creationForm.createInput.value}`,
            color: `${this.creationForm.createColorInput.value}`,
        };
        apiController.addCar(Car);
        this.renderTracksInRace();
        this.creationForm.createInput.value = "";
    };
}
