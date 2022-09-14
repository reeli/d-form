import {ObjectBuilder} from "./ObjectBuilder";
import {StringInput} from "../types";

export class ComponentBuilder {
  string() {
    return ObjectBuilder<StringInput>()
  }
}

