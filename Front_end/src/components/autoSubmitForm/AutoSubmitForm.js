import {useEffect} from "react";
import {useFormikContext} from "formik";

export const AutoSubmitForm=({onSubmit})=>{
    const values = useFormikContext();
    useEffect(() => {
        onSubmit(values);
    }, [values,onSubmit]);
    return null;

}