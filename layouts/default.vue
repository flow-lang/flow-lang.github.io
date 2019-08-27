<template>
  <div id="app" class="">
    <header class="{-layout fixed z-10 -} {-background bg-indigo-500 -} {-flexbox flex flex-wrap items-center justify-between -} {-spacing mx-auto mt-0 px-10 lg:px-20 py-2 -} {-sizing w-full -} {-effects shadow-md -}">
      <div class="{-sizing w-12 -}">
        <nuxt-link to="/#" class="{-typography text-gray-900 text-base no-underline font-extrabold text-xl -} {-sizing h-auto max-w-full -}">
          <img src="~/assets/img/square-logo-transparent.png">
        </nuxt-link>
      </div>
    </header>

    <nav class="{-layout container -} {-spacing lg:my-6 mx-auto px-10 lg:px-20 -}">
      <ul>
        <template v-for="(item, i) in links">
          <li v-if="item.type === 'heading'" :key="i" class="{-spacing py-2 mb-2 -}">
            <p class="{-display block -} {-typography align-middle text-sm text-gray-900 font-bold -}">
              {{ item.content }}
            </p>
          </li>

          <li v-if="item.type === 'link'" :key="i" class="{-border border-transparent border-l-4 hover:border-gray-400 -} {-spacing py-2 mb-2 -}">
            <nuxt-link :to="item.to" class="{-display block -} {-typography align-middle text-sm text-gray-700 hover:text-indigo-500 -} {-spacing pl-2 -} nuxt-link-exact-active nuxt-link-active">
              {{ item.content}} 
            </nuxt-link>
          </li>
        </template>
      </ul>
    </nav>

    <main class="{-layout container -} {-typography lg:text-justify -} {-border border-gray-400 border-b lg:border-none -} {-sizing -} {-spacing my-6 mx-auto px-10 lg:px-20 -}">
      <nuxt />
    </main>

    <footer class="{-layout -} {-border border-gray-400 border-t -} {-sizing w-full -}">
      <div class="{-layout flex flex-wrap -} {-spacing py-8 px-10 lg:px-20 -}">
        <div class="{-sizing w-full lg:w-1/2 -}">
          <h3 class="{-typography font-bold text-gray-800">About</h3>
          <p class="{-typography text-justify text-sm text-gray-600 -} {-spacing py-4 -}">
            This work was supported by the Engineering and Physical Sciences Research
            Council and the Arts and Humanities Research Council (grant EP/L01632X/1),
            ESPRC and AHRC Centre for Doctoral Training in Media and Arts Technology at
            Queen Mary University of London, School of Electronic Engineering and Computer
            Science.
          </p>
        </div>
        <div class="{-typograph lg:text-right -} {-sizing w-full lg:w-1/2 -}">
          <h3 class="{-typography font-bold text-gray-800">Socials</h3>
          <a
            href="github.com/flow-lang"
            class="{-typography text-sm text-gray-600 -} {-spacing py-4 -}"
          >GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    data: _ => ({
      links: [
        { type: 'heading', content: 'Essentials' },
        { type: 'link', content: 'Introduction', to: '/' },
        { type: 'link', content: 'The Flow Architecture', to: '/the-flow-architecture' },
        { type: 'heading', content: 'Examples' },
        { type: 'link', content: '00-polysynth', to: '/examples/00-polysynth' },
        { type: 'link', content: '01-step-sequencer', to: '/examples/01-step-sequencer' },
        { type: 'heading', content: 'Beginner\'s Guide' },
        { type: 'link', content: 'Hello World', to: '/guide/hello-world' },
        { type: 'link', content: 'Adding Interaction', to: '/guide/adding-interaction' },
        { type: 'link', content: 'Playground', to: '/guide/playground' },
        { type: 'heading', content: 'Advanced Concepts' },
        { type: 'link', content: 'Comparisons to Other Frameworks', to: '/advanced/comparison' },
        { type: 'link', content: 'Routing', to: '/advanced/routing' },
        { type: 'link', content: 'Creating a Plugin', to: '/advanced/creating-a-plugin' },
        { type: 'heading', content: 'API Reference' },
        { type: 'link', content: 'Program', to: '/api/program' },
        { type: 'link', content: 'Audio', to: '/api/audio' },
        { type: 'link', content: 'DOM', to: '/api/dom' },
        { type: 'link', content: 'Music', to: '/api/music' },
      ]
    })
  }
</script>

<style>
#app {
  display: grid;
  width: 100vw;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  grid-template-areas: "head" "main" "nav" "foot";
  grid-template-columns: 100vw;
  grid-template-rows: 64px auto 1fr 64px;
}

#app > header {
  grid-area: head;
}
#app > nav {
  grid-area: nav;
}
#app > main {
  grid-area: main;
}
#app > footer {
  grid-area: foot;
}

@media (min-width: 1024px) {
  #app {
    grid-template-areas: "head head" "nav main" "foot foot";
    grid-template-columns: 25vw 1fr;
    grid-template-rows: 64px auto 64px;
  }
}
</style>
