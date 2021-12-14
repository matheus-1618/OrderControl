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

public class NotificacoesDAOTest {
	private static String name;
	private PedidoDAO dao;
	private Pedido pedido;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new PedidoDAO();
		dao.deleteAll();
		pedido = new Pedido();
	}

	@Test
	void test() {
		Urgencia urgencia;
		urgencia = Urgencia.ALTA;
		pedido.setUrgencia(urgencia);
		dao.create(pedido);
		pedido = dao.retrieve(pedido.getId());
		assertEquals(Urgencia.ALTA, pedido.getUrgencia());
	}
	
	@Test
	void testString() {
		String string = new String("Trazer cimento em caminhão Volvo");
		pedido.setObservacoes(string);
		dao.create(pedido);
		pedido = dao.retrieve(pedido.getId());
		assertEquals("Trazer cimento em caminhão Volvo", pedido.getObservacoes());
	}
	
	@Test
	void testQntdMAterial() {
		pedido.changeQuantidadeMaterial("madeira", 3);
		pedido.changeQuantidadeMaterial("areia", 5);
		dao.create(pedido);
		pedido = dao.retrieve(pedido.getId());
		assertEquals(3,pedido.getQuantidadeMaterial("madeira"));
		assertEquals(5,pedido.getQuantidadeMaterial("areia"));
	}

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}