package br.edu.insper.desagil.backend.core;

import java.util.Date;

import br.edu.insper.desagil.backend.database.firestore.AutokeyFirestoreObject;

public class Modificacoes extends AutokeyFirestoreObject{
	private String modificacao;
	private String data;
	private String tipo;
	private String usuario;
	public String getModificacao() {
		return modificacao;
	}
	public void setModificacao(String modificacao) {
		this.modificacao = modificacao;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	

}
