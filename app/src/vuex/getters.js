/* function counters (state) {
  return state.counters.all
}*/

export function getTemplate (state) {
  return JSON.stringify(state.template, null, 2)
}

export function getResourceMenuItems (state) {
  let menuList = {}
  for (let resource in state.resources) {
    menuList[resource] = {
      image: state.resources[resource].image
    }
  }
  return menuList
}

/* export default {
  counters: counters,
  getTemplate: getTemplate,
  getResourceMenuItems: getResourceMenuItems
}*/

