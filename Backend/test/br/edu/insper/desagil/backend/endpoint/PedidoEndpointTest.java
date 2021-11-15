package br.edu.insper.desagil.backend.endpoint;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.BackendTest;
import br.edu.insper.desagil.backend.core.Pedido;
import br.edu.insper.desagil.backend.core.Urgencia;
import br.edu.insper.desagil.backend.httpserver.EndpointTest;
import br.edu.insper.desagil.backend.httpserver.Result;

class GatoEndpointTest extends EndpointTest<Pedido> {
	@BeforeEach
	public void setUp() {
		start(BackendTest.URL, "/pedido");
		deleteList();
	}

	@Test
	public void test() {
		Pedido pedido;
		Urgencia urgencia;
		
		pedido = new Pedido();
		urgencia = Urgencia.MEDIA;
		
		pedido.setUrgencia(urgencia);
		
		Result result = post(pedido);
		String key = (String) result.get("key");
		pedido = get("key=" + key);
		assertEquals(Urgencia.MEDIA, pedido.getUrgencia());
	}

	@AfterEach
	public void tearDown() {
		stop();
	}
}