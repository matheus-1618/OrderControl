package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ModificacoesTest {
private Modificacoes modificacoes;
	
	@BeforeEach
	void setUp() {
		modificacoes = new Modificacoes();
	}

	@Test
	void test() {
		
		modificacoes.setData("14/12/2021");
		modificacoes.setHora("13:30");
		modificacoes.setModificacao("Estoque Piracicaba excluído");
		modificacoes.setTipo("Estoque");
		
		assertEquals("14/12/2021",modificacoes.getData());
		assertEquals("13:30",modificacoes.getHora());
		assertEquals("Estoque Piracicaba excluído",modificacoes.getModificacao());
		assertEquals("Estoque",modificacoes.getTipo());
	}
}
