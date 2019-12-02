import 'oj-posts-list/loader';
import "oj-post-form/loader";

import * as ko from "knockout";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import * as ResponsiveKnockoutUtils from "ojs/ojresponsiveknockoututils";
import { IPost } from './model/post';
import { graphQLClient } from './graphgl-client';

class FooterLink {
  name: string;
  id: string;
  linkTarget: string;
  constructor({ name, id, linkTarget }: {
    name: string;
    id: string;
    linkTarget: string;
  }) {
    this.name = name;
    this.id = id;
    this.linkTarget = linkTarget;
  }
}

class RootViewModel {
  smScreen: ko.Observable<boolean>;
  appName: ko.Observable<string>;
  userLogin: ko.Observable<string>;
  footerLinks: ko.ObservableArray<FooterLink>;

  posts: ko.ObservableArray<IPost>;

  constructor() {
    // media queries for repsonsive layouts
    let smQuery: string | null = ResponsiveUtils.getFrameworkQuery("sm-only");
    if (smQuery) {
      this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    }

    // header

    // application Name used in Branding Area
    this.appName = ko.observable("App Name");

    // user Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    // footer
    this.footerLinks = ko.observableArray([
      new FooterLink({ name: "About Oracle", id: "aboutOracle", linkTarget: "http://www.oracle.com/us/corporate/index.html#menu-about" }),
      new FooterLink({ name: "Contact Us", id: "contactUs", linkTarget: "http://www.oracle.com/us/corporate/contact/index.html" }),
      new FooterLink({ name: "Legal Notices", id: "legalNotices", linkTarget: "http://www.oracle.com/us/legal/index.html" }),
      new FooterLink({ name: "Terms Of Use", id: "termsOfUse", linkTarget: "http://www.oracle.com/us/legal/terms/index.html" }),
      new FooterLink({ name: "Your Privacy Rights", id: "yourPrivacyRights", linkTarget: "http://www.oracle.com/us/legal/privacy/index.html" })
    ]);

    this.posts = ko.observableArray([]);
    graphQLClient.query().then(posts => {
      console.log(posts);
      this.posts(posts.reverse());
    });
    graphQLClient.subscribe().subscribe((response) => {
      console.log(response.data.PostCreated);
      this.posts.unshift(response.data.PostCreated);
    });
  }

  post = (event: CustomEvent) => {
    console.log(event.detail);
    graphQLClient.mutation(event.detail);
  }
}

export default new RootViewModel();