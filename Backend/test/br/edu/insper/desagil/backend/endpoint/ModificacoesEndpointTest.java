package br.edu.insper.desagil.backend.endpoint;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.BackendTest;
import br.edu.insper.desagil.backend.core.Modificacoes;
import br.edu.insper.desagil.backend.httpserver.EndpointTest;
import br.edu.insper.desagil.backend.httpserver.Result;

class ModificacoesEndpointTest extends EndpointTest<Modificacoes> {
	@BeforeEach
	public void setUp() {
		start(BackendTest.URL, "/modificacoes");
		deleteList();
	}

	@Test
	public void test() {
		Modificacoes modificacoes;
		modificacoes = new Modificacoes();
		modificacoes.setData("15/12/2021");
		modificacoes.setHora("15:37");
		modificacoes.setModificacao("Pedido #38 alterado");
		modificacoes.setTipo("Ferramenta");
		Result result = post(modificacoes);
		String key = (String) result.get("key");
		modificacoes = get("key=" + key);
		assertEquals("15/12/2021",modificacoes.getData());
		assertEquals("15:37",modificacoes.getHora());
		assertEquals("Pedido #38 alterado",modificacoes.getModificacao());
		assertEquals("Ferramenta",modificacoes.getTipo());
	}

	@AfterEach
	public void tearDown() {
		stop();
	}
}