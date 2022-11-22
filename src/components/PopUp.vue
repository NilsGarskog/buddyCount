<template>
  <div class="PopUp">
    <div class="popupinner">
        <slot />
                <button class ="popup-close" v-on:click="closePopup">
            Close
        </button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
  closePopup: function() {
    this.$emit('closeCurrentPopup')
  }
  },

}
</script>

<style scoped>
.PopUp{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.7);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popupinner{
 background: #63c96386;
 padding: 1em;
 border-radius: 1em;
    }

.popup-close {          /* Knapp utseende hämtat från github via "getcssscan.com" */
  appearance: none;
  height: 40px;
  background-color: red;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  display: inline-block;
}

.popup-close:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.popup-close:hover {
  background-color: rgb(155, 1, 1);
}

.popup-close:focus {
  box-shadow: rgba(164, 89, 46, 0.4) 0 0 0 3px;
  outline: none;
}

.popup-close:disabled {
  background-color: #d3a394;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

.popup-close:active {
  background-color: #8e6229;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}


button:hover {
  background-color: rgb(128, 83, 0);
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>