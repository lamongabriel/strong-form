import { validateCEP, fillCepInfo, addCEPButton } from './cepValidator'

class Form {
  constructor(id) {
    ;(this.id = id), (this.element = document.querySelector(`#${id}`))
  }

  async validateForm() {
    this.#removeAllErrors()

    this.#showFormBusy()

    let formIsValid = true

    const formRules = this.#getPropertiesFromHTMLForm()
    for (let formRule of formRules) {
      let validatedField = await this.#validateField(formRule)
      if (validatedField !== true) {
        this.#printNewError(formRule.element, validatedField)
        formIsValid = false
      }
    }

    this.#removeFormBusy()
    return formIsValid
  }

  async submitForm(e) {
    e.preventDefault()
    if (await this.validateForm()) {
      this.element.submit()
    }
  }

  #showFormBusy() {
    this.element.style.filter = 'blur(3px)'
  }

  #removeFormBusy() {
    this.element.style.filter = ''
  }

  #getPropertiesFromHTMLForm() {
    const formElements = Array(...document.querySelector(`#${this.id}`).elements)
    return this.#getPropertiesFromElement(formElements)
  }

  #getPropertiesFromElement(element) {
    if (!element) return false
    return element
      .filter(formElement => formElement.getAttribute('strong-form')?.length > 0)
      .map(formElement => {
        return {
          element: formElement,
          rules: [...formElement.getAttribute('strong-form').split('|')]
        }
      })
  }

  async #validateField(field) {
    for (let rule of field.rules) {
      const [ruleName, ruleValue] = rule.split('=')
      const userInputValue = field.element.value
      switch (ruleName.toLowerCase()) {
        case 'type':
          switch (ruleValue) {
            case 'required':
              if (userInputValue.length <= 0) return 'Required field!'
              break

            case 'cep':
              if (!(await validateCEP(userInputValue))) return 'Invalid Adress Code!'
              break

            case 'birthday':
              let today = new Date()
              if (new Date(userInputValue) > today) return 'Invalid birthday!'
              break

            case 'sex':
              if (userInputValue != 'female' && userInputValue != 'male') return 'Please select your sex'
              break

            case 'passconfirmation':
              let pass = document.querySelector('input[strong-form="type=pass"]')
              if (!pass || userInputValue.length == 0) return 'Cannot find password field'
              if (!userInputValue == pass.value) return `Both passwords must match`
              break

            case 'email':
              if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(userInputValue))
                return 'Invalid E-mail!'
              break
          }
        case 'minlength':
          if (userInputValue.length < ruleValue) return `Field must have at least ${ruleValue} characters!`
          break
        case 'maxlength':
          if (userInputValue.length > ruleValue) return `Field must have max ${ruleValue} characters!`
          break
      }
    }
    return true
  }

  #printNewError(location, error) {
    let errorElement = document.createElement('p')
    errorElement.classList.add('strong-form-error')
    errorElement.innerText = error
    location.parentNode.insertBefore(errorElement, location.nextSibling)
  }

  #removeAllErrors() {
    document.querySelectorAll('.strong-form-error').forEach(el => el.remove())
  }
}

const form = new Form('form')
document.querySelector('#form')?.addEventListener('submit', e => form.submitForm(e))
document.querySelector('input[strong-form="type=cep"]')?.addEventListener('keyup', addCEPButton)
