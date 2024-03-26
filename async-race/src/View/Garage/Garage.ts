import { BaseComponent } from "../../Components/Base-component/base-component";
import { apiController } from "../../Controller/ApiController/apiController";
import { CreationForm } from "./components/Creation-form/CreationForm";
import { Race } from "./components/Race/Race";
import { GaragePropsType } from "./garage.types";
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
    }

    renderTracksInRace = async () => {
        const { cars, count } = await apiController.getCars({ _limit: 7, _page: 0 });
        this.race.renderTracks(cars);
        this.race.changeCarsCount(count);
    };
}
