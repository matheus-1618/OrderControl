package br.edu.insper.desagil.backend.endpoint;

import java.util.List;

import br.edu.insper.desagil.backend.core.Modificacoes;
import br.edu.insper.desagil.backend.dao.ModificacoesDAO;
import br.edu.insper.desagil.backend.httpserver.Args;
import br.edu.insper.desagil.backend.httpserver.Endpoint;
import br.edu.insper.desagil.backend.httpserver.Result;

public class ModificacoesEndpoint extends Endpoint<Modificacoes> {
	private ModificacoesDAO dao;

	public ModificacoesEndpoint() {
		super("/modificacoes");
		dao = new ModificacoesDAO();
	}

	@Override
	public Modificacoes get(Args args) {
		String key = args.get("key");
		return dao.retrieve(key);
	}

	@Override
	public List<Modificacoes> getList(Args args) {
		return dao.retrieveAll("hora");
	}

	@Override
	public Result post(Args args, Modificacoes modificacoes) {
		dao.create(modificacoes);
		Result result = new Result();
		result.put("key", modificacoes.getKey());
		return result;
	}

	@Override
	public Result put(Args args, Modificacoes modificacoes) {
		dao.update(modificacoes);
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