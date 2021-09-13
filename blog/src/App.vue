<template>
  <v-app id="app">

     <!--内容填充-->
    <v-content>
    <router-view :key="$route.fullPath" />
    </v-content>

  </v-app>
</template>


<script>

</script>
