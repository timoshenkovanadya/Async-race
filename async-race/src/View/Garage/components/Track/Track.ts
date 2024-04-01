import { BaseComponent } from "../../../../Components/Base-component/base-component";
import { apiController } from "../../../../Controller/ApiController/apiController";
import { CarStartParams } from "../../../../Controller/ApiController/apiController.types";
import createCarImg from "../../../../utils/createCarImg";
import { CarType } from "../../garage.types";
import { TrackPropsType, WinnerPromiseType } from "./track.types";

export class Track extends BaseComponent {
    public svg: SVGSVGElement;

    public selectButton: BaseComponent;

    public removeButton: BaseComponent;

    public startButton: BaseComponent;

    public stopButton: BaseComponent;

    public carModel: BaseComponent;

    public carId: number;

    public carData: CarType;

    public timer: NodeJS.Timeout | null;

    constructor({ id, color, name, ...props }: TrackPropsType) {
        super({ tagName: "div", ...props });

        this.carId = id;

        this.timer = null;

        this.carData = { id, color, name };

        this.element.className = "track-container";

        this.selectButton = new BaseComponent({
            tagName: "button",
            textContent: "Select",
            classNames: "select-button",
            parentNode: this.element,
        });
        this.removeButton = new BaseComponent({
            tagName: "button",
            textContent: "Remove",
            classNames: "remove-button",
            parentNode: this.element,
        });

        this.startButton = new BaseComponent({
            tagName: "button",
            textContent: "A",
            classNames: "start-button",
            parentNode: this.element,
        });
        this.startButton.setOnclick(this.startEngine);

        this.stopButton = new BaseComponent({
            tagName: "button",
            textContent: "B",
            classNames: "stop-button",
            parentNode: this.element,
        });
        this.stopButton.setOnclick(this.stopEngine);

        this.carModel = new BaseComponent({
            tagName: "h6",
            textContent: name,
            classNames: "car-model",
            parentNode: this.element,
        });

        this.svg = createCarImg(color, "80", "30");
        this.insertChild(this.svg as unknown as HTMLElement);
    }

    startEngine = () => {
        const startPromise: Promise<CarStartParams> = apiController.startStopEngine(this.carData.id ?? 0, "started");
        return new Promise<WinnerPromiseType>((resolve) => {
            startPromise.then((params: CarStartParams): void => {
                const BaseTime: number = Date.now();
                const startProposition: number = 250;
                const intervalTime: number = 20;
                const animationTime: number = params.distance / params.velocity;
                const trackLength: number = this.element.clientWidth - startProposition;
                const distancePerInterval: number = (trackLength / animationTime) * intervalTime;

                let currentPosition: number = 0;

                const moveCar = (): void => {
                    const car: SVGSVGElement = this.svg;
                    car.style.transform = `translateX(${(currentPosition += distancePerInterval)}px)`;
                    if (BaseTime + animationTime < Date.now()) {
                        if (this.timer) clearInterval(this.timer);
                        resolve({ id: this.carData.id, time: animationTime, name: this.carData.name });
                    }
                };
                this.timer = setInterval(moveCar, intervalTime);
                apiController.switchDriveMode(this.carData.id ?? 0).then(null, (): void => {
                    if (this.timer) clearInterval(this.timer);
                });
            });
        });
    };

    stopEngine = (): void => {
        apiController.startStopEngine(this.carData.id ?? 0, "stopped").then((): void => {
            if (this.timer) clearInterval(this.timer);
            this.svg.style.transform = "none";
        });
    };
}
