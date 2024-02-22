import {object, string} from 'yup'

export default object({
    destination:string().required('destination is required')
})