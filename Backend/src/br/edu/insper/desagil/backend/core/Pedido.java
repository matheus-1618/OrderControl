package br.edu.insper.desagil.backend.core;

import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.database.firestore.FirestoreObject;

public class Pedido extends FirestoreObject {
	private static int idCount = 0;
	private String id;
	private Urgencia urgencia;
	private String observacoes;
	private Map<String,Integer> materiais;
	private Map<String,Integer> ferramentas;
	
	
	public Pedido () {
		this.id = Integer.toString(idCount);
		idCount ++;
		this.materiais = new HashMap<String,Integer>() {{
			put("areia",0);
			put("brita",0);
			put("cal",0);
			put("madeira",0);
			put("cimento",0);
			put("outros",0);
		}};
		this.ferramentas = new HashMap<String,Integer>(){{
			put("andaime",0);
			put("betoneira",0);
			put("bomba",0);
			put("esmerilhadeira",0);
			put("furadeira",0);
			put("outros",0);
		}};
	}
	
	@Override
	public String key() {
		return this.id;
	}
	
	public String getId() {
		return this.id;
	}
	
	public Urgencia getUrgencia() {
		return urgencia;
	}
	
	public void setUrgencia(Urgencia urgencia) {
		this.urgencia = urgencia;
	}
	
	public String getObservacoes() {
		return observacoes;
	}
	
	
	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
	
	
	public Map getMateriais() {
		return this.materiais;
	}
	
	public Map getFerramentas() {
		return this.ferramentas;
	}
	
	public int getQuantidadeMaterial(String material) {
		return this.materiais.get(material);
	}
	
	public int getQuantidadeFerramenta(String ferramenta) {
		return this.ferramentas.get(ferramenta);
	}
	
	public void changeQuantidadeMaterial(String material,int quantidade) {
		if ((quantidade >= 0) && (this.materiais.containsKey(material))) {
			this.materiais.put(material,quantidade);
		}
	}
	
	public void changeQuantidadeFerramenta(String ferramenta,int quantidade) {
		if ((quantidade >= 0) && (this.ferramentas.containsKey(ferramenta))) {
			this.ferramentas.put(ferramenta,quantidade);
		}
	}
	
}
