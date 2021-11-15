package br.edu.insper.desagil.backend.core;

import br.edu.insper.desagil.backend.database.firestore.AutokeyFirestoreObject;

public class Pedido extends AutokeyFirestoreObject {
	private Urgencia urgencia;
	private Cimento cimento; //classe genérica para mais categorias de material (abrindo modal para seleção no forms)
	
	public Urgencia getUrgencia() {
		return urgencia;
	}
	public void setUrgencia(Urgencia urgencia) {
		this.urgencia = urgencia;
	}
	public Cimento getCimento() {
		return this.cimento;
	}
	public void setCimento(Cimento cimento) {
		this.cimento = cimento;
	}

}
