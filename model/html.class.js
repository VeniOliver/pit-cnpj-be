import Error from './error.class.js';
import { parse } from 'node-html-parser';
import { decode } from 'html-entities';

/**
 * Class responsible for parsing HTML data related to CNPJ information
 */
export default class HTML {

  /**
   * Returns a mapping of CNPJ table fields to their respective JSON keys
   * @return {Object} The mapping of CNPJ table fields
   */
  static get cnpj_table_fields() {
    return {
      'NÚMERO DE INSCRIÇÃO': 'registration_number',
      'DATA DE ABERTURA': 'opening_date',
      'NOME EMPRESARIAL': 'company_name',
      'TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)': 'trade_name',
      'PORTE': 'size',
      'CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL': 'main_activity',
      'CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS': 'secondary_activities',
      'CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA': 'legal_nature',
      'LOGRADOURO': 'street',
      'NÚMERO': 'number',
      'COMPLEMENTO': 'complement',
      'CEP': 'zip_code',
      'BAIRRO/DISTRITO': 'neighborhood',
      'MUNICÍPIO': 'city',
      'UF': 'state',
      'ENDEREÇO ELETRÔNICO': 'email',
      'TELEFONE': 'phone',
      'ENTE FEDERATIVO RESPONSÁVEL (EFR)': 'responsible_entity',
      'SITUAÇÃO CADASTRAL': 'status',
      'DATA DA SITUAÇÃO CADASTRAL': 'status_date',
      'MOTIVO DE SITUAÇÃO CADASTRAL': 'status_reason',
      'SITUAÇÃO ESPECIAL': 'special_status',
      'DATA DA SITUAÇÃO ESPECIAL': 'special_status_date'
    }
  }

  /**
   * Decodes and normalizes text by removing extra spaces and trimming
   * @param {string} text - The text to decode
   * @return {string} The normalized text
   */
  static decodeText(text) {
    return decode(text)?.replace(/(\s)+/g, ' ')?.trim()
  }

  /**
   * Parses an HTML document and extracts CNPJ information
   * @param {string} html - The HTML content to parse
   * @return {Object} The extracted CNPJ data as a JSON object
   * @throws {Error} If an error message is found in the HTML
   */
  static parseCNPJ(html) {
    const root = parse(html)

    // Check for error in the HTML
    let error_html = root?.querySelector('.conteudo .alert-danger p')
    if (error_html) {
      throw new Error(this.decodeText(error_html?.rawText), 100)
    }

    // Extract the main content
    let result_html = root?.querySelector('#principal')
    let tables = result_html?.querySelectorAll('table table')
    let json = {}

    // Parse all tables
    tables.forEach((table, index) => {
      json = { 
        ...json, 
        ...(index == 5 ? this.parseCNPJTable(table, true) : this.parseCNPJTable(table)) 
      }
    })

    return json
  }

  /**
   * Parses a specific CNPJ table from HTML
   * @param {Object} html - The HTML table element
   * @param {boolean} [multiple=false] - Whether the table has multiple values per field
   * @param {number} [position=0] - Position of the value to extract if multiple is false
   * @return {Object} The parsed data as a JSON object
   */
  static parseCNPJTable(html, multiple = false, position = 0) {
    const data = new Map()

    // Get all rows from the table
    const rows = html?.querySelectorAll('tr') || []
    rows.forEach((row) => {
      // Get all cells in the row
      const cols = row?.querySelectorAll('td') || []
      cols.forEach((col) => {
        // Get the label from the first <font> tag
        const label = this.cnpj_table_fields[this.decodeText(col?.querySelector('font')?.rawText)]
        if (label && label !== '') {
          // Initialize label value in the map
          if (!data.has(label)) {
            data.set(label, multiple ? [] : '')
          }

          // Get text values from <b> tags
          const texts = col?.querySelectorAll('b') || []
          texts.forEach((text, index) => {
            const parsedText = this.decodeText(text?.rawText)
            if (!multiple && index === position) data.set(label, parsedText)
            if (multiple && index >= position) data.get(label).push(parsedText)
          })
        }
      })
    })

    // Convert map to a JSON object
    return multiple ? Object.fromEntries(data) : Object.fromEntries(data)
  }
}
