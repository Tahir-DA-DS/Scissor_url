import {object, string} from 'yup'

export default object({
    destination:string().url("must be a valid url").required('destination is required')
})