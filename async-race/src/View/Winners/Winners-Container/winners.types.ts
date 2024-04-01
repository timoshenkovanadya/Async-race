import { BaseComponentProps } from "../../../Components/Base-component/base-component";

export type WinnersPropsType = BaseComponentProps;

export type GetWinnersArgType = {
    _page: number;

    _limit: number;

    _sort?: "id" | "wins" | "time";

    _order?: "ASC" | "DESC";
};

export type ExtendedWinnersData = {
    wins: number;
    time: number;
    id: number;
    name: string;
    color: string;
};
