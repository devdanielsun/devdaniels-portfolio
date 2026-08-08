#!/usr/bin/env bash
set -euo pipefail

# Configuration — edit these values
APP_NAME="devdaniels-portfolio-github"
GITHUB_REPO="devdanielsun/devdaniels-portfolio"
SUBSCRIPTION_ID=$(az account show --query id -o tsv)

echo "Using subscription: $SUBSCRIPTION_ID"

# Create or reuse app registration
APP_ID=$(az ad app list --display-name "$APP_NAME" --query '[0].appId' -o tsv)
if [[ -z "$APP_ID" ]]; then
  APP_ID=$(az ad app create --display-name "$APP_NAME" --query appId -o tsv)
  echo "Created app registration: $APP_ID"
else
  echo "App registration already exists: $APP_ID"
fi

# Create service principal if it doesn't exist
if ! az ad sp show --id "$APP_ID" > /dev/null 2>&1; then
  az ad sp create --id "$APP_ID" > /dev/null
  echo "Created service principal"
else
  echo "Service principal already exists"
fi

# Add federated credential if it doesn't exist
CRED_NAME="github-actions-main"
if ! az ad app federated-credential show --id "$APP_ID" --federated-credential-id "$CRED_NAME" > /dev/null 2>&1; then
  az ad app federated-credential create --id "$APP_ID" --parameters "{
    \"name\": \"${CRED_NAME}\",
    \"issuer\": \"https://token.actions.githubusercontent.com\",
    \"subject\": \"repo:${GITHUB_REPO}:ref:refs/heads/main\",
    \"audiences\": [\"api://AzureADTokenExchange\"]
  }"
  echo "Created federated credential for main branch"
else
  echo "Federated credential already exists"
fi

# Assign Contributor role (idempotent by default)
az role assignment create \
  --assignee "$APP_ID" \
  --role Contributor \
  --scope "/subscriptions/$SUBSCRIPTION_ID" > /dev/null 2>&1 || true
echo "Contributor role assigned"

# Output the values to set as GitHub secrets
TENANT_ID=$(az account show --query tenantId -o tsv)

echo ""
echo "Set these as GitHub repository secrets:"
echo "  AZURE_CLIENT_ID=$APP_ID"
echo "  AZURE_TENANT_ID=$TENANT_ID"
echo "  AZURE_SUBSCRIPTION_ID=$SUBSCRIPTION_ID"
