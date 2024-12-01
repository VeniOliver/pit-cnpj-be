import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import Error from './error.class.js';
import HTML from './html.class.js';

/**
 * Class responsible for interacting with the Receita Federal (RFB) service.
 * It handles CNPJ data retrieval and CAPTCHA validation.
 */
export default class RFB {

  /**
   * Constructor for the RFB class.
   * Initializes the necessary variables such as the RFB URL and a CookieJar for handling cookies.
   */
  constructor() {
    // Set RFB URL
    this.rf_url = 'https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/valida_recaptcha.asp'
    
    // Set CookieJar to store and manage cookies
    const jar = new CookieJar()
    
    // Wrap axios client with cookie jar support
    this.client = wrapper(axios.create({ jar }))
  }

  /**
   * Retrieves CNPJ data from the Receita Federal service.
   * 
   * @param {string} cnpj - The CNPJ number to search for.
   * @param {string} capcha_response - The response token for the CAPTCHA validation.
   * @return {Object|Error} The parsed CNPJ data or an error object if something goes wrong.
   */
  async getCNPJData(cnpj, capcha_response) {
    // Create a session by making an initial POST request to the RFB URL
    await this.client.post(this.rf_url, {})

    // Prepare the payload for the request
    const payload = {
      'origem': 'comprovante',
      'cnpj': cnpj,
      'search_type': 'cnpj',
      'h-captcha-response': capcha_response
    }

    try {
      // Make a POST request to retrieve the CNPJ data
      const res = await this.client.post(this.rf_url, 
        payload, 
        { 
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseEncoding: "latin1"
        }
      )
      
      // Extract and parse the data
      const data = res.data
      return HTML.parseCNPJ(data)
    } catch (error) {
      // Error object if the request fails
      throw new Error(error?.message, 100)
    }
  }
}
