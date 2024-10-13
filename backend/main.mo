import Bool "mo:base/Bool";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor BikeShop {
  // Define the Bike type
  type Bike = {
    id: Nat;
    name: Text;
    price: Nat;
    description: Text;
    stock: Nat;
  };

  // Store bikes in a stable variable
  stable var bikes: [Bike] = [];
  stable var nextId: Nat = 0;

  // Add a new bike to the inventory
  public func addBike(name: Text, price: Nat, description: Text, stock: Nat) : async Nat {
    let id = nextId;
    nextId += 1;
    let newBike: Bike = {
      id;
      name;
      price;
      description;
      stock;
    };
    bikes := Array.append(bikes, [newBike]);
    id
  };

  // Get all bikes
  public query func getAllBikes() : async [Bike] {
    bikes
  };

  // Purchase a bike
  public func purchaseBike(id: Nat) : async Bool {
    let bikeIndex = Array.indexOf<Bike>({ id = id; name = ""; price = 0; description = ""; stock = 0 }, bikes, func(a, b) { a.id == b.id });
    switch (bikeIndex) {
      case null { false };
      case (?index) {
        if (bikes[index].stock > 0) {
          let updatedBike = {
            id = bikes[index].id;
            name = bikes[index].name;
            price = bikes[index].price;
            description = bikes[index].description;
            stock = bikes[index].stock - 1;
          };
          bikes := Array.tabulate(bikes.size(), func (i: Nat) : Bike {
            if (i == index) { updatedBike } else { bikes[i] }
          });
          true
        } else {
          false
        }
      };
    }
  };
}
