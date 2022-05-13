import React, { Component } from "react";
import axios from "axios";

import PageHeader from "../template/pageHeader";
import CadastroForm from "./cadastroForm";
import CadastroList from "./cadastroList";

const URL = "http://localhost:3003/api/cadastro";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: "", list: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.refresh();
  }

  refresh(nome = "") {
    const search = nome ? `&nome__regex=/${nome}/` : "";
    axios
      .get(`${URL}?sort=nome${search}`)
      .then((resp) =>
        this.setState({ ...this.state, nome: "", list: resp.data })
      );
  }

  handleSearch() {
    this.refresh(this.state.nome);
  }

  handleClear() {
    this.refresh();
  }

  handleChange(e) {
    this.setState({ ...this.state, nome: e.target.value });
  }

  handleAdd() {
    const nome = this.state.nome;
    axios.post(URL, { nome }).then((resp) => this.refresh());
  }

  handleMarkAsPending(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then((resp) => this.refresh(this.state.nome));
  }

  handleMarkAsDone(todo) {
    axios
      .put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then((resp) => this.refresh(this.state.nome));
  }

  handleRemove(todo) {
    axios
      .delete(`${URL}/${todo._id}`)
      .then((resp) => this.refresh(this.state.nome));
  }

  render() {
    return (
      <div>
        <PageHeader name="Cadastro"></PageHeader>

        <CadastroForm
          nome={this.state.nome}
          handleChange={this.handleChange}
          handleAdd={this.handleAdd}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}
        />

        <CadastroList
          list={this.state.list}
          createdAt={this.state.createdAt}
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsPending={this.handleMarkAsPending}
        />
      </div>
    );
  }
}