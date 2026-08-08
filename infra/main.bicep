targetScope = 'subscription'

@description('Azure region for all resources')
param location string

@description('Environment name (e.g. prod, staging)')
param environmentName string = 'prod'

@description('Project name used as prefix for all resources')
param projectName string

@description('SKU name for the Static Web App')
param skuName string = 'Free'

@description('Custom domain name (e.g. devdaniels.com). Leave empty to skip.')
param customDomainName string = ''

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-${projectName}-${environmentName}'
  location: location
}

module staticWebApp 'shared/static-web-app.bicep' = {
  name: 'static-web-app-${projectName}-${environmentName}'
  scope: rg
  params: {
    name: 'swa-${projectName}-${environmentName}'
    location: location
    skuName: skuName
    customDomainName: customDomainName
  }
}

@description('The name of the Static Web App')
output staticWebAppName string = staticWebApp.outputs.name

@description('The default hostname of the Static Web App')
output staticWebAppHostname string = staticWebApp.outputs.defaultHostname

@description('The resource group name')
output resourceGroupName string = rg.name
