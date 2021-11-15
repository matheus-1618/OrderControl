package br.edu.insper.desagil.backend.endpoint;

import java.util.List;

import br.edu.insper.desagil.backend.core.Pedido;
import br.edu.insper.desagil.backend.dao.PedidoDAO;
import br.edu.insper.desagil.backend.httpserver.Args;
import br.edu.insper.desagil.backend.httpserver.Endpoint;
import br.edu.insper.desagil.backend.httpserver.Result;

public class PedidoEndpoint extends Endpoint<Pedido> {
	private PedidoDAO dao;
	
	public PedidoEndpoint() {
		super("/pedido");
		dao = new PedidoDAO();
	}
	
	@Override
	public Pedido get(Args args) {
		String key = args.get("key");
		return dao.retrieve(key);
	}

	@Override
	public List<Pedido> getList(Args args) {
		return dao.retrieveAll();
	}

	@Override
	public Result post(Args args, Pedido pedido) {
		dao.create(pedido);
		Result result = new Result();
		result.put("key", pedido.getKey());
		return result;
	}

	@Override
	public Result put(Args args, Pedido pedido) {
		dao.update(pedido);
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
