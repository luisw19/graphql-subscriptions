import "ojs/ojknockout";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";

import * as ko from "knockout";
import * as componentStrings from "ojL10n!./resources/nls/oj-post-form-strings";
import Context = require("ojs/ojcontext");
import Composite = require("ojs/ojcomposite");

export default class ViewModel implements Composite.ViewModel<Composite.PropertiesType> {
    busyResolve: (() => void);
    composite: Element;
    messageText: ko.Observable<string>;
    properties: Composite.PropertiesType;
    res: { [key: string]: string };

    constructor(context: Composite.ViewModelContext<Composite.PropertiesType>) {        
        //At the start of your viewModel constructor
        const elementContext: Context = Context.getContext(context.element);
        const busyContext: Context.BusyContext = elementContext.getBusyContext();
        const options = {"description": "Web Component Startup - Waiting for data"};
        this.busyResolve = busyContext.addBusyState(options);

        this.composite = context.element;

        //Example observable
        this.messageText = ko.observable("Hello from Example Component");
        this.properties = context.properties;
        this.res = componentStrings["oj-post-form"];

        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        //Once all startup and async activities have finished, relocate if there are any async activities
        this.busyResolve(); 
    }

    //Lifecycle methods - implement if necessary 

    activated(context: Composite.ViewModelContext<Composite.PropertiesType>): Promise<any> | void {
    
    };

    connected(context: Composite.ViewModelContext<Composite.PropertiesType>): void {
    
    };

    bindingsApplied(context: Composite.ViewModelContext<Composite.PropertiesType>): void {
    
    };

    propertyChanged(context: Composite.PropertyChangedContext<Composite.PropertiesType>): void {
    
    };

    disconnectd(element: Element): void {
    
    };

    submit = () => {
        const inputAuthor = document.getElementById('inputAuthor') as any;
        const inputTitle = document.getElementById('inputTitle') as any;
        const inputBody = document.getElementById('inputBody') as any;

        if (
            inputAuthor.valid === 'valid'
            && inputTitle.valid === 'valid'
            && inputBody.valid === 'valid'
        ) {
            this.composite.dispatchEvent(new CustomEvent('submit', {
                detail: {
                    author: inputAuthor.value,
                    title: inputTitle.value,
                    body: inputBody.value,
                },
            }));
            inputAuthor.value = '';
            inputTitle.value = '';
            inputBody.value = '';
        } else {
            inputAuthor.showMessages();
            inputTitle.showMessages();
            inputBody.showMessages();
        }
    }
};