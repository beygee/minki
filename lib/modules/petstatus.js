const path = require('path')
const jsonfile = require('jsonfile')

const FILEPATH = path.resolve(__dirname, '..', 'stat.json')

const MAX_HUNGER = 10

class PetStatus {
  constructor() {
    try {
      this.data = jsonfile.readFileSync(FILEPATH)
    } catch (e) {
      //파일이 없을 경우
      this.data = {
        level: 1,
        exp: 0,
        hunger: 5,
        name: 'minki'
      }
    }
  }

  //먹이 주기 -> 경험치 증가, 포만감 채우기
  feed(amount) {
    //만일 포만감이 거의 차 있을 경우, 먹이를 먹지 않는다.
    if (this.getHunger() > MAX_HUNGER * 0.9) {
      return false
    }

    const exp = amount || Math.round(Math.random() * 10 + 1)
    this._addExp(exp)

    const hunger = Math.round(Math.random() * 2 + 1)
    this._addHunger(hunger)

    return true
  }

  //timestamp 업데이트 -> 포만감 하락, 경험치 증가
  updateTimestamp() {
    //저장된 시간에서 현재시각의 차를 구한다.
    const currentTime = new Date().getTime()
    const prevTime = this.getTimestamp()
    const diffSec = Math.round((currentTime - prevTime) / 1000)

    this._set('timestamp', currentTime)

    // 시간이 지난 만큼 경험치 상승, 포만감 하락
    this._addExp(diffSec)
    this._addHunger(-diffSec * 0.1)
  }

  rename(name) {
    this._set('name', name)
  }

  reset() {
    this._set('level', 1)
    this._set('exp', 0)
    this._set('hunger', 5)
    this._set('name', 'minki')
  }

  /* --------------------------------- Private --------------------------------- */

  _addExp(exp) {
    if (exp < 0) throw new Error('exp can not be less than 0!')

    let newExp = this.data.exp + exp

    //만일 레벨업을 해야할 경우
    while (newExp >= this.getMaxExp()) {
      newExp -= this.getMaxExp()
      this._set('level', this.data.level + 1)
    }

    this._set('exp', newExp)
  }

  _addHunger(hunger) {
    const newHunger = Math.min(this.data.hunger + hunger, MAX_HUNGER)

    this._set('hunger', Math.max(newHunger, 0))
  }

  _set(key, value) {
    this.data[key] = value

    jsonfile.writeFileSync(FILEPATH, this.data)
  }

  /* --------------------------------- Getter --------------------------------- */

  getLevel() {
    return this.data.level
  }

  getExp() {
    return Math.floor(this.data.exp)
  }

  getName() {
    return this.data.name
  }

  getTimestamp() {
    return this.data.timestamp || new Date().getTime()
  }

  getHunger() {
    return Math.floor(this.data.hunger)
  }

  getMaxExp() {
    return this.data.level * 10
  }

  getMaxHunger() {
    return MAX_HUNGER
  }
}
module.exports = PetStatus
