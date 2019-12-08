import "ojs/ojknockout";
import "ojs/ojlistview";

import * as ko from "knockout";
import * as componentStrings from "ojL10n!./resources/nls/oj-posts-list-strings";
import Context = require("ojs/ojcontext");
import Composite = require("ojs/ojcomposite");
import ArrayDataProvider = require('ojs/ojarraydataprovider');


export default class ViewModel implements Composite.ViewModel<Composite.PropertiesType> {
    busyResolve: (() => void);
    composite: Element;
    messageText: ko.Observable<string>;
    properties: Composite.PropertiesType;
    res: { [key: string]: string };

    public dataProvider: ArrayDataProvider<any, any>;
    private posts = ko.observableArray([]);

    constructor(context: Composite.ViewModelContext<Composite.PropertiesType>) {
        //At the start of your viewModel constructor
        const elementContext: Context = Context.getContext(context.element);
        const busyContext: Context.BusyContext = elementContext.getBusyContext();
        const options = { "description": "Web Component Startup - Waiting for data" };
        this.busyResolve = busyContext.addBusyState(options);

        this.composite = context.element;

        //Example observable
        this.messageText = ko.observable("Hello from Example Component");
        this.properties = context.properties;
        this.res = componentStrings["oj-posts-list"];

        // Example for parsing context properties
        // if (context.properties.name) {
        //     parse the context properties here
        // }

        this.dataProvider = new ArrayDataProvider(this.posts, { keyAttributes: '_id' });

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
        if(context.property === 'posts'){
            this.posts(context.value);
        }
    };

    disconnectd(element: Element): void {

    };
};