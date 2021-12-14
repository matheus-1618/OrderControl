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

class PedidoMaterialEndpointTest extends EndpointTest<Pedido> {
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
		urgencia = Urgencia.BAIXA;
		pedido.setUrgencia(urgencia);
		post(pedido);
		pedido = get("id=" + pedido.getId());
		assertEquals(Urgencia.BAIXA, pedido.getUrgencia());
	}

	@Test
	public void testString() {
		Pedido pedido;
		String string = new String("Trazer cimento em caminhão Volvo");
		pedido = new Pedido();
		pedido.setObservacoes(string);
		post(pedido);
		pedido = get("id=" + pedido.getId());
		assertEquals("Trazer cimento em caminhão Volvo", pedido.getObservacoes());
	}
	
	@Test
	public void testFerramenta() {
		Pedido pedido;
		pedido = new Pedido();
		pedido.changeQuantidadeFerramenta("betoneira",5);
		post(pedido);
		pedido = get("id=" + pedido.getId());
		assertEquals(5, pedido.getQuantidadeFerramenta("betoneira"));
	}
	
	@AfterEach
	public void tearDown() {
		stop();
	}
}