import './global.css';
import { App } from './App/app';

const container = document.querySelector('body');
if (container) {
    const app = new App(container);
    app.start();
    app.renderGarage();
}
