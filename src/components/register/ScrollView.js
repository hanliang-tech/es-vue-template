import Vue from 'vue';

function registerScrollView() {
  Vue.registerElement('tkdScrollView', {
    component: {
      name: 'tkdScrollView',
    },
  });
  Vue.component('scroll-view',{
    methods: {
      scrollTo(x, y, animation) {
        Vue.Native.callUIFunction(this.$refs.tkdScrollView, 'scrollTo', [x, y, animation]);
      },
    },
    render(h) {
      return h('tkdScrollView',
        {
          ref: 'tkdScrollView',
        }, this.$slots.default
      );
    },
  });
}

export default registerScrollView;
