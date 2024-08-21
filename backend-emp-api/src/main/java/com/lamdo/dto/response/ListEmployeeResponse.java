package com.lamdo.dto.response;

import java.util.List;

import com.lamdo.entity.Employee;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ListEmployeeResponse extends BaseResponse{
	private List<Employee> listEmp;
}
