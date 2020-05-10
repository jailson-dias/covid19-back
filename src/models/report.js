import mongoose, { set } from "mongoose";
import * as settings from "../settings";

// DocumentModel.schema.path('facts').schema.path('type').enumValues

const report = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "The owner is required"]
  },
  postalCode: {
    type: String,
    required: [true, "The postal code is required"]
  },
  country: {
    type: String,
    required: [true, "The country is required"]
  },
  state: {
    type: String,
    required: [true, "The state is required"]
  },
  federativeUnit: {
    type: String,
    required: [true, "The federative unit is required"]
  },
  city: {
    type: String,
    required: [true, "The city is required"]
  },
  neighborhood: {
    type: String,
    required: [true, "The neighborhood is required"]
  },
  street: String,
  latitude: Number,
  longitude: Number,
  age: {
    type: Number,
    required: [true, "The age is required"],
    min: [settings.MIN_AGE, "Please enter a valid age"],
    max: [settings.MAX_AGE, "Please enter a valid age"]
  },
  gender: {
    type: String,
    enum: settings.GENDER_OPTIONS,
    required: [true, "The gender is required"]
  },
  coronavirusState: {
    type: String,
    enum: settings.CORONAVIRUS_STATE_OPTIONS,
    required: [true, "The coronavirus state is required"]
  },
  relationshipPerson: {
    type: String,
    enum: settings.RELATIONSHIP_PERSON_OPTIONS,
    required: [true, "The relationship with the person is required"]
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

const Report = mongoose.model("Report", report);

export default Report;
