package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PedidoFerramentaTest {
	private PedidoFerramenta ferramenta;
	
	@BeforeEach
	public void setUp() {
		ferramenta = new PedidoFerramenta();
	}


	@Test
	public void testObservacoes() {
		ferramenta.setObservacoes("Martelo");
		assertEquals("Martelo", ferramenta.getObservacoes());
	}
	
	@Test
	public void testUrgencia() {
		Urgencia urgencia;
		urgencia = Urgencia.ALTA;
		ferramenta.setUrgencia(urgencia);
		assertEquals(Urgencia.ALTA, ferramenta.getUrgencia());
	}
	
	@Test
	public void testQntdFerramenta() {
		ferramenta.changeQuantidadeFerramenta("furadeira", 3);
		ferramenta.changeQuantidadeFerramenta("andaime", 3);
		assertEquals(3,ferramenta.getQuantidadeFerramenta("furadeira"));
		assertEquals(3,ferramenta.getQuantidadeFerramenta("andaime"));
	}
}


