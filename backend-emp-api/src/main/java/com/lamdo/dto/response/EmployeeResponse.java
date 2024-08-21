package com.lamdo.dto.response;

import com.lamdo.entity.Employee;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
//@JsonInclude(value = Include.NON_NULL)
//@JsonIgnoreProperties(ignoreUnknown = true)
public class EmployeeResponse extends BaseResponse{
	Employee employee;
}
