import { MobileSystemChildElement } from "../models/mobile-system-child-element";
import axiosClient from "./axiosClient";

export const mobileSystemApi = {
    getChildElements(): Promise<MobileSystemChildElement> {
        const url = "/mobile-systems/get-child-elements";
        return axiosClient.get(url);
      },
}