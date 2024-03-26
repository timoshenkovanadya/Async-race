import { BaseComponentProps } from "../../../../Components/Base-component/base-component";
import { CarType } from "../../garage.types";

export type TrackPropsType = Omit<BaseComponentProps, "tagName"> & CarType;
