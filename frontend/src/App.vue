<template>
  <div id="app">
    <h1>{{ welcome }}</h1>
    <ul>
      <li v-for="(item) of items" v-bind:key="item.id">{{item.title + ' - ' + item.status}}</li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'app',
  data () {
    return {
      welcome: '',
      items: []
    }
  },  
  mounted () {
    this.$apollo.query({
      query: gql`query {
        Welcome
        Items {
          id
          title
          status
        }
      }`
    }).then(({data}) => {
      this.welcome = data.Welcome
      this.items = data.Items
    }).catch((error) => {
      console.error(error)
    })
  },
}
</script>

<style>
body {
  margin: 50px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
