package br.edu.insper.desagil.backend.endpoint;

import static org.junit.Assert.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.BackendTest;
import br.edu.insper.desagil.backend.core.PedidoMaterial;
import br.edu.insper.desagil.backend.httpserver.EndpointTest;

class PedidoMaterialEndpointTest extends EndpointTest<PedidoMaterial> {
	@BeforeEach
	public void setUp() {
		start(BackendTest.URL, "/material");
		deleteList();
	}

	@Test
	public void test() {
		PedidoMaterial pedido;
		Map<String,Integer> materiais;
		List<String> estoques;
		pedido = new PedidoMaterial();
		materiais = new HashMap<String,Integer>();
		estoques = new ArrayList<String>();
		materiais.put("Cimento", 1);
		materiais.put("Argamassa", 2);
		materiais.put("Outros", 2);
		
		estoques.add("hxYsajk131as");
		
		pedido.setMateriais(materiais);
		pedido.setUrgencia(false);
		pedido.setObservacoes("Trazer pedido por trás da entrada");
		pedido.setNomeMaterial("Madeira");
		pedido.setCodigoMaterial("32456");
		pedido.setCodigoERP("123456");
		pedido.setCodigoNCM("hxay241A");
		pedido.setData("13/08/2019 13:34");
		
		pedido.setChavesEstoques(estoques);
		post(pedido);
		pedido = get("id=" + pedido.getId());
		assertEquals(1,pedido.getMateriais().get("Cimento"));
		assertEquals(2,pedido.getMateriais().get("Argamassa"));
		assertEquals(2,pedido.getMateriais().get("Outros"));
		assertFalse(pedido.getUrgencia());
		assertEquals("Trazer pedido por trás da entrada",pedido.getObservacoes());
		assertEquals("Madeira",pedido.getNomeMaterial());
		assertEquals("32456",pedido.getCodigoMaterial());
		assertEquals("123456",pedido.getCodigoERP());
		assertEquals("hxay241A",pedido.getCodigoNCM());
		assertEquals("hxYsajk131as",pedido.getChavesEstoques().get(0));
		assertEquals("13/08/2019 13:34",pedido.getData());
	}
	
	@AfterEach
	public void tearDown() {
		stop();
	}
}