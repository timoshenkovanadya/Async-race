import { BaseComponentProps } from "../../Components/Base-component/base-component";

export type GaragePropsType = BaseComponentProps;

export type CarType = {
    name: string;
    color: string;
    id: number;
};

export type CreateCarType = {
    name: string;
    color: string;
    id?: number;
};
