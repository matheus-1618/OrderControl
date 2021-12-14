package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;



import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.Modificacoes;
import br.edu.insper.desagil.backend.database.firestore.Firestore;

public class ModificacoesDAOTest {
	private static String name;
	private ModificacoesDAO dao;
	private Modificacoes modificacoes;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new ModificacoesDAO();
		dao.deleteAll();
		modificacoes = new Modificacoes();
	}

	@Test
	void test() {
		modificacoes.setData("15/12/2021");
		modificacoes.setHora("15:37");
		modificacoes.setModificacao("Pedido #38 alterado");
		modificacoes.setTipo("Ferramenta");
		dao.create(modificacoes);
		String key = modificacoes.getKey();
		modificacoes = dao.retrieve(key);
		assertEquals("15/12/2021",modificacoes.getData());
		assertEquals("15:37",modificacoes.getHora());
		assertEquals("Pedido #38 alterado",modificacoes.getModificacao());
		assertEquals("Ferramenta",modificacoes.getTipo());
	}
	

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}