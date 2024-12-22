import { CameraResultType, CameraSource } from "@capacitor/camera";


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
