// require lib
import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/base16-dark.css'

// require more codemirror resource...

// you can set default global options and events when use
Vue.use(VueCodemirror, /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)