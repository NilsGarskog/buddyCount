<template>
  <div class="PopUp" v-on:click="closePopup">
    <div class="popupinner" v-on:click="innerBox">
        <slot />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      innerBoxStatus: false
    }
  },
  methods:{
      innerBox: function(){
    this.innerBoxStatus = true
  },
  closePopup: function() {
    if(this.innerBoxStatus===false){
    this.$emit('closeCurrentPopup')
    }
    this.innerBoxStatus=false;
  },
  }
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
 background: #70C1B3;
 padding: 1em;
 border-radius: 1em;
 width:50%;
 position: relative;
    }
  

@media screen and (max-width:50em) {
  .popupinner{
  width: 80%;
  }
}
</style>