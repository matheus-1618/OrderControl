package br.edu.insper.desagil.backend.endpoint;

import java.util.List;


import br.edu.insper.desagil.backend.core.Notificacoes;
import br.edu.insper.desagil.backend.dao.NotificacoesDAO;
import br.edu.insper.desagil.backend.httpserver.Args;
import br.edu.insper.desagil.backend.httpserver.Endpoint;
import br.edu.insper.desagil.backend.httpserver.Result;

public class NotificacoesEndpoint extends Endpoint<Notificacoes> {
	private NotificacoesDAO dao;

	public NotificacoesEndpoint() {
		super("/notificacoes");
		dao = new NotificacoesDAO();
	}

	@Override
	public Notificacoes get(Args args) {
		String key = args.get("key");
		return dao.retrieve(key);
	}

	@Override
	public List<Notificacoes> getList(Args args) {
		return dao.retrieveAll("hora");
	}

	@Override
	public Result post(Args args, Notificacoes notificacoes) {
		dao.create(notificacoes);
		Result result = new Result();
		result.put("key", notificacoes.getKey());
		return result;
	}

	@Override
	public Result put(Args args, Notificacoes notificacoes) {
		dao.update(notificacoes);
		return new Result();
	}

	@Override
	public Result delete(Args args) {
		String key = args.get("key");
		dao.delete(key);
		return new Result();
	}

	@Override
	public Result deleteList(Args args) {
		dao.deleteAll();
		return new Result();
	}
}