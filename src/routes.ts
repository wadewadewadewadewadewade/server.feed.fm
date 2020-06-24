import {WidgetController} from "./controller/WidgetController";

export const Routes = [{
    method: "get",
    route: "/widgets",
    controller: WidgetController,
    action: "all"
}, {
    method: "get",
    route: "/tags/:tag/:offset/:max",
    controller: WidgetController,
    action: "tag"
}];