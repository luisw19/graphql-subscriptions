import Composite = require("ojs/ojcomposite");
import * as view from "text!./oj-post-form-view.html";
import viewModel from "./oj-post-form-viewModel";
import * as metadata from "text!./component.json";
import "css!./oj-post-form-styles";

Composite.register("oj-post-form", {
  view: view,
  viewModel: viewModel,
  metadata: JSON.parse(metadata)
});