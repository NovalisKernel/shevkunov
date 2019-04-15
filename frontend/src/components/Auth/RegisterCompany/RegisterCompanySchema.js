import { string, object, ref, number, array } from "yup";

const CompanySchema = object().shape({
  name: string()
    .required()
    .min(4)
    .max(50),
  description: string()
    .required()
    .min(50)
    .max(500),
  email: string()
    .required()
    .email(),
  address: object().shape({
    country: string().required(),
    city: string().required(),
    other: string().required()
  }),
  password: string()
    .required()
    .min(6)
    .max(30)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")]),
  rooms: object().shape({
    standart: object().shape({
      price: number()
        .required()
        .min(0),
      time: number()
        .required()
        .min(0)
    }),
    big: object().shape({
      price: number()
        .required()
        .min(0),
      time: number()
        .required()
        .min(0)
    }),
    toilet: object().shape({
      price: number()
        .required()
        .min(0),
      time: number()
        .required()
        .min(0)
    })
  }),
  services: array()
    .of(
      object().shape({
        name: string().required(),
        coefficient: number().required()
      })
    )
    .min(1)
    .required()
});

export default CompanySchema;
