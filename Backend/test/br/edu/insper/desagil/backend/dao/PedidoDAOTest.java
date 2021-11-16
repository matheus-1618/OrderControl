package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.Pedido;
import br.edu.insper.desagil.backend.core.Urgencia;
import br.edu.insper.desagil.backend.database.firestore.Firestore;

public class PedidoDAOTest {
	private static String name;
	private PedidoDAO dao;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new PedidoDAO();
		dao.deleteAll();
	}

	@Test
	void test() {
		Pedido pedido;
		Urgencia urgencia;
		
		pedido = new Pedido();
		urgencia = Urgencia.ALTA;
		
		pedido.setUrgencia(urgencia);
		dao.create(pedido);
		String key = pedido.getKey();
		pedido = dao.retrieve(key);
		assertEquals(Urgencia.ALTA, pedido.getUrgencia());
	}
	
	@Test
	void testString() {
		Pedido pedido;
		String string = new String("Trazer cimento em caminhão Volvo");
		pedido = new Pedido();
	
		pedido.setObservacoes(string);
		dao.create(pedido);
		String key = pedido.getKey();
		pedido = dao.retrieve(key);
		assertEquals("Trazer cimento em caminhão Volvo", pedido.getObservacoes());
	}

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}