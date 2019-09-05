/**
 * This method is used to check if module has is loaded already or not.
 * If loaded then throws exception.
 * @param parentModule
 * @param moduleName
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`
    );
  }
}
