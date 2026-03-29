import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactSubmission {
    public func compare(c1 : ContactSubmission, c2 : ContactSubmission) : Int {
      c1.timestamp - c2.timestamp;
    };
  };

  let contactSubmissions = List.empty<ContactSubmission>();

  let adminId = Principal.fromText("2vxsx-fae");

  public shared ({ caller }) func submitContact(
    name : Text,
    email : Text,
    phone : Text,
    subject : Text,
    message : Text,
    timestamp : Int,
  ) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      subject;
      message;
      timestamp;
    };
    contactSubmissions.add(submission);
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (caller != adminId) {
      Runtime.trap("Unauthorized: Only admin can access all contact submissions");
    };
    contactSubmissions.toArray().reverse();
  };
};
