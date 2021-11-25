package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PedidoMaterialTest {
	private PedidoMaterial material;
	
	@BeforeEach
	public void setUp() {
		material = new PedidoMaterial();
	}


	@Test
	public void testObservacoes() {
		material.setObservacoes("tijolo");
		assertEquals("tijolo", material.getObservacoes());
	}
	
	@Test
	public void testUrgencia() {
		Urgencia urgencia;
		urgencia = Urgencia.ALTA;
		material.setUrgencia(urgencia);
		assertEquals(Urgencia.ALTA, material.getUrgencia());
	}
	
	@Test
	public void testQntdMaterial() {
		material.changeQuantidadeMaterial("cimento", 3);
		material.changeQuantidadeMaterial("argamassa", 3);
		assertEquals(3,material.getQuantidadeMaterial("cimento"));
		assertEquals(3,material.getQuantidadeMaterial("argamassa"));
	}

}
