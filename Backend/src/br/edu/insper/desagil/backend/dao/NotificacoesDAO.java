package br.edu.insper.desagil.backend.dao;

import br.edu.insper.desagil.backend.core.Notificacoes;
import br.edu.insper.desagil.backend.database.firestore.FirestoreDAO;

public class NotificacoesDAO extends FirestoreDAO<Notificacoes>{
	public NotificacoesDAO() {
		super("notificacoes");
		}
	}

