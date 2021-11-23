package br.edu.insper.desagil.backend.endpoint;

import java.util.List;

import br.edu.insper.desagil.backend.core.PedidoMaterial;
import br.edu.insper.desagil.backend.dao.PedidoMaterialDAO;
import br.edu.insper.desagil.backend.httpserver.Args;
import br.edu.insper.desagil.backend.httpserver.Endpoint;
import br.edu.insper.desagil.backend.httpserver.Result;

public class PedidoMaterialEndpoint extends Endpoint<PedidoMaterial> {
	private PedidoMaterialDAO dao;
	
	public PedidoMaterialEndpoint() {
		super("/material");
		dao = new PedidoMaterialDAO();
	}
	
	@Override
	public PedidoMaterial get(Args args) {
		String key = args.get("id");
		return dao.retrieve(key);
	}

	@Override
	public List<PedidoMaterial> getList(Args args) {
		return dao.retrieveAll();
	}

	@Override
	public Result post(Args args, PedidoMaterial material) {
		dao.create(material);
		return new Result();
	}

	@Override
	public Result put(Args args, PedidoMaterial material) {
		dao.update(material);
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
