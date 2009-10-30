package org.treebase.oai.web.controller;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.validation.BindException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractCommandController;
import org.treebase.oai.web.command.OAIPMHCommand;

public class OAIPMHController extends AbstractCommandController{

	 public OAIPMHController(){
		  setCommandClass(OAIPMHCommand.class);
		 }
	
	@Override
	protected ModelAndView handle(HttpServletRequest request,
			HttpServletResponse response, Object command, BindException errors)
			throws Exception {
		// TODO Auto-generated method stub
		
		 OAIPMHCommand params = (OAIPMHCommand) command;
		 Method method=null;
		 try{
			 method=this.getClass().getMethod(params.getVerb(), new Class[]{HttpServletRequest.class, HttpServletResponse.class, OAIPMHCommand.class});
		 }catch(NoSuchMethodException e){
			 return new ModelAndView("bad verb: "+ params.getVerb());
		 }
		 
		 return (ModelAndView) method.invoke(this, request, response, params);
	}

}