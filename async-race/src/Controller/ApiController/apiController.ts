import { CarType, CreateCarType } from "../../View/Garage/garage.types";
import { createQueryString } from "../../utils/createQueryString";
import { CarStartParams, GetCarsQueryType, ICar, IQueryParam, IWinner } from "./apiController.types";

const BASE_URL = "http://127.0.0.1:3000";
const generateQueryString = (queryParams: IQueryParam[] = []): string =>
    queryParams.length ? `?${queryParams.map((x): string => `${x.key}=${x.value}`).join("&")}` : "";

export const apiController = {
    cars: [],

    getCars: async (params: GetCarsQueryType = {}) => {
        const resp = await fetch(`${BASE_URL}/garage${createQueryString(params)}`);
        const count = resp.headers.get("X-Total-Count");
        const cars = (await resp.json()) as CarType[];
        return { cars, count } as { cars: CarType[]; count: string };
    },

    getCar: async (id: number): Promise<ICar> => {
        const resp = await fetch(`${BASE_URL}/garage/${id}`, {
            method: "GET",
        });
        return resp.json();
    },

    addCar: async (carData: CreateCarType): Promise<void> => {
        await fetch(`${BASE_URL}/garage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });
    },

    updateCar: async (carData: CarType): Promise<void> => {
        await fetch(`${BASE_URL}/garage/${carData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });
    },
    deleteCar: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/garage/${id}`, {
            method: "DELETE",
        });
    },
    startStopEngine: async (id: number, status: "started" | "stopped"): Promise<CarStartParams> => {
        const queryArr: IQueryParam[] = [
            { key: "id", value: `${id}` },
            { key: "status", value: `${status}` },
        ];
        const URL = `${BASE_URL}/engine/${generateQueryString(queryArr)}`;
        const resp: Response = await fetch(URL, {
            method: "PATCH",
        });
        const data: CarStartParams = await resp.json();
        return data;
    },
    switchDriveMode: async (id: number): Promise<unknown> => {
        const queryArr: IQueryParam[] = [
            { key: "id", value: `${id}` },
            { key: "status", value: "drive" },
        ];
        const URL = `${BASE_URL}/engine/${generateQueryString(queryArr)}`;
        const resp: Response = await fetch(URL, {
            method: "PATCH",
        });
        return new Promise((resolve, rejected): void => {
            if (resp.ok) {
                resolve(resp);
            } else rejected(resp);
        });
    },
    getWinner: async (id: number): Promise<IWinner | Record<string, never>> => {
        const resp = await fetch(`${BASE_URL}/winners/${id}`, {
            method: "GET",
        });
        const data = await resp.json();
        return data;
    },

    updWinner: async (winnerData: IWinner): Promise<void> => {
        await fetch(`${BASE_URL}/winners/${winnerData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(winnerData),
        });
    },

    addWinner: async (winnerData: IWinner): Promise<void> => {
        await fetch(`${BASE_URL}/winners`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(winnerData),
        });
    },

    getWinnersCars: async (QueryParams: IQueryParam[]): Promise<IWinner[]> => {
        const URL = `${BASE_URL}/winners/${generateQueryString(QueryParams)}`;
        const resp: Response = await fetch(URL);
        const data: IWinner[] = await resp.json();
        return data;
    },

    getTotalNumOfWinners: async (QueryParams: IQueryParam[]): Promise<string> => {
        const URL = `${BASE_URL}/winners/${generateQueryString(QueryParams)}`;
        const resp: Response = await fetch(URL);
        return resp.headers.get("X-Total-Count") ?? "";
    },
};
