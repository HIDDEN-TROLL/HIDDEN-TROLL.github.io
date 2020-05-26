export function loginStatisticsParams() {
  const params = {}
  if (window.history.length === 1 && !window.sessionStorage.loginStatistics) {
    params.historyLength = window.history.length
    window.sessionStorage.loginStatistics = new Date().getTime()
  }
  return params
}
