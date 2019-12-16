import "ojs/ojknockout";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojselectcombobox";

import * as ko from "knockout";
import * as componentStrings from "ojL10n!./resources/nls/oj-tweet-form-strings";
import Context = require("ojs/ojcontext");
import Composite = require("ojs/ojcomposite");

export default class ViewModel implements Composite.ViewModel<Composite.PropertiesType> {
    busyResolve: (() => void);
    composite: Element;
    messageText: ko.Observable<string>;
    properties: Composite.PropertiesType;
    res: { [key: string]: string };
    inputFilters: ko.Observable<string>;

    constructor(context: Composite.ViewModelContext<Composite.PropertiesType>) {        
        //At the start of your viewModel constructor
        const elementContext: Context = Context.getContext(context.element);
        const busyContext: Context.BusyContext = elementContext.getBusyContext();
        const options = {"description": "Web Component Startup - Waiting for data"};
        this.busyResolve = busyContext.addBusyState(options);

        this.composite = context.element;

        //Example observable
        this.inputFilters = ko.observable();
        this.properties = context.properties;
        this.res = componentStrings["oj-tweet-form"];

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

    start = () => {
        const inputFilters = document.getElementById('inputFilters') as any;
        let inputString: string = inputFilters.value;
        if ( inputString !== null) {
            inputString = inputString.toString().replace(","," ");
            console.log("filters: " + inputString);
            let event =
                {
                    detail: {
                        create: true,
                        filters: inputString
                    },
                };
            this.composite.dispatchEvent(new CustomEvent('stream', event));
            // inputFilters.value = '';
        } else {
            inputFilters.showMessages();
        }
    }

    stop = () => {
        let event =
            {
                detail: {
                    create: false,
                    filters: ""
                },
            };
        this.composite.dispatchEvent(new CustomEvent('stream', event));
    }
};