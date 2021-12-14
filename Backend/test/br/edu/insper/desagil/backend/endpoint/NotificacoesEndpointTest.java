package br.edu.insper.desagil.backend.endpoint;

import static org.junit.jupiter.api.Assertions.assertEquals;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.BackendTest;
import br.edu.insper.desagil.backend.core.Notificacoes;
import br.edu.insper.desagil.backend.httpserver.EndpointTest;
import br.edu.insper.desagil.backend.httpserver.Result;

class NotificacoesEndpointTest extends EndpointTest<Notificacoes> {
	@BeforeEach
	public void setUp() {
		start(BackendTest.URL, "/notificacoes");
		deleteList();
	}

	@Test
	public void test() {
		Notificacoes notificacoes;
		notificacoes = new Notificacoes();
		notificacoes.setData("15/12/2021");
		notificacoes.setHora("15:37");
		notificacoes.setNotificacao("Pedido #38 foi excluído!");
		notificacoes.setTipo("Ferramenta");
		Result result = post(notificacoes);
		String key = (String) result.get("key");
		notificacoes = get("key=" + key);
		assertEquals("15/12/2021",notificacoes.getData());
		assertEquals("15:37",notificacoes.getHora());
		assertEquals("Pedido #38 foi excluído!",notificacoes.getNotificacao());
		assertEquals("Ferramenta",notificacoes.getTipo());
	}
	
	@AfterEach
	public void tearDown() {
		stop();
	}
}