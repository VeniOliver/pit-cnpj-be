import mongoose from 'mongoose';

/**
 * Schema definition for storing CNPJ-related data.
 * This schema is designed to represent company information in a structured format,
 * with fields corresponding to various attributes of a company's registration and details.
 */
const Schema = new mongoose.Schema({
  /**
   * The company's registration number (CNPJ).
   * This field is required and must be a string.
   */
  registration_number: {
    type: String,
    required: [true, 'Registration number is required.']
  },
  /**
   * The date the company was registered.
   * This field is required and must be a string.
   */
  opening_date: {
    type: String,
    required: [true, 'Opening date is required.']
  },
  /**
   * The company's official name.
   * This field is required and must be a string.
   */
  company_name: {
    type: String,
    required: [true, 'Company name is required.']
  },
  /**
   * The company's trade name (if available).
   */
  trade_name: {
    type: String
  },
  /**
   * The size or classification of the company.
   */
  size: {
    type: String
  },
  /**
   * The company's main economic activity code and description.
   */
  main_activity: {
    type: String
  },
  /**
   * The company's secondary economic activity codes and descriptions.
   */
  secondary_activities: {
    type: String
  },
  /**
   * The legal nature of the company.
   */
  legal_nature: {
    type: String
  },
  /**
   * The company's street address.
   */
  street: {
    type: String
  },
  /**
   * The number in the company's street address.
   */
  number: {
    type: String
  },
  /**
   * Additional address details (e.g., apartment, suite).
   */
  complement: {
    type: String
  },
  /**
   * The company's ZIP code.
   */
  zip_code: {
    type: String
  },
  /**
   * The neighborhood or district where the company is located.
   */
  neighborhood: {
    type: String
  },
  /**
   * The city where the company is located.
   */
  city: {
    type: String
  },
  /**
   * The state where the company is located.
   */
  state: {
    type: String
  },
  /**
   * The company's email address.
   */
  email: {
    type: String
  },
  /**
   * The company's phone number.
   */
  phone: {
    type: String
  },
  /**
   * The federative entity responsible for the company (if applicable).
   */
  responsible_entity: {
    type: String
  },
  /**
   * The company's current registration status.
   */
  status: {
    type: String
  },
  /**
   * The date when the company's registration status was last updated.
   */
  status_date: {
    type: String
  },
  /**
   * The reason for the current registration status.
   */
  status_reason: {
    type: String
  },
  /**
   * The company's special status (if any).
   */
  special_status: {
    type: String
  },
  /**
   * The date when the special status was assigned (if applicable).
   */
  special_status_date: {
    type: String
  },
  /**
   * Array to store logs or additional data related to the company.
   */
  logs: []
})

// Registering the model in Mongoose
mongoose.model('CNPJ', Schema)

/**
 * Exports the CNPJ model for use in other parts of the application.
 * This allows querying and manipulation of the CNPJ data in the database.
 */
export default mongoose.model('CNPJ')
