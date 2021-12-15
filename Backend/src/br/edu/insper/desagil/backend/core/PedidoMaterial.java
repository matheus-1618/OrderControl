package br.edu.insper.desagil.backend.core;

import java.util.List;
import java.util.Map;

import br.edu.insper.desagil.backend.database.firestore.FirestoreObject;

public class PedidoMaterial extends FirestoreObject {
	private static int idCount = 0;
	private String id;
	private boolean urgencia;
	private String observacoes;
	private Map<String,Integer> materiais;
	private String nomeMaterial;
	private String codigoMaterial;
	private String codigoNCM;
	private String codigoERP;
	private String descricao;
	private List<String> chavesEstoques;
	private String data;

	public PedidoMaterial () {
		this.id = Integer.toString(idCount);
		idCount ++;
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

	public String getNomeMaterial() {
		return nomeMaterial;
	}

	public void setNomeMaterial(String nomeMaterial) {
		this.nomeMaterial = nomeMaterial;
	}

	public String getCodigoMaterial() {
		return codigoMaterial;
	}

	public void setCodigoMaterial(String codigoMaterial) {
		this.codigoMaterial = codigoMaterial;
	}

	public String getCodigoNCM() {
		return codigoNCM;
	}

	public void setCodigoNCM(String codigoNCM) {
		this.codigoNCM = codigoNCM;
	}

	public String getCodigoERP() {
		return codigoERP;
	}

	public void setCodigoERP(String codigoERP) {
		this.codigoERP = codigoERP;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}
	
}
