export function mostrarError(component, error) {
  console.log("error", error)
  component.errors.push(error._body)
}