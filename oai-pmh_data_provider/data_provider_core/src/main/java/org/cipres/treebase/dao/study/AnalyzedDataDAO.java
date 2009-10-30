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

package org.cipres.treebase.dao.study;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.hibernate.Query;

import org.cipres.treebase.dao.AbstractDAO;
import org.cipres.treebase.domain.matrix.Matrix;
import org.cipres.treebase.domain.study.AnalyzedData;
import org.cipres.treebase.domain.study.AnalyzedDataHome;
import org.cipres.treebase.domain.tree.PhyloTree;

/**
 * AnalyzedDataDAO.java
 * 
 * Created on May 26, 2006
 * 
 * @author Jin Ruan
 * 
 */
public class AnalyzedDataDAO extends AbstractDAO implements AnalyzedDataHome {

	/**
	 * Constructor.
	 */
	public AnalyzedDataDAO() {
		super();
	}

	/**
	 * 
	 * @see org.cipres.treebase.domain.study.AnalyzedDataHome#findByMatrix(org.cipres.treebase.domain.matrix.Matrix)
	 */
	public Collection<AnalyzedData> findByMatrix(Matrix pMatrix) {
		Collection<AnalyzedData> returnVal = new ArrayList<AnalyzedData>();

		if (pMatrix != null) {
			Long mID = pMatrix.getId();
			Query q = getSession().createQuery("from AnalyzedMatrix where matrix.id = :mID");

			q.setLong("mID", mID);
			List results = q.list();

			returnVal = results;
		}
		return returnVal;
	}

	/**
	 * 
	 * @see org.cipres.treebase.domain.study.AnalyzedDataHome#findByTree(org.cipres.treebase.domain.tree.PhyloTree)
	 */
	public Collection<AnalyzedData> findByTree(PhyloTree pTree) {
		Collection<AnalyzedData> returnVal = new ArrayList<AnalyzedData>();

		if (pTree != null) {
			Long mID = pTree.getId();
			Query q = getSession().createQuery("from AnalyzedTree where tree.id = :mID");

			q.setLong("mID", mID);
			List results = q.list();

			returnVal = results;
		}
		return returnVal;
	}

}