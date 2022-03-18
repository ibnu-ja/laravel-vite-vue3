<template>
  <v-container>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>
    <v-row
      justify="center"
      class="py-4 mb-10 pt-0"
      align="center"
    >
      <v-col
        cols="12"
        md="10"
        order="first"
        class="align-center pr-6 "
      >
        <h1 class="text-h4 text-sm-h3 text-lg-h2 mt-xl-4 font-weight-bold">
          Material design in Jetstream with <span class="text-primary">Vuetify 3 Alpha</span>
        </h1>
        <h2 class="text-h6 text-sm-h5 text-secondary mt-4 pr-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt hic blanditiis enim! Delectus eius facere cum incidunt officiis?
        </h2>
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <v-card variant="contained">
        <v-card-title class="title">
          Laravel
        </v-card-title>
        <v-card-text>
          Laravel has wonderful, thorough documentation covering every aspect of the framework. Whether you are new to the framework or have previous experience with Laravel, we recommend reading all of the documentation from beginning to end.
        </v-card-text>
        <v-card-actions>
          <v-btn
            x-large
            color="primary"
            class="mt-6 mx-4 ml-0"
            href="https://laravel.com/docs/9.x"
            target="_blank"
          >
            Laravel Documentation
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="6"
    >
      <v-card variant="contained">
        <v-card-title>
          Vuetify
        </v-card-title>
        <v-card-text>
          Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.
        </v-card-text>
        <v-card-actions>
          <v-btn
            x-large
            color="secondary"
            class="mt-6 mx-4"
            href="https://next.vuetifyjs.com/en/"
            target="_blank"
          >
            Vuetify Documentation
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img
        :src="logo"
        class="my-3"
        contain
        height="200"
      />
    </v-col>

    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        <div>Welcome to the Vuetify 3 Alpha</div>
      </h1>

      <small>Vite Preview</small>

      <p class="subheading font-weight-regular">
        For help and collaboration with other Vuetify developers,
        <br>please join our online
        <a
          href="https://community.vuetifyjs.com"
          target="_blank"
        >Discord Community</a>
      </p>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-5">
        What's next?
      </h2>

      <v-row justify="center">
        <a
          v-for="(next, i) in whatsNext"
          :key="i"
          :href="next.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ next.text }}
        </a>
      </v-row>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-5">
        Important Links
      </h2>

      <v-row justify="center">
        <a
          v-for="(link, i) in importantLinks"
          :key="i"
          :href="link.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ link.text }}
        </a>
      </v-row>
    </v-col>

    <v-col
      class="mb-5"
      cols="12"
    >
      <h2 class="headline font-weight-bold mb-5">
        Ecosystem
      </h2>

      <v-row justify="center">
        <a
          v-for="(eco, i) in ecosystem"
          :key="i"
          :href="eco.href"
          class="subheading mx-3"
          target="_blank"
        >
          {{ eco.text }}
        </a>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from '@/assets/logo.svg'

export default defineComponent({
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    logo,
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Roadmap',
        href: 'https://vuetifyjs.com/introduction/roadmap/'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  })
})
</script>
