package br.edu.insper.desagil.backend.core;

import java.util.Date;

import br.edu.insper.desagil.backend.database.firestore.AutokeyFirestoreObject;

public class Modificacoes extends AutokeyFirestoreObject{
	private String modificacao;
	private String data;
	private String hora;
	private String tipo;
	
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
	public String getHora() {
		return hora;
	}
	public void setHora(String hora) {
		this.hora = hora;
	}
	

}
