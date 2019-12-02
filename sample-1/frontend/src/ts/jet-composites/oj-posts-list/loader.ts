import Composite = require("ojs/ojcomposite");
import * as view from "text!./oj-posts-list-view.html";
import viewModel from "./oj-posts-list-viewModel";
import * as metadata from "text!./component.json";
import "css!./oj-posts-list-styles";

Composite.register("oj-posts-list", {
  view: view,
  viewModel: viewModel,
  metadata: JSON.parse(metadata)
});