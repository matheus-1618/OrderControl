package br.edu.insper.desagil.backend.core;

public class Cimento extends Material {
	//Classe inicial, base para outras
	private MarcaCimento marca;
	
	public Cimento(int quantidade, MarcaCimento marca) {
		super(quantidade);
		this.marca = marca;
	}


	public MarcaCimento getMarca() {
		return this.marca;
	}

	public void setMarca(MarcaCimento marca) {
		this.marca = marca;
	}

	
}
