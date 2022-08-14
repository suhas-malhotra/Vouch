const express = require("express");

const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://suhass:pooja@cluster0.rspit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db("suhas");
const Contact = db.collection("Contact");

module.exports.addContact = async (req, res) => {
  const { name, phone_number } = req.body;
  //if no phone number or no name
  if (!name || !phone_number) {
    return res.status(422).json({ msg: "Send all the details" });
  }
  const filteredContacts = await Contact.findOne({
    phone_number: phone_number,
  });
  //error for phone number already in DB
  if (filteredContacts) {
    return res.status(404).json({ msg: "Phone number already exists" });
  }
  const data = { name, phone_number };
  //inserting details in the database
  const insertResult = await Contact.insertOne(
    data,
    {},
    //in case of error from MONGODB
    function (err, result) {
      if (err) {
        return res.status(404).json({ msg: "Something Went wrong" });
      }
    }
  );

  return res.status(200).json({ msg: "Event Inserted", insertResult });
};

module.exports.addManyContact = async (req, res) => {
  const data = req.body;
  //inserting contacts in bulk
  const insertResult = await Contact.insertMany(
    data,
    {},
    //error from mongodb
    function (err, result) {
      if (err) {
        return res.status(404).json({ msg: "Something Went wrong" });
      }
    }
  );
  return res.status(200).json({ msg: "Event Inserted", insertResult });
};

module.exports.getContact = async (req, res) => {
  const { name } = req.body;
  //getting the contact
  const filteredContacts = await Contact.find({ name: name }).toArray();
  //if no contacts with the given name
  if (filteredContacts === null) {
    return res.status(422).json({ msg: "No Contacts found" });
  }

  return res.status(200).json(filteredContacts);
};

module.exports.searchContact = async (req, res) => {
  const { name } = req.body;
  //finding contacts as per the given phase
  const filteredContacts = await Contact.find(
    { name: { $regex: name, $options: "i" } },
    {}
  ).toArray();
  //ERROR
  //if no contacts with the given phase
  if (filteredContacts === null) {
    return res.status(422).json({ msg: "No Contacts found" });
  }
  //final output
  return res.status(200).json(filteredContacts);
};

module.exports.updateContact = async (req, res) => {
  const { name, phone_number } = req.body;
  //finding the contact to be updated
  const contact = await Contact.findOne({ phone_number: phone_number });
  //ERROR
  //if no contact exists
  if (contact === null) {
    return res
      .status(404)
      .json({ msg: "No Contact with given phone number exists" });
  }
  //updating the contact
  const updatedContact = await Contact.updateOne(
    { phone_number: phone_number },
    { $set: { name: name } },
    //mongodb error
    function (err, result) {
      if (err) {
        return res.status(404).json({ msg: "Something Went wrong" });
      }
    }
  );

  return res.status(200).json({ msg: "Contact Updated" });
};

module.exports.deleteContact = async (req, res) => {
  const { name, phone_number } = req.body;
  //deleting contact with the given phone number
  const contact = await Contact.findOne({ phone_number: phone_number });
  //ERROR
  //no contact found
  if (contact === null) {
    return res
      .status(404)
      .json({ msg: "No Contact with given phone number exists" });
  }
  //deleting the contact
  const DeletedContact = await Contact.deleteOne(
    { phone_number: phone_number },
    function (err, result) {
      if (err) {
        return res.status(404).json({ msg: "Something Went wrong" });
      }
    }
  );

  return res.status(200).json({ msg: "Contact Deleted" });
};

module.exports.allContacts = async (req, res) => {
  //finding all the contact
  const filteredContacts = await Contact.find().toArray();
  //diving them in pages of size 5 each
  let size = filteredContacts.length / 5;
  let arr = [];
  let k = 0;
  for (let i = 0; i < size; i++) {
    let res = [];
    for (let j = 0; j < 5; j++) {
      if (k < filteredContacts.length) res.push(filteredContacts[k]);
      k++;
    }
    if (res.length > 0) arr.push(res);
  }
  //final output
  return res.status(200).json(arr);
};
