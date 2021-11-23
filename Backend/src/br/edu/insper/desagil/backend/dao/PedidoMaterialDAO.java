package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.PedidoMaterial;
import br.edu.insper.desagil.backend.database.firestore.FirestoreDAO;

public class PedidoMaterialDAO extends FirestoreDAO<PedidoMaterial> {
	public PedidoMaterialDAO() {
		super("materiais");
	}

}
