export const idlFactory = ({ IDL }) => {
  const Bike = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'stock' : IDL.Nat,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'addBike' : IDL.Func([IDL.Text, IDL.Nat, IDL.Text, IDL.Nat], [IDL.Nat], []),
    'getAllBikes' : IDL.Func([], [IDL.Vec(Bike)], ['query']),
    'purchaseBike' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
