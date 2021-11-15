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
		
	}

	@Test
	public void test() {
		pedido.setCimento(cimento);
		assertEquals(3,pedido.getCimento().getQuantidade());
	}

}
