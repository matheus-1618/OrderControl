package br.edu.insper.desagil.backend.endpoint;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.BackendTest;
import br.edu.insper.desagil.backend.core.Estoque;
import br.edu.insper.desagil.backend.httpserver.EndpointTest;
import br.edu.insper.desagil.backend.httpserver.Result;

class EstoqueEndpointTest extends EndpointTest<Estoque> {
	@BeforeEach
	public void setUp() {
		start(BackendTest.URL, "/estoque");
		deleteList();
	}

	@Test
	public void test() {
		Estoque estoque;
		estoque = new Estoque();
		estoque.setNome("Ponta Porã");
		estoque.setEmpresa("Czech");
		estoque.setEmpreedimento("Construção Civil");
		estoque.setLocalizacao("Ponta Porã, Paraná");
		Result result = post(estoque);
		String key = (String) result.get("key");
		estoque = get("key=" + key);
		assertEquals("Ponta Porã",estoque.getNome());
		assertEquals("Czech",estoque.getEmpresa());
		assertEquals("Construção Civil",estoque.getEmpreedimento());
		assertEquals("Ponta Porã, Paraná",estoque.getLocalizacao());
	}
	
	@AfterEach
	public void tearDown() {
		stop();
	}
}