package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.PedidoFerramenta;
import br.edu.insper.desagil.backend.database.firestore.Firestore;

public class PedidoFerramentaDAOTest {
	private static String name;
	private PedidoFerramentaDAO dao;
	private PedidoFerramenta pedido;
	private Map<String,Integer> ferramentas;
	private List<String> estoques;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new PedidoFerramentaDAO();
		dao.deleteAll();
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
		
		dao.create(pedido);
		String id = pedido.getId();
		pedido = dao.retrieve(id);
		
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

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}