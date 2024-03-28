import { BaseComponentProps } from "../../../../Components/Base-component/base-component";
import { CarType } from "../../garage.types";

export type SelectCarType = (carData: CarType) => () => void;

export type RacePropsType = BaseComponentProps & { selectCar: SelectCarType };
