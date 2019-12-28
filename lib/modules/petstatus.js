const path = require('path')
const stat = require('../stat.json')
const jsonfile = require('jsonfile')

class PetStatus {
  constructor() {
    this.data = stat
  }

  get(key) {
    return this.data[key]
  }

  set(key, value) {
    this.data[key] = value
    console.log(this.data)

    jsonfile.writeFile(
      path.resolve(__dirname, '..', 'stat.json'),
      this.data,
      function(err) {
        if (err) console.error(err)
      }
    )
  }
}
module.exports = PetStatus
