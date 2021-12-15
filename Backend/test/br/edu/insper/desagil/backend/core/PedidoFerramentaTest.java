package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PedidoFerramentaTest {
	private PedidoFerramenta pedido;
	private Map<String,Integer> ferramentas;
	private List<String> estoques;

	@BeforeEach
	void setUp() {
		pedido = new PedidoFerramenta();
		ferramentas = new HashMap<String,Integer>();
		estoques = new ArrayList<String>();
	}

	@Test
	void test() {
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
		pedido.setData("13/08/2019 13:34");
		
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
		assertEquals("13/08/2019 13:34",pedido.getData());
		
	}

}
