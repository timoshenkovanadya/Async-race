export type GetCarsQueryType = { _page: number; _limit: number } | Record<string, never> | undefined;
export interface IQueryParam {
    key: string;
    value: string;
}
export interface CarStartParams {
    velocity: number;
    distance: number;
}
