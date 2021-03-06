<template>
  <div class="game">
    <h1>Simon Says</h1>
    <div class="main">
      <ButtonsWheel
        v-bind:active="wheelActive"
        v-bind:highlightedSector="highlightedSector"
        v-on:click-registered="handleWheelClick"
      />
      <div class="menu">
        <h2>Round: {{ currentRound }}</h2>
        <button class="start" v-on:click="handleStart">START</button>
        <p v-if="lostRound">Sorry, you lost</p>
        <p v-if="lostRound">after {{ lostRound }} rounds</p>
        <h2>Game Mode:</h2>
        <ul>
          <template v-for="(option, i) in modeOptions">
            <li v-bind:key="option.name">
              <input
                type="radio"
                name="mode"
                v-bind:id="option.name"
                v-bind:value="i"
                v-model="currentGameMode"
              />
              <label v-bind:for="option.name"> {{ option.name }}</label>
            </li>
          </template>
        </ul>
        <h2>Difficulty:</h2>
        <ul>
          <template v-for="(option, i) in difficultyOptions">
            <li v-bind:key="option.name">
              <input
                type="radio"
                name="difficulty"
                v-bind:id="option.name"
                v-bind:value="i"
                v-model="currentDifficulty"
              />
              <label v-bind:for="option.name"> {{ option.name }}</label>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonsWheel from './ButtonsWheel.vue'

export default {
  name: 'Game',
  components: {
    ButtonsWheel
  },
  data () {
    return {
      lostRound: 0,
      currentRound: 0,
      requiredSequence: [],
      gameRun: false,
      wheelActive: true,
      highlightedSector: -1,
      modeOptions: [
        { sound: true, light: true, name: 'Normal' },
        { sound: true, light: false, name: 'Sound only' },
        { sound: false, light: true, name: 'Light Only' }
      ],
      currentGameMode: 0,
      difficultyOptions: [
        { delay: 1500, name: 'Easy' },
        { delay: 1000, name: 'Normal' },
        { delay: 400, name: 'Hard' }
      ],
      currentDifficulty: 0,
      checkFunction: () => false
    }
  },

  computed: {
    gameMode () {
      return this.modeOptions[this.currentGameMode]
    },

    difficulty () {
      return this.difficultyOptions[this.currentDifficulty]
    }
  },

  methods: {
    handleStart () {
      this.currentRound = 0
      this.lostRound = 0
      this.requiredSequence = []
      this.gameRun = true
      this.startRound()
    },

    startRound () {
      this.currentRound++
      this.requiredSequence.push(this.createRandomNumber())
      this.playSequence()
      this.checkFunction = this.createCheckFunction()
    },

    playSequence () {
      const sequence = [...this.requiredSequence]
      function playUnit () {
        this.wheelActive = false
        const sector = sequence.shift()
        if (this.gameMode.light) {
          this.highlightedSector = sector
        }
        if (this.gameMode.sound) {
          this.playSound(sector)
        }
        setTimeout(() => (this.highlightedSector = -1), 200)
        if (sequence.length > 0) {
          setTimeout(playUnit.bind(this), this.difficulty.delay)
        } else {
          setTimeout(() => {
            this.wheelActive = true
          }, 200)
        }
      }
      playUnit.bind(this)()
    },

    createCheckFunction () {
      const sequence = [...this.requiredSequence]
      return function check (number) {
        const unit = sequence.shift()
        if (unit !== number) {
          this.loss()
        } else if (sequence.length < 1) {
          setTimeout(this.startRound, 750)
        }
      }
    },

    loss () {
      this.lostRound = this.currentRound
      this.gameRun = false
    },

    createRandomNumber: () => Math.floor(Math.random() * 4),

    handleWheelClick (number) {
      if (this.wheelActive && this.gameMode.sound) {
        this.playSound(number)
      }
      if (this.wheelActive && this.gameRun) {
        this.checkFunction(number)
      }
    },

    playSound: (function () {
      const audios = [new Audio(), new Audio(), new Audio(), new Audio()]
      audios.forEach(
        (audio, number) =>
          (audio.src = require(`../assets/audio/${number + 1}.mp3`))
      )
      return function (number) {
        if (audios[number].currentTime !== 0.0) {
          audios[number].pause()
          audios[number].currentTime = 0.0
        }
        audios[number].play()
      }
    })()
  }
}
</script>

<style scoped lang="sass">
.main
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  flex-wrap: wrap
  .menu
    margin: 0 50px
    text-align: left
    width: 150px
    p
      margin: 10px 0
    h2
      width: fit-content
      margin: 10px 0
    button.start
      background-color: #6DABE8
      border: none
      font-size: 20px
      padding: 10px 18px
      border-radius: 10px
      cursor: pointer
      &:hover
        background-color: #78BCFF
    ul
      list-style: none
      text-align: left
      padding: 0
</style>
