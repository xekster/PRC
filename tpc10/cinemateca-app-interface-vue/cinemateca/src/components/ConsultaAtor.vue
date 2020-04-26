<template>
  <div>
    <v-alert type="warning" v-if="!atorCarregado">
      A carregar informação
    </v-alert>

    <v-card class="ma-4" v-if="atorCarregado">
      <v-card-title class="indigo darken-4 white--text" dark>
        <span class="headline">Ator: "{{ ator.info.nome }}" ({{idAtor}})</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Nome</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ ator.info.nome }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Sexo</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ ator.info.sexo }}</div>
            </v-col>
          </v-row>

          <Realizou :lista="ator.realizou"/>
          <Representa :lista="ator.representa"/>
          <Produziu :lista="ator.produziu"/>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

import Realizou from "@/components/Realizou.vue"
import Representa from "@/components/Representa.vue"
import Produziu from "@/components/Produziu.vue"


export default {
  name: 'ConsultaAtor',

  components:{
        Realizou,
        Representa,
        Produziu
    },

  props:["idAtor"],

  data: () => ({
    ator:{},
    atorCarregado: false,
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    }
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atores/" + this.idAtor);
      this.ator = response.data
      this.ator.realizou.sort((a,b) => a.anome > b.anome ? 1 : -1)
      this.ator.representa.sort((a,b) => a.anome > b.anome ? 1 : -1)
      this.ator.produziu.sort((a,b) => a.anome > b.anome ? 1 : -1)
      this.atorCarregado= true
    } 
    catch (e) {
      return e;
    }
  },

  methods: {

  }
  
}
</script>
<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>