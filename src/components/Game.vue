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
        <button class="start">START</button>
        <p v-if="lostRound">Sorry, you lost after {{ lostRound }} rounds</p>
        <h2>Game Mode:</h2>
        <ul>
          <template v-for="(option, i) in modeOptions">
            <li v-bind:key="option.name">
              <input
                v-bind:key="i"
                type="radio"
                name="options"
                v-bind:id="option.name"
                v-bind:value="i"
                v-model="currentGameMode"
              />
              <label v-bind:for="option.name"> {{ option.name }}</label>
            </li>
          </template>
          <h2>Game Mode:</h2>
        </ul>
        <ul>
          <template v-for="(option, i) in difficultyOptions">
            <li v-bind:key="option.name">
              <input
                v-bind:key="i"
                type="radio"
                name="options"
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
      inputSequence: [],
      gameRun: true,
      wheelActive: true,
      highlightedSector: null,
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
      currentDifficulty: 0
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
    },
    handleWheelClick (number) {
      if (this.gameRun) {
        this.inputSequence.push(number)
        if (this.gameMode.sound) {
          this.playSound(number)
        }
      }
      console.log(this.inputSequence)
    },
    playSound: (function () {
      const audios = [new Audio(), new Audio(), new Audio(), new Audio()]
      audios.forEach(
        (audio, number) =>
          (audio.src = require(`../assets/audio/${number + 1}.mp3`))
      )
      return function (number) {
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
  .menu
    margin-left: 50px
    text-align: left

    h2
      width: fit-content
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
