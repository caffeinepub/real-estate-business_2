import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

actor {
  type Property = {
    id : Nat;
    title : Text;
    price : Nat;
    address : Text;
    beds : Nat;
    baths : Nat;
    sqft : Nat;
    propertyType : Text;
    featured : Bool;
  };

  module Property {
    public func compare(property1 : Property, property2 : Property) : Order.Order {
      Nat.compare(property1.id, property2.id);
    };
  };

  let properties = Map.fromIter<Nat, Property>(
    [
      (
        1,
        {
          id = 1;
          title = "Luxurious Beachfront Villa";
          price = 2500000;
          address = "123 Ocean Drive, Malibu, CA";
          beds = 5;
          baths = 4;
          sqft = 4000;
          propertyType = "Villa";
          featured = true;
        },
      ),
      (
        2,
        {
          id = 2;
          title = "Cozy Suburban Family Home";
          price = 550000;
          address = "45 Maple St, Naperville, IL";
          beds = 4;
          baths = 3;
          sqft = 2200;
          propertyType = "Single Family";
          featured = false;
        },
      ),
      (
        3,
        {
          id = 3;
          title = "Modern Downtown Condo";
          price = 800000;
          address = "200 Wacker Dr, Chicago, IL";
          beds = 2;
          baths = 2;
          sqft = 1200;
          propertyType = "Condo";
          featured = true;
        },
      ),
      (
        4,
        {
          id = 4;
          title = "Charming Mountain Cabin";
          price = 350000;
          address = "76 Pine Ridge Rd, Aspen, CO";
          beds = 3;
          baths = 2;
          sqft = 1800;
          propertyType = "Cabin";
          featured = false;
        },
      ),
      (
        5,
        {
          id = 5;
          title = "Spacious City Loft";
          price = 950000;
          address = "400 Soho Ave, New York, NY";
          beds = 1;
          baths = 2;
          sqft = 1500;
          propertyType = "Loft";
          featured = true;
        },
      ),
      (
        6,
        {
          id = 6;
          title = "Elegant Historic Mansion";
          price = 1300000;
          address = "800 Oak Lane, Charleston, SC";
          beds = 6;
          baths = 5;
          sqft = 5000;
          propertyType = "Mansion";
          featured = false;
        },
      ),
    ].values(),
  );

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProperties() : async [Property] {
    properties.values().toArray().filter(func(property) { property.featured });
  };
};
