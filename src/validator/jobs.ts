import * as Yup from "yup";
import { ICategory, IJobType } from "../types/jobs.type";

const jobSchema = Yup.object().shape({
  title: Yup.string()
    .required("Job title is required")
    .min(2, "Title must be at least 2 characters"),

  category: Yup.mixed<ICategory>()
    .oneOf(Object.values(ICategory), "Invalid category")
    .required("Category is required"),

  company: Yup.string()
    .required("Company name is required")
    .min(2, "Company name must be at least 2 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  companyInfo: Yup.string()
    .required("Company information is required")
    .min(10, "Company information must be at least 10 characters"),

  jobType: Yup.mixed<IJobType>()
    .oneOf(Object.values(IJobType), "Invalid job type")
    .required("Job type is required"),

  location: Yup.string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),

  salary: Yup.object().shape({
    from: Yup.string()
      .required("Salary from is required")
      .matches(/^[0-9]+$/, "Salary must be a number")
      .test(
        "is-greater-than-zero",
        "Salary from must be greater than 0",
        (val) => (val ? parseInt(val, 10) > 0 : false)
      ),

    to: Yup.string()
      .required("Salary to is required")
      .matches(/^[0-9]+$/, "Salary must be a number")
      .test(
        "is-greater-than-from",
        "Salary to must be greater than salary from",
        function (val) {
          const { from } = this.parent;
          return val && from ? parseInt(val, 10) > parseInt(from, 10) : false;
        }
      ),
  }),
});

export default jobSchema;
