import { CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "./interfaces";
import { Endpoints } from "./endpoints";

export const environment: Environment = {
  production: true,
  nativeServices: {
    camera: {
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      quality: 100
    }
  },
  endpoints: {
    GetPicsumRandomPhoto: Endpoints.GetPicsumRandomPhoto,
  }
};
