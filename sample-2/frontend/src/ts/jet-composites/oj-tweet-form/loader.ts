import Composite = require("ojs/ojcomposite");
import * as view from "text!./oj-tweet-form-view.html";
import viewModel from "./oj-tweet-form-viewModel";
import * as metadata from "text!./component.json";
import "css!./oj-tweet-form-styles";

Composite.register("oj-tweet-form", {
  view: view,
  viewModel: viewModel,
  metadata: JSON.parse(metadata)
});