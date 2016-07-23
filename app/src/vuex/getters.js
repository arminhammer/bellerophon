function counters (state) {
  return state.counters.all
}

export function getTemplate (state) {
  return JSON.stringify(state.template.template, null, 2)
}

export default {
  counters: counters,
  getTemplate: getTemplate
}

