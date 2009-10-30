package org.cipres.treebase.dao.matrix;

import org.cipres.treebase.dao.AbstractDAOTest;
import org.cipres.treebase.domain.matrix.MatrixElementHome;

/**
 * The class <code>MatrixElementDAOTest</code> contains tests for the class
 * {@link <code>MatrixElementDAO</code>}
 * 
 * @pattern JUnit Test Case
 * 
 * @generatedBy CodePro at 6/21/06 11:14 AM
 * 
 * @author Jin Ruan
 * 
 * @version $Revision$
 */
public class MatrixElementDAOTest extends AbstractDAOTest {

	private MatrixElementHome fixture;

	/**
	 * Return the object that is being tested.
	 * 
	 * @return the test fixture
	 * 
	 * @see org.cipres.treebase.dao.matrix.MatrixElementDAO
	 */
	public MatrixElementHome getFixture() {
		return fixture;
	}

	/**
	 * Set the object that is being tested.
	 * 
	 * @param fixture the test fixture
	 */
	public void setFixture(MatrixElementHome fixture) {
		this.fixture = fixture;
	}

	public static void main(String[] args) {
		MatrixElementDAOTest test = new MatrixElementDAOTest();
		test.testFindColumnByIndices();

		System.exit(0);
	}

	/**
	 * 
	 */
	public void testFindColumnByIndices() {
	// TODO: findColumnByIndices

	}

}

/*
 * $CPS$ This comment was generated by CodePro. Do not edit it. patternId =
 * com.instantiations.assist.eclipse.pattern.testCasePattern strategyId =
 * com.instantiations.assist.eclipse.pattern.testCasePattern.junitTestCase additionalTestNames =
 * assertTrue = false callTestMethod = true createMain = false createSetUp = false createTearDown =
 * false createTestFixture = true createTestStubs = true methods = package =
 * org.cipres.treebase.dao.matrix package.sourceFolder = treebase-core/src/test/java superclassType =
 * junit.framework.TestCase testCase = MatrixElementDAOTest testClassType =
 * org.cipres.treebase.dao.matrix.MatrixElementDAO
 */