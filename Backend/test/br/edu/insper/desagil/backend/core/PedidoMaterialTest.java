package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PedidoMaterialTest {
	private PedidoMaterial pedido;
	private Map<String,Integer> materiais;
	private List<String> estoques;

	@BeforeEach
	void setUp() {
		pedido = new PedidoMaterial();
		materiais = new HashMap<String,Integer>();
		estoques = new ArrayList<String>();
	}

	@Test
	void test() {
		materiais.put("Cimento", 1);
		materiais.put("Areia", 3);
		materiais.put("Outros", 2);
		
		estoques.add("hxYsajk131as");
		
		pedido.setMateriais(materiais);
		pedido.setUrgencia(false);
		pedido.setObservacoes("Trazer pedido por trás da entrada");
		pedido.setNomeMaterial("Madeira");
		pedido.setCodigoMaterial("32456");
		pedido.setCodigoERP("123456");
		pedido.setCodigoNCM("hxay241A");
		pedido.setChavesEstoques(estoques);
		
		assertEquals(1,pedido.getMateriais().get("Cimento"));
		assertEquals(3,pedido.getMateriais().get("Areia"));
		assertEquals(2,pedido.getMateriais().get("Outros"));
		assertFalse(pedido.getUrgencia());
		assertEquals("Trazer pedido por trás da entrada",pedido.getObservacoes());
		assertEquals("Madeira",pedido.getNomeMaterial());
		assertEquals("32456",pedido.getCodigoMaterial());
		assertEquals("123456",pedido.getCodigoERP());
		assertEquals("hxay241A",pedido.getCodigoNCM());
		assertEquals("hxYsajk131as",pedido.getChavesEstoques().get(0));
		
	}

}
