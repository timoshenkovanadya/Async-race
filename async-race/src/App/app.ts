import { CreationForm } from '../View/Creation-form/creation-form';
import { Header } from '../View/Header/header';
export class App {
    private header: Header;

    private parent: HTMLElement

    private creationForm: CreationForm

    private appContainer: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.header = new Header();
        this.appContainer = document.createElement('div');
        this.appContainer.className = 'app-container';
        this.parent.append(this.appContainer);
        
        this.creationForm = new CreationForm();
    }

    start = () => {
         this.header.renderHeader(this.parent);
         this.creationForm.renderTo(this.appContainer);
       
        
    };

}