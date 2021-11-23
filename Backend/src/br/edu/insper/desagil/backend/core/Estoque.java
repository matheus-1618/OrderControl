package br.edu.insper.desagil.backend.core;

import br.edu.insper.desagil.backend.database.firestore.AutokeyFirestoreObject;

public class Estoque extends AutokeyFirestoreObject {
	private String nome;
	private String empresa;
	private String empreedimento;
	private String localizacao;
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmpresa() {
		return empresa;
	}
	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}
	public String getEmpreedimento() {
		return empreedimento;
	}
	public void setEmpreedimento(String empreedimento) {
		this.empreedimento = empreedimento;
	}
	public String getLocalizacao() {
		return localizacao;
	}
	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}
	
	
	
	
}
