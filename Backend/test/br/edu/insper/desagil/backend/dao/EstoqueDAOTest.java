package br.edu.insper.desagil.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;



import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import br.edu.insper.desagil.backend.Backend;
import br.edu.insper.desagil.backend.core.Estoque;
import br.edu.insper.desagil.backend.database.firestore.Firestore;

public class EstoqueDAOTest {
	private static String name;
	private EstoqueDAO dao;
	private Estoque estoque;

	@BeforeAll
	public static void setUpClass() {
		name = Firestore.start(Backend.CREDENTIALS_TEST);
	}

	@BeforeEach
	void setUp() {
		dao = new EstoqueDAO();
		dao.deleteAll();
		estoque = new Estoque();
	}

	@Test
	void test() {
		estoque.setNome("Cajazeiras");
		estoque.setEmpresa("Matcia");
		estoque.setEmpreedimento("Construção Civil");
		estoque.setLocalizacao("Cajazeiras, Bahia");
		dao.create(estoque);
		String key = estoque.getKey();
		estoque = dao.retrieve(key);
		assertEquals("Cajazeiras",estoque.getNome());
		assertEquals("Matcia",estoque.getEmpresa());
		assertEquals("Construção Civil",estoque.getEmpreedimento());
		assertEquals("Cajazeiras, Bahia",estoque.getLocalizacao());
	}
	

	@AfterAll
	public static void tearDownClass() {
		Firestore.stop(name);
	}
}