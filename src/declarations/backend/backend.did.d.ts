import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Bike {
  'id' : bigint,
  'name' : string,
  'description' : string,
  'stock' : bigint,
  'price' : bigint,
}
export interface _SERVICE {
  'addBike' : ActorMethod<[string, bigint, string, bigint], bigint>,
  'getAllBikes' : ActorMethod<[], Array<Bike>>,
  'purchaseBike' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
