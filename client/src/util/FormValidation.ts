import { FormRuleType, FormValidationConfig } from '../types/types';

class FormValidation {
  config: FormValidationConfig[];

  constructor(config: FormValidationConfig[]) {
    this.config = config;
  }

  validate(formValues: { [key: string]: string }) {
    // eslint-disable-next-line
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const validationErrors = [];

    for (const validationElement of this.config) {
      let validation = true;
      const inputToCheck = formValues[validationElement.inputName];

      if (inputToCheck === null || inputToCheck === undefined) {
        // Field was not given as parameter
        validation = false;
      } else {
        // check each validation rule
        validationElement.rules.forEach((rule: FormRuleType) => {
          switch (rule.type) {
            case 'nonEmptyField':
              if (inputToCheck.length === 0) {
                validation = false;
              }
              break;

            case 'date':
              if (Number.isNaN(Date.parse(inputToCheck))) {
                validation = false;
              }
              break;

            case 'password':
              if (inputToCheck.length < 6) {
                validation = false;
              }
              break;

            case 'email':
              if (
                inputToCheck.length < 5 ||
                !mailRegex.test(String(inputToCheck.toLowerCase()))
              ) {
                validation = false;
              }
              break;

            case 'equals':
              if (inputToCheck !== formValues[rule.field]) {
                validationErrors.push(rule.field);
                validation = false;
              }
              break;

            default:
              break;
          }
        });
      }

      if (!validation) {
        validationErrors.push(validationElement.inputName);
      }
    }

    return {
      areInputsValid: validationErrors.length === 0,
      validationErrors,
    };
  }
}

export default FormValidation;
