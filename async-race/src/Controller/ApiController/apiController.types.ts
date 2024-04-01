export type GetCarsQueryType = { _page: number; _limit: number } | Record<string, never> | undefined;
export interface IQueryParam {
    key: string;
    value: string;
}
export interface CarStartParams {
    velocity: number;
    distance: number;
}

export interface IWinner {
wins: number;
time: number;
id?: number;
}

export interface ICar {
    name: string;
    color: string;
    id?: number;
    lastTime?: number;
}