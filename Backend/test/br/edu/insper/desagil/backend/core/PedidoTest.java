package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class PedidoTest {
	private Pedido pedido;

	@BeforeEach
	public void setUp() {
		pedido = new Pedido();
		pedido.setObservacoes("Trazer cimento em caminhão Volvo");
	}

	@Test
	public void observacoesTest() {
		String string = new String("Trazer cimento em caminhão Volvo");
		pedido.setObservacoes(string);
		assertEquals("Trazer cimento em caminhão Volvo",pedido.getObservacoes());
	}
	
	@Test
	public void setQntdMaterial() {
		pedido.changeQuantidadeMaterial("cimento", 3);
		pedido.changeQuantidadeMaterial("madeira", 1);
		assertEquals(3,pedido.getQuantidadeMaterial("cimento"));
		assertEquals(1,pedido.getQuantidadeMaterial("madeira"));
	}
	
	@Test
	public void setQntdFerramenta() {
		pedido.changeQuantidadeFerramenta("furadeira", 3);
		pedido.changeQuantidadeFerramenta("andaime", 3);
		assertEquals(3,pedido.getQuantidadeFerramenta("furadeira"));
		assertEquals(3,pedido.getQuantidadeFerramenta("andaime"));
	}
	

}
