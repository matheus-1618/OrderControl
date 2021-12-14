package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class NotificacoesTest {
private Notificacoes notificacoes;
	
	@BeforeEach
	void setUp() {
		notificacoes = new Notificacoes();
	}

	@Test
	void test() {
		
		notificacoes.setData("14/12/2021");
		notificacoes.setHora("13:30");
		notificacoes.setNotificacao("Estoque Piracicaba foi excluído!");
		notificacoes.setTipo("Estoque");
		
		assertEquals("14/12/2021",notificacoes.getData());
		assertEquals("13:30",notificacoes.getHora());
		assertEquals("Estoque Piracicaba foi excluído!",notificacoes.getNotificacao());
		assertEquals("Estoque",notificacoes.getTipo());
	}

}
