<template>
  <div class="CadastroConta">
    <v-container fill-height v-if="!registrado">
      <v-row class="text-center">
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">USER ACCOUNT MANAGER</h1>
          <div class="text-center">Crie sua conta</div>

          <v-form ref="form" v-model="valid">
            <v-card class="pa-4 elevation-15">
              <v-card-title>Dados Pessoais</v-card-title>
              <v-card-text>
                <v-flex mt-4 xs12>
                  <v-text-field
                    label="Nome Completo"
                    placeholder=" "
                    outlined
                    color="#12D699"
                    validate-on-blur
                    v-model="conta.nome"
                    background-color="#fff"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex mt-4 xs12>
                  <v-text-field
                    label="CPF"
                    placeholder=" "
                    outlined
                    color="#12D699"
                    validate-on-blur
                    v-model="conta.cpf"
                    background-color="#fff"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="E-mail"
                    placeholder=" "
                    outlined
                    :rules="emailRules"
                    required
                    v-model="conta.email"
                    color="#12D699"
                  ></v-text-field>
                </v-flex>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Telefone"
                      placeholder=" "
                      outlined
                      required
                      v-model="conta.telefone"
                      color="#12D699"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Data de Nascimento"
                          v-model="dateFormatted"
                          color="#12D699"
                          outlined
                          persistent-hint
                          append-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="conta.dataNascimento = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="conta.dataNascimento" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                    {{conta.dataNascimento}}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-card class="pa-4 mt-8 elevation-15">
              <v-card-title>Endereço</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Cep"
                      placeholder=" "
                      outlined
                      color="#12D699"
                      validate-on-blur
                      v-model="conta.cep"
                      background-color="#fff"
                      required
                      @input="pegarCep()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Logradouro"
                      placeholder=" "
                      outlined
                      color="#12D699"
                      validate-on-blur
                      v-model="conta.logradouro"
                      background-color="#fff"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="Número"
                      placeholder=" "
                      outlined
                      color="#12D699"
                      validate-on-blur
                      v-model="conta.numero"
                      background-color="#fff"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      label="Bairro"
                      placeholder=" "
                      outlined
                      color="#12D699"
                      validate-on-blur
                      v-model="conta.bairro"
                      background-color="#fff"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-flex mt-8 xs12>
              <v-text-field
                label="Senha"
                v-model="conta.senha"
                placeholder=" "
                :type="show ? 'text' : 'password'"
                outlined
                @input="senhaInput()"
                :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                @click:append="show = !show"
                color="#12D699"
              ></v-text-field>
            </v-flex>

            <v-row>
              <v-flex xs4 px-2>
                <v-progress-linear color="#12D699" :value="progress1"></v-progress-linear>
              </v-flex>
              <v-flex xs4 px-2>
                <v-progress-linear color="#12D699" :value="progress2"></v-progress-linear>
              </v-flex>
              <v-flex xs4 px-2>
                <v-progress-linear color="#12D699" :value="progress3"></v-progress-linear>
              </v-flex>
            </v-row>

            <v-flex mt-2 xs12>
              <v-icon small left :color="(length)?'#12D699': 'orange'">mdi-circle</v-icon>Pelo menos 6 caracteres
            </v-flex>
            <v-flex xs12>
              <v-icon small left :color="(upper)?'#12D699': 'orange'">mdi-circle</v-icon>Pelo Menos 1 letra maiúscula
            </v-flex>
            <v-flex xs12>
              <v-icon small left :color="(number)?'#12D699': 'orange'">mdi-circle</v-icon>Pelo menos 1 número
            </v-flex>

            <v-flex mt-4 xs12>
              <v-text-field
                label="Confirme sua senha"
                v-model="conta.senhas"
                placeholder=" "
                type="password"
                outlined
                :rules="confirmationRules"
                @click:append="show = !show"
                color="#12D699"
              ></v-text-field>
            </v-flex>
          </v-form>

          <v-btn color="green" @click="salvar()" :disabled="!valid">salvar</v-btn>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="5000" :color="color">{{msg}}</v-snackbar>
    </v-container>
    <v-row justify-center align-center v-if="registrado">
      <v-flex justify="center">
        <p class="text-center">
          <v-icon x-large color="#00f07c" style="font-size: 800%">mdi-check-circle-outline</v-icon>
        </p>
        <br />
        <br />
        <p class="text-center display-1">Tudo Certo</p>
        <p class="text-center">
          Verifique sua caixa de entrada
          <br />para confirmar seu email
          <br>
          <br>
          <v-btn color="primary" @click="registrado = false">voltar</v-btn>
        </p>
      </v-flex>
      
    </v-row>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Conta } from "../models/conta";
import GenericService from "../services/generic.service";
import CepService from "../services/cep.service";
import { Viacep } from "../models/viacep";

@Component({})
export default class CadastroConta extends Vue {
  //aqui '-'
  conta: Conta = new Conta();
  show: boolean = false;
  length: boolean = false;
  upper: boolean = false;
  number: boolean = false;
  valid: boolean = false;
  progress1: number = 0;
  progress2: number = 0;
  progress3: number = 0;
  emailRules: any = [
    v => !!v || "E-mail é obrigatório",
    v => /.+@.+/.test(v) || "E-mail precisa ter um formato válido"
  ];
  confirmationRules: any = [
    v => !!v || "A confirmação da senha é necessária",
    v => v === this.conta.senha || "Senha diferente da digitada anteriormente"
  ];
  date: any = new Date().toISOString().substr(0, 10);
  dateFormatted: any = this.formatDate(new Date().toISOString().substr(0, 10));
  menu1: any = false;
  snackbar: boolean = false;
  msg: string = ``;
  color: string = `green`;
  registrado: boolean = false;

  service: GenericService<Conta> = new GenericService<Conta>("contas");
  cepService: CepService = new CepService();

  salvar() {
    this.service
      .save(this.conta)
      .then(res => {
        this.msg = `Cadastro Realizado com Sucesso`;
        this.color = `green`;
        this.snackbar = true;
        this.registrado = true;
      })
      .catch(err => {
        this.msg = `Erro ao Cadatrar`;
        this.color = `red`;
        this.snackbar = true;
      });
  }

  pegarCep() {
    this.cepService
      .getEndereco(this.conta.cep)
      .then(res => this.setarEndereco(res.data));
  }

  setarEndereco(end: Viacep) {
    this.conta.logradouro = end.logradouro;
    this.conta.numero = end.numero;
    this.conta.bairro = end.bairro;
  }

  senhaInput() {
    this.length = this.conta.senha.length >= 6 ? true : false;

    this.upper = /[A-Z]/.test(this.conta.senha) ? true : false;
    this.number = /[0-9]/.test(this.conta.senha) ? true : false;
    this.progress1 = this.length || this.upper || this.number ? 100 : 0;
    this.progress2 =
      (this.length && this.upper) || (this.upper && this.number) || (this.length && this.number) ? 100 : 0;
    this.progress3 = this.length && this.upper && this.number ? 100 : 0;
  }

  formatDate(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    let dd = `${day}/${month}/${year}`;
    return dd;
  }
  parseDate(date) {
    if (!date) return null;

    const [month, day, year] = date.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  @Watch('conta',{deep: true})
  nada(){
    this.dateFormatted = this.formatDate(this.conta.dataNascimento);
  }
}
</script>


<style lang="scss">
</style>