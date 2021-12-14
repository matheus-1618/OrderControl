package br.edu.insper.desagil.backend.endpoint;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.BackendTest;
import br.edu.insper.desagil.backend.core.PedidoFerramenta;
import br.edu.insper.desagil.backend.httpserver.EndpointTest;

class PedidoFerramentaEndpointTest extends EndpointTest<PedidoFerramenta> {
	@BeforeEach
	public void setUp() {
		start(BackendTest.URL, "/ferramenta");
		deleteList();
	}

	@Test
	public void test() {
		PedidoFerramenta pedido;
		Map<String,Integer> ferramentas;
		List<String> estoques;
		pedido = new PedidoFerramenta();
		ferramentas = new HashMap<String,Integer>();
		estoques = new ArrayList<String>();
		ferramentas.put("Betoneira", 1);
		ferramentas.put("Furadeira", 2);
		ferramentas.put("Outros", 2);
		
		estoques.add("hxYsajk131as");
		
		pedido.setFerramentas(ferramentas);
		pedido.setUrgencia(true);
		pedido.setObservacoes("Trazer pedido por trás da entrada");
		pedido.setNomeFerramenta("Martelo");
		pedido.setCodigoFerramenta("32456");
		pedido.setCodigoERP("123456");
		pedido.setCodigoNCM("hxay241A");
		pedido.setChavesEstoques(estoques);
		
		post(pedido);
		pedido = get("id=" + pedido.getId());
		assertEquals(1,pedido.getFerramentas().get("Betoneira"));
		assertEquals(2,pedido.getFerramentas().get("Furadeira"));
		assertEquals(2,pedido.getFerramentas().get("Outros"));
		assertTrue(pedido.getUrgencia());
		assertEquals("Trazer pedido por trás da entrada",pedido.getObservacoes());
		assertEquals("Martelo",pedido.getNomeFerramenta());
		assertEquals("32456",pedido.getCodigoFerramenta());
		assertEquals("123456",pedido.getCodigoERP());
		assertEquals("hxay241A",pedido.getCodigoNCM());
		assertEquals("hxYsajk131as",pedido.getChavesEstoques().get(0));
	}
	
	@AfterEach
	public void tearDown() {
		stop();
	}
}