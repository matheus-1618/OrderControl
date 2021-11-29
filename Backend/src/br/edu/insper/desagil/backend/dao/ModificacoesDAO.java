package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.Modificacoes;
import br.edu.insper.desagil.backend.database.firestore.FirestoreDAO;

public class ModificacoesDAO extends FirestoreDAO<Modificacoes>{
	public ModificacoesDAO() {
		super("modificacoes");
		}
	}

