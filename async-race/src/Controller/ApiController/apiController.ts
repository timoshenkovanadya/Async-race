import { CarType } from "../../View/Garage/garage.types";
import { createQueryString } from "../../utils/createQueryString";
import { GetCarsQueryType } from "./apiController.types";

const BASE_URL = "http://127.0.0.1:3000";

export const apiController = {
    cars: [],

    getCars: async (params: GetCarsQueryType = {}) => {
        const resp = await fetch(`${BASE_URL}/garage${createQueryString(params)}`);
        const count = resp.headers.get("X-Total-Count");
        const cars = (await resp.json()) as CarType[];
        return { cars, count } as { cars: CarType[]; count: string };
    },
};
