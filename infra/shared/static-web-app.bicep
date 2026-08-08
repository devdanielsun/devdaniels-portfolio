@description('Name of the Static Web App')
param name string

@description('Azure region')
param location string

@description('The SKU of the Static Web App')
param skuName string = 'Free'

@description('Custom domain name (e.g. devdaniels.com). Leave empty to skip.')
param customDomainName string = ''

// https://learn.microsoft.com/en-us/azure/templates/microsoft.web/2025-03-01/staticsites
resource staticWebApp 'Microsoft.Web/staticSites@2025-03-01' = {
  name: name
  location: location
  sku: {
    name: skuName
    tier: skuName
  }
  properties: {
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
  }
}

// https://learn.microsoft.com/en-us/azure/templates/microsoft.web/2025-03-01/staticsites/customdomains
resource customDomain 'Microsoft.Web/staticSites/customDomains@2025-03-01' = if (!empty(customDomainName)) {
  parent: staticWebApp
  name: customDomainName
  properties: {
    validationMethod: 'dns-txt-token'
  }
}

@description('The name of the Static Web App')
output name string = staticWebApp.name

@description('The default hostname')
output defaultHostname string = staticWebApp.properties.defaultHostname
