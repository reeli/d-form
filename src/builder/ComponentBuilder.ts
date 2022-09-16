import {ObjectBuilder} from "./ObjectBuilder";
import {StringInput, SelectInput} from "../types";
import {ExcludeOptionalProps} from "./type";

export class ComponentBuilder {
  string(props: Omit<ExcludeOptionalProps<StringInput>, "type">) {
    return ObjectBuilder<Omit<StringInput, "type">>(props)
  }

  select(props: Omit<ExcludeOptionalProps<SelectInput>, "type">){
    return ObjectBuilder<Omit<SelectInput, "type">>(props)
  }
}

