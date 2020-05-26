const variables = {}

export function setGlobalVar(key, value) {
  variables[key] = value
}

export function getGlobalVar(key, defaultValue = null) {
  return variables[key] !== undefined ? variables[key] : defaultValue
}
