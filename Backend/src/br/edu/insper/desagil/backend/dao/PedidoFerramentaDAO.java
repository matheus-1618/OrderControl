package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.PedidoFerramenta;
import br.edu.insper.desagil.backend.database.firestore.FirestoreDAO;

public class PedidoFerramentaDAO extends FirestoreDAO<PedidoFerramenta> {
	public PedidoFerramentaDAO() {
		super("ferramentas");
	}

}
