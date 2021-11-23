package br.edu.insper.desagil.backend.endpoint;

import java.util.List;

import br.edu.insper.desagil.backend.core.PedidoFerramenta;
import br.edu.insper.desagil.backend.dao.PedidoFerramentaDAO;
import br.edu.insper.desagil.backend.httpserver.Args;
import br.edu.insper.desagil.backend.httpserver.Endpoint;
import br.edu.insper.desagil.backend.httpserver.Result;

public class PedidoFerramentaEndpoint extends Endpoint<PedidoFerramenta> {
	private PedidoFerramentaDAO dao;
	
	public PedidoFerramentaEndpoint() {
		super("/ferramenta");
		dao = new PedidoFerramentaDAO();
	}
	
	@Override
	public PedidoFerramenta get(Args args) {
		String key = args.get("id");
		return dao.retrieve(key);
	}

	@Override
	public List<PedidoFerramenta> getList(Args args) {
		return dao.retrieveAll();
	}

	@Override
	public Result post(Args args, PedidoFerramenta ferramenta) {
		dao.create(ferramenta);
		return new Result();
	}

	@Override
	public Result put(Args args, PedidoFerramenta ferramenta) {
		dao.update(ferramenta);
		return new Result();
	}

	@Override
	public Result delete(Args args) {
		String key = args.get("id");
		dao.delete(key);
		return new Result();
	}

	@Override
	public Result deleteList(Args args) {
		dao.deleteAll();
		return new Result();
	}
}
