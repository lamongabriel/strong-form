async function validateCEP(cep) {
  if (!cep) return false
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    if (response.ok) {
      const responseJSON = await response.json()
      return responseJSON
    }
  } catch (error) {
    return false
  }
}

async function fillCepInfo(cep) {
  let response = await validateCEP(cep)

  const UFElement = document.querySelector('input[strong-form*="type=uf"]')
  if (UFElement) UFElement.value = response.state

  const streetElement = document.querySelector('input[strong-form*="type=street"]')
  if (streetElement) streetElement.value = response.street

  const neighborhoodtElement = document.querySelector('input[strong-form*="type=neighborhood"]')
  if (neighborhoodtElement) neighborhoodtElement.value = response.neighborhood
}

function addCEPButton(e) {
  if (e?.target?.value?.length == 8) {
    if (document.querySelector('.button-check-cep')) return

    let checkCep = document.createElement('button')
    checkCep.setAttribute('type', 'button')
    checkCep.classList.add('button-check-cep')
    checkCep.onclick = () => fillCepInfo(e.target.value)
    checkCep.style.top = `40px`
    checkCep.style.left = `0px`
    checkCep.innerText = 'Consultar CEP'
    e.target.parentElement.style.position = 'relative'

    e.target.addEventListener('focusout', () => setTimeout(() => addCEPButton(), 100))
    e.target.addEventListener('focusin', addCEPButton)

    e.target.parentElement.append(checkCep)
  } else {
    let element = document.querySelector('.button-check-cep')
    if (element) element.remove()
  }
}

export { validateCEP, fillCepInfo, addCEPButton }
