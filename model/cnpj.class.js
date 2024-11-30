import Error from './error.class.js';
import Log from './log.class.js';
import RFB from './rfb.class.js';
import CNPJDB from '../service/cnpj.db.js';



/**
 * Class CNPJ.
 */
export default class CNPJ {

  constructor() {
    this.logs = []
  }

  /**
   * Sets the registration number of the company.
   * Validates if a registration number (CNPJ) is provided.
   * If not, throws an error with a message indicating it is required.
   * 
   * @param {string} registration_number - The registration number (CNPJ) of the company.
   * @throws {Error} If no registration number is provided.
   */
  set _registration_number(registration_number) {
    if (!registration_number) throw new Error('Registration number is required.')
    this.registration_number = registration_number
  }

  /**
   * Sets the opening date of the company.
   * Validates if an opening date is provided.
   * If not, throws an error with a message indicating it is required.
   * 
   * @param {string} opening_date - The date the company was registered (formatted as a string).
   * @throws {Error} If no opening date is provided.
   */
  set _opening_date(opening_date) {
    if (!opening_date) throw new Error('Opening date is required.')
    this.opening_date = opening_date
  }

  /**
   * Sets the company name.
   * Validates if a company name is provided.
   * If not, throws an error with a message indicating it is required.
   * 
   * @param {string} company_name - The official name of the company.
   * @throws {Error} If no company name is provided.
   */
  set _company_name(company_name) {
    if (!company_name) throw new Error('Company name is required.')
    this.company_name = company_name
  }

  /**
   * Sets the trade name of the company.
   * @param {string} trade_name - The trade name (if applicable).
   */
  set _trade_name(trade_name) {
    this.trade_name = trade_name
  }

  /**
   * Sets the size of the company.
   * @param {string} size - The size classification of the company.
   */
  set _size(size) {
    this.size = size
  }

  /**
   * Sets the main activity of the company.
   * @param {string} main_activity - The main economic activity code and description.
   */
  set _main_activity(main_activity) {
    this.main_activity = main_activity
  }

  /**
   * Sets the secondary activities of the company.
   * @param {string} secondary_activities - The secondary economic activity codes and descriptions.
   */
  set _secondary_activities(secondary_activities) {
    this.secondary_activities = secondary_activities
  }

  /**
   * Sets the legal nature of the company.
   * @param {string} legal_nature - The legal nature of the company.
   */
  set _legal_nature(legal_nature) {
    this.legal_nature = legal_nature
  }

  /**
   * Sets the street address of the company.
   * @param {string} street - The street address.
   */
  set _street(street) {
    this.street = street
  }

  /**
   * Sets the address number of the company.
   * @param {string} number - The address number.
   */
  set _number(number) {
    this.number = number
  }

  /**
   * Sets the complement of the company address.
   * @param {string} complement - Additional address details.
   */
  set _complement(complement) {
    this.complement = complement
  }

  /**
   * Sets the ZIP code of the company.
   * @param {string} zip_code - The ZIP code.
   */
  set _zip_code(zip_code) {
    this.zip_code = zip_code
  }

  /**
   * Sets the neighborhood of the company.
   * @param {string} neighborhood - The neighborhood or district.
   */
  set _neighborhood(neighborhood) {
    this.neighborhood = neighborhood
  }

  /**
   * Sets the city of the company.
   * @param {string} city - The city.
   */
  set _city(city) {
    this.city = city
  }

  /**
   * Sets the state of the company.
   * @param {string} state - The state.
   */
  set _state(state) {
    this.state = state
  }

  /**
   * Sets the email of the company.
   * @param {string} email - The email address.
   */
  set _email(email) {
    this.email = email
  }

  /**
   * Sets the phone number of the company.
   * @param {string} phone - The phone number.
   */
  set _phone(phone) {
    this.phone = phone
  }

  /**
   * Sets the responsible entity for the company.
   * @param {string} responsible_entity - The responsible federative entity.
   */
  set _responsible_entity(responsible_entity) {
    this.responsible_entity = responsible_entity
  }

  /**
   * Sets the current status of the company.
   * @param {string} status - The registration status.
   */
  set _status(status) {
    this.status = status
  }

  /**
   * Sets the date of the current status of the company.
   * @param {string} status_date - The date of the current registration status.
   */
  set _status_date(status_date) {
    this.status_date = status_date
  }

  /**
   * Sets the reason for the current status of the company.
   * @param {string} status_reason - The reason for the registration status.
   */
  set _status_reason(status_reason) {
    this.status_reason = status_reason
  }

  /**
   * Sets the special status of the company.
   * @param {string} special_status - The special status.
   */
  set _special_status(special_status) {
    this.special_status = special_status
  }
  
  /**
   * Sets the date of the special status.
   * @param {string} special_status_date - The date of the special status.
   */
  set _special_status_date(special_status_date) {
    this.special_status_date = special_status_date
  }

  /**
   * Sets the captcha response.
   * Validates if the captcha response is provided.
   * If not, throws an error indicating the captcha response is required.
   * 
   * @param {string} captcha_response - The response from the CAPTCHA verification.
   * @throws {Error} If no captcha response is provided.
   */
  set _captcha_response(captcha_response) {
    if (!captcha_response) throw new Error('Captcha response is required.')
    this.captcha_response = captcha_response
  }

  /**
   * Searches for CNPJ data based on the provided parameters.
   * 
   * If the CNPJ is found in the local database, it is returned directly. If not, 
   * the method fetches the data from the Receita Federal (RFB) using the provided captcha response.
   * Then, it saves the data to the database and returns the result.
   * 
   * @param {Object} params - Parameters to search for the CNPJ.
   * @param {string} params.registration_number - The registration number (CNPJ) to search for.
   * @param {string} params.captcha_response - The CAPTCHA verification response required for the RFB API.
   * 
   * @returns {Object} The CNPJ data from the local database or RFB.
   * @throws {Error} If an error occurs during the search or saving process.
   */
  async search(params) {
    try {
      this._registration_number = params?.registration_number
      this._captcha_response = params?.captcha_response

      // Check in local database
      const find_database = this.find(this.registration_number)
      if (find_database) {
        return find_database
      }

      // If not found in database, search in RFB
      const find_rfb = await RFB.getCNPJData(this.registration_number, this.captcha_response)

      // Save the data to database
      return await this.save(find_rfb)
    } catch(e) { 
      throw new Error(e.message)
    }
  }

  /**
   * Retrieves all CNPJ records from the database.
   * 
   * @returns {Array} An array of up to 100 CNPJ records in the database.
   * @throws {Error} If an error occurs during the retrieval process.
   */
  async findAll() {
    try {
      return await CNPJDB.find({}).limit(100)
    } catch(e) { 
      throw new Error(e.message)
    }
  }

  /**
   * Finds a CNPJ record in the database by its registration number.
   * 
   * @param {string} registration_number - The registration number (CNPJ) to search for.
   * 
   * @returns {Object|null} The CNPJ record if found, or null if not found.
   * @throws {Error} If an error occurs during the search process.
   */
  async find(registration_number) {
    try {
      this._registration_number = registration_number
      return await CNPJDB.find({ registration_number: this.registration_number })
    } catch(e) { 
      throw new Error(e.message)
    }
  }

  /**
   * Saves the provided CNPJ data to the database.
   * 
   * This method sets the necessary properties and creates a log entry before saving the data.
   * 
   * @param {Object} data - The CNPJ data to be saved.
   * @returns {Object} The saved CNPJ document.
   * @throws {Error} If an error occurs during the saving process.
   */
  async save(data) {
    try {
      // Set data properties
      this._registration_number = data?.registration_number
      this._opening_date = data?.opening_date
      this._company_name = data?.company_name
      this._trade_name = data?.trade_name
      this._size = data?.size
      this._main_activity = data?.main_activity
      this._secondary_activities = data?.secondary_activities
      this._legal_nature = data?.legal_nature
      this._street = data?.street
      this._number = data?.number
      this._complement = data?.complement
      this._zip_code = data?.zip_code
      this._neighborhood = data?.neighborhood
      this._city = data?.city
      this._state = data?.state
      this._email = data?.email
      this._phone = data?.phone
      this._responsible_entity = data?.responsible_entity
      this._status = data?.status
      this._status_date = data?.status_date
      this._status_reason = data?.status_reason
      this._special_status = data?.special_status
      this._special_status_date = data?.special_status_date

      // Create a log entry
      this.logs.push(new Log('create'))

      // Save the data to the database
      return await CNPJDB.create(this)
    } catch(e) { 
      throw new Error(e.message)
    }
  }

}

