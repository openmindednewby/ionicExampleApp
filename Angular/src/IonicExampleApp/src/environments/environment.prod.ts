import { CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "./interfaces";

export const environment: Environment = {
  production: true,
  nativeServices: {
    camera: {
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 100
    }
  },
  endpoints: Endpoints.example
};
