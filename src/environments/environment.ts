// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { CameraResultType, CameraSource } from "@capacitor/camera";
import { Environment } from "./interfaces";
import { Endpoints } from "./endpoints";

export const environment: Environment = {
  production: false,
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
