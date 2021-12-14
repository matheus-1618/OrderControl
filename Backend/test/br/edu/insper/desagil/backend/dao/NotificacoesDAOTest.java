package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.Notificacoes;
import br.edu.insper.desagil.backend.database.firestore.Firestore;

public class NotificacoesDAOTest {
	private static String name;
	private NotificacoesDAO dao;
	private Notificacoes notificacoes;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new NotificacoesDAO();
		dao.deleteAll();
		notificacoes = new Notificacoes();
	}

	@Test
	void test() {
		notificacoes.setData("15/12/2021");
		notificacoes.setHora("15:37");
		notificacoes.setNotificacao("Pedido #38 foi alterado!");
		notificacoes.setTipo("Material");
		dao.create(notificacoes);
		String key = notificacoes.getKey();
		notificacoes = dao.retrieve(key);
		assertEquals("15/12/2021",notificacoes.getData());
		assertEquals("15:37",notificacoes.getHora());
		assertEquals("Pedido #38 foi alterado!",notificacoes.getNotificacao());
		assertEquals("Material",notificacoes.getTipo());
	}

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}