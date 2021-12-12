package br.edu.insper.desagil.backend.core;

import java.util.Date;

import br.edu.insper.desagil.backend.database.firestore.AutokeyFirestoreObject;

public class Notificacoes extends AutokeyFirestoreObject{
	private String notificacao;
	private String data;
	private String hora;
	private String tipo;
	
	public String getNotificacao() {
		return notificacao;
	}
	public void setNotificacao(String notificacao) {
		this.notificacao = notificacao;
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
