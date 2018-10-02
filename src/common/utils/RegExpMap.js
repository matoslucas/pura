export default class RegExpMap {
  constructor(arr) {
    this.stringKeyMap = arr.filter(pair => typeof pair[0] === 'string')
      /* eslint-disable no-param-reassign */
      .reduce((map, pair) => {
        map[pair[0]] = pair[1]
        return map
      }, {})
      /* eslint-enable no-param-reassign */
    this.regexpKeyPairs = arr.filter(pair => pair[0] instanceof RegExp)
  }

  get(key) {
    if (this.stringKeyMap[key]) return this.stringKeyMap[key]
    for (const pair of this.regexpKeyPairs) {
      if (pair[0].test(key)) return pair[1]
    }
    return undefined
  }
}
