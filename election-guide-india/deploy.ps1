# Deployment script for Election Guide India
# Run this script in PowerShell to deploy to Google Cloud Run

$PROJECT_ID = "election-assistant-494912"
$REGION = "us-central1"
$SERVICE_NAME = "election-guide-india"
$IMAGE_NAME = "gcr.io/$PROJECT_ID/$SERVICE_NAME"

$gcloud = "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
if (-not (Test-Path $gcloud)) {
    $gcloud = "gcloud" # Fallback to path
}

Write-Host "Starting deployment to Google Cloud Run..." -ForegroundColor Cyan

# 1. Login check
Write-Host "Step 1: Checking authentication..." -ForegroundColor Yellow
& $gcloud config set account smrutidesai102@gmail.com

# 2. Set Project
Write-Host "Step 2: Setting project to $PROJECT_ID..." -ForegroundColor Yellow
& $gcloud config set project $PROJECT_ID

# 2.5 Enable APIs
Write-Host "Step 2.5: Enabling necessary APIs..." -ForegroundColor Yellow
& $gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com

# 3. Build the container
Write-Host "Step 3: Building container using Cloud Build..." -ForegroundColor Yellow
& $gcloud builds submit --tag $IMAGE_NAME

# 4. Deploy to Cloud Run
# Note: You can add --set-env-vars DATABASE_URL=...,GEMINI_API_KEY=... here
Write-Host "Step 4: Deploying to Cloud Run..." -ForegroundColor Yellow
& $gcloud run deploy $SERVICE_NAME `
  --image $IMAGE_NAME `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --port 8080

Write-Host "`nDeployment complete!" -ForegroundColor Green
Write-Host "You can manage environment variables (DATABASE_URL, GEMINI_API_KEY) in the Google Cloud Console." -ForegroundColor Gray
