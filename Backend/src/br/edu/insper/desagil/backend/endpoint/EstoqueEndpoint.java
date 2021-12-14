package br.edu.insper.desagil.backend.endpoint;

import java.util.List;

import br.edu.insper.desagil.backend.core.Estoque;
import br.edu.insper.desagil.backend.dao.EstoqueDAO;
import br.edu.insper.desagil.backend.httpserver.Args;
import br.edu.insper.desagil.backend.httpserver.Endpoint;
import br.edu.insper.desagil.backend.httpserver.Result;

public class EstoqueEndpoint extends Endpoint<Estoque> {
	private EstoqueDAO dao;

	public EstoqueEndpoint() {
		super("/estoque");
		dao = new EstoqueDAO();
	}

	@Override
	public Estoque get(Args args) {
		String key = args.get("key");
		return dao.retrieve(key);
	}

	@Override
	public List<Estoque> getList(Args args) {
		if (args.containsKey("keys")) {
			List<String> keys = args.getList("keys", ",");
			if (args.containsKey("other") && args.getBoolean("other")) {
				return dao.retrieveExcept(keys);
			} else {
				return dao.retrieve(keys);
			}
		}
		return dao.retrieveAll("nome");
	}

	@Override
	public Result post(Args args, Estoque estoque) {
		dao.create(estoque);
		Result result = new Result();
		result.put("key", estoque.getKey());
		return result;
	}

	@Override
	public Result put(Args args, Estoque estoque) {
		dao.update(estoque);
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