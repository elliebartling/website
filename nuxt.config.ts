// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        ["vue3-notion/nuxt", { css: true }], // css is not imported by default. Set `true` to import css
        "nuxt-lodash",
        '@nuxtjs/tailwindcss',
        ['@nuxtjs/google-fonts', {
          googleFonts: {
            families: {
              'Playfair+Display': true,
            }
          }
        }]
      ],
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    },
    css: ['@/assets/notion-styles.css'],
    app: {
      pageTransition: { name: 'page', mode: 'out-in' }
    },
})
