import "ojs/ojknockout";
import "ojs/ojlistview";

import * as ko from "knockout";
import * as componentStrings from "ojL10n!./resources/nls/oj-tweets-list-strings";
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
    private tweets = ko.observableArray([]);

    constructor(context: Composite.ViewModelContext<Composite.PropertiesType>) {
        //At the start of your viewModel constructor
        const elementContext: Context = Context.getContext(context.element);
        const busyContext: Context.BusyContext = elementContext.getBusyContext();
        const options = { "description": "Web Component Startup - Waiting for data" };
        this.busyResolve = busyContext.addBusyState(options);
        this.composite = context.element;
        this.properties = context.properties;
        this.res = componentStrings["oj-tweets-list"];
        this.dataProvider = new ArrayDataProvider(this.tweets, { keyAttributes: '_id' });
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
        if(context.property === 'tweets'){
            this.tweets(context.value);
        }
    };

    disconnectd(element: Element): void {

    };
};