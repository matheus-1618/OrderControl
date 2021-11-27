package br.edu.insper.desagil.backend.core;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import br.edu.insper.desagil.backend.database.firestore.FirestoreObject;

public class PedidoMaterial extends FirestoreObject {
	private static int idCount = 0;
	private String id;
	private boolean urgencia;
	private String observacoes;
	private Map<String,Integer> materiais;
	private List<String> chavesEstoques;
	
	
	public PedidoMaterial () {
		this.id = Integer.toString(idCount);
		idCount ++;
		this.materiais = new HashMap<String,Integer>() {{
			put("areia",0);
			put("brita",0);
			put("cal",0);
			put("argamassa",0);
			put("cimento",0);
			put("outros",0);
		}};
	}
	
	@Override
	public String key() {
		return this.id;
	}
	

	public static int getIdCount() {
		return idCount;
	}

	public static void setIdCount(int idCount) {
		PedidoMaterial.idCount = idCount;
	}

	public List<String> getChavesEstoques() {
		return chavesEstoques;
	}

	public void setChavesEstoques(List<String> chavesEstoques) {
		this.chavesEstoques = chavesEstoques;
	}
	
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getId() {
		return this.id;
	}
	
	public boolean getUrgencia() {
		return urgencia;
	}
	
	public void setUrgencia(boolean urgencia) {
		this.urgencia = urgencia;
	}
	
	public String getObservacoes() {
		return observacoes;
	}
	
	
	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
	
	public void setMateriais(Map<String, Integer> materiais) {
		this.materiais = materiais;
	}
	
	public Map getMateriais() {
		return this.materiais;
	}
	
	
	public int getQuantidadeMaterial(String material) {
		return this.materiais.get(material);
	}
	
	
	public void changeQuantidadeMaterial(String material,int quantidade) {
		if ((quantidade >= 0) && (this.materiais.containsKey(material))) {
			this.materiais.put(material,quantidade);
		}
	}
	
	
}
