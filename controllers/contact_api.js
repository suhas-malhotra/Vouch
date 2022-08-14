const express = require("express");

const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://suhass:pooja@cluster0.rspit.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db("suhas");
const Contact = db.collection("Contact");

module.exports.addContact = async (req, res) => {
  const { name, phone_number } = req.body;
  if (!name || !phone_number) {
    return res.status(422).json({ msg: "Send all the details" });
  }
  const data = { name, phone_number };
  const insertResult = await Contact.insertOne(data, {});

  return res.status(200).json({ msg: "Event Inserted", insertResult });
};

module.exports.addManyContact = async (req, res) => {
  const data = req.body;
  const insertResult = await Contact.insertMany(data, {});
  return res.status(200).json({ msg: "Event Inserted", insertResult });
};

module.exports.getContact = async (req, res) => {
  const { name } = req.body;
  const filteredContacts = await Contact.find({ name: name }).toArray();
  if (filteredContacts === null) {
    return res.status(422).json({ msg: "No Contacts found" });
  }
  console.log(filteredContacts);
  return res.status(200).json(filteredContacts);
};

module.exports.searchContact = async (req, res) => {
  const { name } = req.body;
  const filteredContacts = await Contact.find(
    { name: { $regex: name, $options: "i" } },
    {}
  ).toArray();
  if (filteredContacts === null) {
    return res.status(422).json({ msg: "No Contacts found" });
  }
  console.log(filteredContacts);
  return res.status(200).json(filteredContacts);
};

module.exports.updateContact = async (req, res) => {
  const { name, phone_number } = req.body;

  const contact = await Contact.findOne({ phone_number: phone_number });
  if (contact === null) {
    return res
      .status(404)
      .json({ msg: "No Contact with given phone number exists" });
  }
  const updatedContact = await Contact.updateOne(
    { phone_number: phone_number },
    { $set: { name: name } },
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

  const contact = await Contact.findOne({ phone_number: phone_number });
  if (contact === null) {
    return res
      .status(404)
      .json({ msg: "No Contact with given phone number exists" });
  }
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
  const filteredContacts = await Contact.find().toArray();
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

  return res.status(200).json(arr);
};
