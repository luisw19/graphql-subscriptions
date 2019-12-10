import Composite = require("ojs/ojcomposite");
import * as view from "text!./oj-tweets-list-view.html";
import viewModel from "./oj-tweets-list-viewModel";
import * as metadata from "text!./component.json";
import "css!./oj-tweets-list-styles";

Composite.register("oj-tweets-list", {
  view: view,
  viewModel: viewModel,
  metadata: JSON.parse(metadata)
});