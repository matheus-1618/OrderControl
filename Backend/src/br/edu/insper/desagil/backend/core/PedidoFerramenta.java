package br.edu.insper.desagil.backend.core;

import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.database.firestore.FirestoreObject;

public class PedidoFerramenta extends FirestoreObject {
	private static int idCount = 0;
	private String id;
	private Urgencia urgencia;
	private String observacoes;
	private Map<String,Integer> ferramentas;
	
	
	public PedidoFerramenta () {
		this.id = Integer.toString(idCount);
		idCount ++;
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
	
	
	
	public Map getFerramentas() {
		return this.ferramentas;
	}
	
	
	public int getQuantidadeFerramenta(String ferramenta) {
		return this.ferramentas.get(ferramenta);
	}

	public void changeQuantidadeFerramenta(String ferramenta,int quantidade) {
		if ((quantidade >= 0) && (this.ferramentas.containsKey(ferramenta))) {
			this.ferramentas.put(ferramenta,quantidade);
		}
	}
	
}
