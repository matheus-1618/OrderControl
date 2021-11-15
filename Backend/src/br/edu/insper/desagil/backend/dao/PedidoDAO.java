package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.Pedido;
import br.edu.insper.desagil.backend.database.firestore.FirestoreDAO;

public class PedidoDAO extends FirestoreDAO<Pedido> {
	public PedidoDAO() {
		super("pedidos");
	}

}
