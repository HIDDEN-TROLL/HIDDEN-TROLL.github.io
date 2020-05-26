<template>
  <div class="grade-list">
    <!--上拉菜单-->
    <van-actionsheet
      v-model="getB"
      cancel-text="取消"
      :actions="actions"
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { Actionsheet } from "vant";
import { mapState } from "vuex";
import store from "../../../../store";
export default {
  name: "grade--list",
  props: {
    actions: {
      type: Array
    }
  },
  components: {
    [Actionsheet.name]: Actionsheet
  },
  data() {
    return {
      //childrenShow:this.show,
    };
  },
  // watch: {
  //     isShow(newval, oldval) {
  //         console.log(newval, oldval)
  //     }
  // },
  methods: {
    onSelect(item) {
      // console.log(item,"item")
      this.$store.commit("offShow");
      this.$emit("getIndex", item);
    },
    onCancel() {
      this.$store.commit("offShow");
    }
  },
  computed: {
    ...mapState(["isShow"]),
    getB: {
      get() {
        return this.$store.state.isShow;
      },
      set(value) {
        this.$store.state.isShow = value;
      }
    }
  }
};
</script>
