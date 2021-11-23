package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.Estoque;

import br.edu.insper.desagil.backend.database.firestore.FirestoreDAO;

public class EstoqueDAO extends FirestoreDAO<Estoque> {
public EstoqueDAO() {
	super("estoques");
	}
}
