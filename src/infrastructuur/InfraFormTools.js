import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as t from "../tools/LeerTools.tsx";

/**
 * Creates an object in an form
 * used for a react hook form
 * standard for all the forms 
 * @param {*} props 
 * @returns object the methods and objects usefull for handling a form
 */

export const useFormStandard=(props)=>
{
  const {
  register,
  getValues,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
} = useForm({
  defaultValues: props.defaultValues,
  resolver: yupResolver(props.yupSchema),
});
return {register,handleSubmit,reset,setValue,getValues,errors}
}

/**
 * @param {preserve props for the rest of the form} props 
 * @param {*} tableName 
 * @param {*} defaultValues 
 * @param {*} yupSchema 
 * @returns 
 */
export const gatherProps=(props,tableName,defaultValues,yupSchema)=>{
  props = { ...props };
  if (typeof props?.id === "object") props = { ...props, id: null };
  t.setObjectProp(props, "id", 0);
  t.setObjectProp(props, "defaultValues", {});
  props.defaultValues = {...props.defaultValues,...defaultValues}
  props.tableName = tableName;
  props.yupSchema = yupSchema;
  return props
}
