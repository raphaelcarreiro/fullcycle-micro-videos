export type FieldErrors = {
  [key: string]: string[];
};

export default interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: any): boolean;
}
