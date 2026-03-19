import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

actor {
  let profiles = Map.empty<Text, Text>();

  public shared ({ caller }) func addProfileLink(key : Text, link : Text) : async () {
    profiles.add(key, link);
  };

  public shared ({ caller }) func deleteProfileLink(key : Text) : async () {
    switch (profiles.get(key)) {
      case (null) {
        Runtime.trap("Profile link does not exist. ");
      };
      case (?_) {
        profiles.remove(key);
      };
    };
  };

  public query ({ caller }) func getProfileLink(key : Text) : async Text {
    switch (profiles.get(key)) {
      case (null) {
        Runtime.trap("Profile link does not exist. ");
      };
      case (?link) { link };
    };
  };

  public query ({ caller }) func getAllProfileLinks() : async [(Text, Text)] {
    profiles.entries().toArray();
  };
};
