import { CameraResultType, CameraSource } from "@capacitor/camera";
import { Endpoints } from "./endpoints";


export interface Environment {
  production: boolean;
  nativeServices: {
    camera: {
      resultType: CameraResultType;
      source: CameraSource;
      quality: number;
    };
  };
  endpoints: Endpoints;
}
