/**
 * This file contains all the hacks that we need to make on the types generated from the OAS for ya-client
 * so that the end-user libraries can adopt it more with confidence
 *
 * We're leveraging declaration merging to augment the types produced by the generator
 */
// import type { CancelablePromise } from "../generated/market-api";
// import { AgreementOperationEventDTO } from "../generated/market-api";
//
// declare module "ya-ts-client/dist/market-api/services" {
//   export interface RequestorService {
//     collectAgreementEvents(
//       timeout: number,
//       afterTimestamp?: string,
//       maxEvents: number,
//       appSessionId?: string,
//     ): CancelablePromise<Array<AgreementOperationEventDTO>>;
//   }
// }
