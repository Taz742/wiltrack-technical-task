import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IPolygonFormData } from './typs';

const validationSchema = yup.object<IPolygonFormData>().shape({
  name: yup.string().required('Name is required'),
  fee: yup.number().required('Fee is required'),
  selections: yup.array().of(
    yup.object().shape({
      subareaName: yup.string().required('Subarea Name is required'),
      subAreaId: yup.string().required('Subarea ID is required'),
      capacity: yup.number().required('Capacity is required'),
    })
  ),
});

export default yupResolver(validationSchema);
