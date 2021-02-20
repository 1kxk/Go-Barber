class TemplateVariables {
  [key: string]: string | number
}

export class ParseMailTemplateDTO {
  file: string
  variables: TemplateVariables
}
