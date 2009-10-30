/*
 * Copyright 2006 CIPRES project. http://www.phylo.org/ All Rights Reserved.
 * 
 * Permission to use, copy, modify, and distribute this software and its documentation for
 * educational, research and non-profit purposes, without fee, and without a written agreement is
 * hereby granted, provided that the above copyright notice, this paragraph and the following two
 * paragraphs appear in all copies.
 * 
 * Permission to incorporate this software into commercial products may be obtained by contacting
 * us: http://www.phylo.org/contactUs.html
 * 
 * The software program and documentation are supplied "as is". In no event shall the CIPRES project
 * be liable to any party for direct, indirect, special, incidental, or consequential damages,
 * including lost profits, arising out of the use of this software and its documentation, even if
 * the CIPRES project has been advised of the possibility of such damage. The CIPRES project
 * specifically disclaims any warranties, including, but not limited to, the implied warranties of
 * merchantability and fitness for a particular purpose. The CIPRES project has no obligations to
 * provide maintenance, support, updates, enhancements, or modifications.
 */

package org.cipres.treebase.dao.matrix;

import org.hibernate.Criteria;

import org.cipres.treebase.dao.AbstractDAO;
import org.cipres.treebase.domain.matrix.MatrixDataType;
import org.cipres.treebase.domain.matrix.MatrixDataTypeHome;

/**
 * MatrixDataTypeDAO.java
 * 
 * Created on Jun 12, 2006
 * 
 * @author Jin Ruan
 * 
 */
public class MatrixDataTypeDAO extends AbstractDAO implements MatrixDataTypeHome {

	/**
	 * Constructor.
	 */
	public MatrixDataTypeDAO() {
		super();
	}

	/**
	 * 
	 * @see org.cipres.treebase.domain.matrix.MatrixDataTypeHome#findByDescription(java.lang.String)
	 */
	public MatrixDataType findByDescription(String pDescription) {
		MatrixDataType returnVal = null;

		Criteria c = getSession().createCriteria(MatrixDataType.class).add(
			org.hibernate.criterion.Expression.eq("description", pDescription));

		returnVal = (MatrixDataType) c.uniqueResult();
		return returnVal;
	}

}