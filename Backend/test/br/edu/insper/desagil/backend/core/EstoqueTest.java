package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class EstoqueTest {
	private Estoque estoque;
	
	@BeforeEach
	void setUp() {
		estoque = new Estoque();
	}

	@Test
	void test() {
		
		estoque.setNome("Piracicaba");
		estoque.setEmpresa("Dois irmãos");
		estoque.setEmpreedimento("Construção Civil");
		estoque.setLocalizacao("Piracicaba, SP");
		
		assertEquals("Piracicaba",estoque.getNome());
		assertEquals("Dois irmãos",estoque.getEmpresa());
		assertEquals("Construção Civil",estoque.getEmpreedimento());
		assertEquals("Piracicaba, SP",estoque.getLocalizacao());
	}

}
