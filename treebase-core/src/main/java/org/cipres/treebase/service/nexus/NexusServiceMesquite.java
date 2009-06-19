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

package org.cipres.treebase.service.nexus;

import java.io.File;
import java.util.Collection;

import org.apache.log4j.Logger;

import org.cipres.treebase.domain.DomainHome;
import org.cipres.treebase.domain.matrix.ItemDefinitionHome;
import org.cipres.treebase.domain.matrix.MatrixDataTypeHome;
import org.cipres.treebase.domain.nexus.NexusDataSet;
import org.cipres.treebase.domain.nexus.NexusService;
import org.cipres.treebase.domain.nexus.mesquite.MesquiteConverter;
import org.cipres.treebase.domain.study.Study;
import org.cipres.treebase.domain.taxon.TaxonLabelHome;
import org.cipres.treebase.event.ProgressionListener;
import org.cipres.treebase.service.AbstractServiceImpl;

/**
 * NexusServiceMesquite.java
 * 
 * Created on Apr 21, 2006
 * 
 * @author Jin Ruan
 * 
 */
public class NexusServiceMesquite extends AbstractServiceImpl implements NexusService {
	private static final Logger LOGGER = Logger.getLogger(NexusServiceMesquite.class);
	private static final String MESQUITE_FOLDER_DIR_KEY = "mesquite.folder_dir";

	private TaxonLabelHome mTaxonLabelHome;
	private MatrixDataTypeHome mMatrixDataTypeHome;
	private ItemDefinitionHome mItemDefinitionHome;

	/**
	 * Constructor.
	 */
	public NexusServiceMesquite() {
		super();
	}

	/**
	 * Return the TaxonLabelHome field.
	 * 
	 * @return TaxonLabelHome mTaxonLabelHome
	 */
	private TaxonLabelHome getTaxonLabelHome() {
		return mTaxonLabelHome;
	}

	/**
	 * Set the TaxonLabelHome field.
	 */
	public void setTaxonLabelHome(TaxonLabelHome pNewTaxonLabelHome) {
		mTaxonLabelHome = pNewTaxonLabelHome;
	}

	/**
	 * Return the MatrixDataTypeHome field.
	 * 
	 * @return MatrixDataTypeHome mMatrixDataTypeHome
	 */
	private MatrixDataTypeHome getMatrixDataTypeHome() {
		return mMatrixDataTypeHome;
	}

	/**
	 * Set the MatrixDataTypeHome field.
	 */
	public void setMatrixDataTypeHome(MatrixDataTypeHome pNewMatrixDataTypeHome) {
		mMatrixDataTypeHome = pNewMatrixDataTypeHome;
	}

	/**
	 * Return the ItemDefinitionHome field.
	 * 
	 * @return ItemDefinitionHome mItemDefinitionHome
	 */
	private ItemDefinitionHome getItemDefinitionHome() {
		return mItemDefinitionHome;
	}

	/**
	 * Set the ItemDefinitionHome field.
	 */
	public void setItemDefinitionHome(ItemDefinitionHome pNewItemDefinitionHome) {
		mItemDefinitionHome = pNewItemDefinitionHome;
	}

	/**
	 * 
	 * @see org.cipres.treebase.service.AbstractServiceImpl#getDomainHome()
	 */
	@Override
	protected DomainHome getDomainHome() {
		return null; // do not need persistence service.
	}

	/** 
	 * 
	 * @see org.cipres.treebase.domain.nexus.NexusService#parseNexus(org.cipres.treebase.domain.study.Study, java.io.File)
	 */
	public NexusDataSet parseNexus(Study pStudy, File pNexusFile) {
		if (pStudy == null) {
			if (LOGGER.isInfoEnabled()) {
				LOGGER.info("parseNexus - Study is null"); //$NON-NLS-1$
			}
			return null;
		}

		NexusDataSet data = new NexusDataSet();

		MesquiteConverter converter = new MesquiteConverter();
		converter.setMatrixDataTypeHome(getMatrixDataTypeHome());
		converter.setItemDefinitionHome(getItemDefinitionHome());
		converter.setTaxonLabelHome(getTaxonLabelHome());

		//converter.processLoadFile(pNexusFiles, pStudy, data, pListener);
		converter.parseOneFile(pNexusFile, pStudy, data);

		return data;	
	}
	
	/**
	 * Returns true only if all files exist.
	 * 
	 * @param pNexusFiles
	 * @return
	 */
	private boolean checkFiles(Collection<File> pNexusFiles) {
		if (pNexusFiles == null) {
			return false;
		}

		boolean hasError = false;
		for (File file : pNexusFiles) {
			if (!file.exists()) {
				if (LOGGER.isInfoEnabled()) {
					LOGGER.info(" input file does not exist:" + file.getAbsolutePath()); //$NON-NLS-1$
				}
				hasError = true;
			}
		}

		return !hasError;
	}
	
	/**
	 * 
	 * @see org.cipres.treebase.domain.nexus.NexusService#parseNexus(org.cipres.treebase.domain.study.Study,
	 *      java.util.Collection, org.cipres.treebase.event.ProgressionListener)
	 */
	public NexusDataSet parseNexus(
		Study pStudy,
		Collection<File> pNexusFiles,
		ProgressionListener pListener) {

		if (pStudy == null) {
			if (LOGGER.isInfoEnabled()) {
				LOGGER.info("parseNexus - Study is null"); //$NON-NLS-1$
			}
			return null;
		}

		if (!checkFiles(pNexusFiles)) {
			return null;
		}

		NexusDataSet data = new NexusDataSet();

		MesquiteConverter converter = new MesquiteConverter();
		converter.setMatrixDataTypeHome(getMatrixDataTypeHome());
		converter.setItemDefinitionHome(getItemDefinitionHome());
		converter.setTaxonLabelHome(getTaxonLabelHome());

		converter.processLoadFile(pNexusFiles, pStudy, data, pListener);

		return data;
	}

	/**
	 * Set the mesquite folder dirtory to be used inside mesquite file "MesquiteModule.java".
	 * 
	 * @param pMesquiteFolderDir
	 */
	public void setMesquiteFolderDir(String pMesquiteFolderDir) {
		System.setProperty(MESQUITE_FOLDER_DIR_KEY, pMesquiteFolderDir);
	}

	@Override
	public Class defaultResultClass() {
		return null;
	}

	public String serialize(NexusDataSet nexusDataSet) {
		// TODO Auto-generated method stub
		return null;
	}

	public String serialize(Study study) {
		// TODO Auto-generated method stub
		return null;
	}

}
