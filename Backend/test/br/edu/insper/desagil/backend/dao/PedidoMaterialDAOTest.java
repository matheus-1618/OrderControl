package br.edu.insper.desagil.backend.dao;

import static org.junit.Assert.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.PedidoMaterial;
import br.edu.insper.desagil.backend.database.firestore.Firestore;

public class PedidoMaterialDAOTest {
	private static String name;
	private PedidoMaterialDAO dao;
	private PedidoMaterial pedido;
	private Map<String,Integer> materiais;
	private List<String> estoques;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new PedidoMaterialDAO();
		dao.deleteAll();
		pedido = new PedidoMaterial();
		materiais = new HashMap<String,Integer>();
		estoques = new ArrayList<String>();
	}

	@Test
	void test() {
		materiais.put("Cimento", 1);
		materiais.put("Areia", 2);
		materiais.put("Outros", 2);
		
		estoques.add("hxYsajk131as");
		
		pedido.setMateriais(materiais);
		pedido.setUrgencia(false);
		pedido.setObservacoes("Trazer pedido por trás da entrada");
		pedido.setNomeMaterial("Gesso");
		pedido.setCodigoMaterial("32456");
		pedido.setCodigoERP("123456");
		pedido.setCodigoNCM("hxay241A");
		pedido.setChavesEstoques(estoques);
		pedido.setData("13/08/2019 13:34");
		
		dao.create(pedido);
		String id = pedido.getId();
		pedido = dao.retrieve(id);
		
		assertEquals(1,pedido.getMateriais().get("Cimento"));
		assertEquals(2,pedido.getMateriais().get("Areia"));
		assertEquals(2,pedido.getMateriais().get("Outros"));
		assertFalse(pedido.getUrgencia());
		assertEquals("Trazer pedido por trás da entrada",pedido.getObservacoes());
		assertEquals("Gesso",pedido.getNomeMaterial());
		assertEquals("32456",pedido.getCodigoMaterial());
		assertEquals("123456",pedido.getCodigoERP());
		assertEquals("hxay241A",pedido.getCodigoNCM());
		assertEquals("hxYsajk131as",pedido.getChavesEstoques().get(0));
		assertEquals("13/08/2019 13:34",pedido.getData());
	}

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}