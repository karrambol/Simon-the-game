<template>
  <div
    class="buttons-wheel"
    v-on:mousedown="handleClick"
    v-on:mouseup="registerClick"
    v-on:mouseleave="handleLeave"
    v-bind:class="{ active: active }"
  >
    <ul>
      <template v-for="(classObject, index) in liClassArray">
        <li
          v-bind:key="index"
          v-bind:class="classObject"
          v-on:mouseover="handleMouseover(index)"
        ></li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ButtonsWheel',
  props: {
    active: {
      type: Boolean,
      default: true
    },
    highlightedSector: Number
  },
  data () {
    return {
      clickedSector: -1,
      hoveredSector: -1
    }
  },
  computed: {
    liClassArray () {
      return [0, 1, 2, 3].map((el, i) => {
        return {
          highlight:
            i === this.highlightedSector ||
            (i === this.clickedSector && this.active)
        }
      })
    }
  },
  methods: {
    handleClick (index) {
      this.clickedSector = this.hoveredSector
    },
    handleMouseover (index) {
      this.hoveredSector = index
    },
    handleLeave (index) {
      this.hoveredSector = -1
    },
    registerClick () {
      this.$emit('click-registered', this.hoveredSector)
      this.clickedSector = -1
    }
  }
}
</script>

<style scoped lang="sass">
.buttons-wheel
  background-color: #fff
  box-shadow: 2px 1px 12px #aaa
  padding: 0px 4px 4px 0px
  width: 300px
  height: 300px
  border-radius: 150px
  overflow: visible
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  ul
    height: inherit
    width: inherit
    padding: 0
    margin: 0
    list-style: none
    li
      position: absolute
      padding: 0
      border-radius: 150px
      opacity: 0.6
      height: 292px
      width: 292px
      border: 3px solid rgba(0, 0, 0, 0)
      &:nth-child(1)
        clip: rect(0px, 300px, 150px, 150px)
        background-color: #FF5643
      &:nth-child(2)
        clip: rect(150px,300px, 300px, 150px)
        background-color: #BEDE15
      &:nth-child(3)
        clip: rect(150px, 150px, 300px, 0px)
        background-color: #FEEF33
      &:nth-child(4)
        clip: rect(0px, 150px, 150px, 0px)
        background-color: #1e90ff

    .highlight
      opacity: 1
  &.active
    li:hover
      border: 3px solid rgba(0, 0, 0, 1)
      cursor: pointer
</style>
