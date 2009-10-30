/*
 * CIPRES Copyright (c) 2005- 2006, The Regents of the University of California All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met: * Redistributions of source code must retain the
 * above copyright notice, this list of conditions and the following disclaimer. * Redistributions
 * in binary form must reproduce the above copyright notice, this list of conditions and the
 * following disclaimer in the documentation and/or other materials provided with the distribution. *
 * Neither the name of the University of California or the San Diego Supercomputer Center nor the
 * names of its contributors may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY
 * WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package org.cipres.treebase.domain.matrix;

import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import org.cipres.treebase.domain.AbstractPersistedObject;
import org.cipres.treebase.domain.taxon.TaxonLabel;

/**
 * DistanceMatrixElement.java
 * 
 * Created on Mar 21, 2006
 * 
 * @author Jin Ruan
 * 
 */
@Entity
@Table(name = "DistanceMatrixElement")
@AttributeOverride(name = "id", column = @Column(name = "DistanceMatrixElement_ID"))
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE, region = "matrixCache")
public class DistanceMatrixElement extends AbstractPersistedObject {

	private static final long serialVersionUID = 1918964095607788877L;

	private Double mDistance;

	private TaxonLabel mRowLabel;
	private TaxonLabel mColumnLabel;
	private DistanceMatrix mMatrix;

	/**
	 * Constructor.
	 */
	public DistanceMatrixElement() {
		super();
	}

	/**
	 * Return the Distance field.
	 * 
	 * @return Double
	 */
	@Column(name = "DISTANCE", nullable = true)
	public Double getDistance() {
		return mDistance;
	}

	/**
	 * Set the Distance field.
	 */
	public void setDistance(Double pNewDistance) {
		mDistance = pNewDistance;
	}

	/**
	 * Return the ColumnLabel field.
	 * 
	 * @return TaxonLabel
	 */
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name = "COLUMNLABEL_ID", nullable = true)
	public TaxonLabel getColumnLabel() {
		return mColumnLabel;
	}

	/**
	 * Set the ColumnLabel field.
	 */
	public void setColumnLabel(TaxonLabel pNewColumnLabel) {
		mColumnLabel = pNewColumnLabel;
	}

	/**
	 * Return the RowLabel field.
	 * 
	 * @return TaxonLabel
	 */
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name = "ROWLABEL_ID", nullable = false)
	public TaxonLabel getRowLabel() {
		return mRowLabel;
	}

	/**
	 * Set the RowLabel field.
	 */
	public void setRowLabel(TaxonLabel pNewRowLabel) {
		mRowLabel = pNewRowLabel;
	}

	/**
	 * Return the Matrix field.
	 * 
	 * @return DistanceMatrix mMatrix
	 */
	@ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name = "MATRIX_ID", nullable = false)
	public DistanceMatrix getMatrix() {
		return mMatrix;
	}

	/**
	 * Set the Matrix field.
	 */
	public void setMatrix(DistanceMatrix pNewMatrix) {
		mMatrix = pNewMatrix;
	}

}