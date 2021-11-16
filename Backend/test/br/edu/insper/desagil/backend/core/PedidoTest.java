package br.edu.insper.desagil.backend.core;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class PedidoTest {

	private Pedido pedido;
	private Cimento cimento;
	private MarcaCimento marca;

	@BeforeEach
	public void setUp() {
		pedido = new Pedido();
		marca =  MarcaCimento.CIPLAN;
		cimento = new Cimento(3,marca);
		pedido.setObservacoes("Trazer cimento em caminhão Volvo");
		
	}

	@Test
	public void test() {
		String string = new String("Trazer cimento em caminhão Volvo");
		pedido.setCimento(cimento);
		pedido.setObservacoes(string);
		assertEquals(3,pedido.getCimento().getQuantidade());
		assertEquals("Trazer cimento em caminhão Volvo",pedido.getObservacoes());
	}

}
