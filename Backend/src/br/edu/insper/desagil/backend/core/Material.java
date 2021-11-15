package br.edu.insper.desagil.backend.core;

public abstract class Material {
	// Criando classe abstrata para expandir para diversos materiais após definição com cliente
	private int quantidade;
	
	public Material(int quantidade) {
		this.quantidade = quantidade;

	}

	public int getQuantidade() {
		return this.quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

}
